import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //   if there is no token
  if (!token) {
    return next(createError(404, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    // if token exists, but it's not the right token i.e. token is not verified
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    // if token is verified, then we are the owner of this account
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised as Admin!"));
    }
  });
};
