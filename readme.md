# Pointers:

 ## next in `(req, res, next)`:
 next() is a callback function and takes the execution to next middleware
 https://youtu.be/k3Vfj-e1Ma4?t=1961

 ## JSON Web Token (JWT):
A JWT is a mechanism to verify the owner of some JSON data. It’s an encoded, URL-safe string that can contain an unlimited amount of data (unlike a cookie) and is cryptographically signed.

When a server receives a JWT, it can guarantee the data it contains can be trusted because it’s signed by the source. No middleman can modify a JWT once it’s sent.

It’s important to note that a JWT guarantees data ownership but not encryption. The JSON data you store into a JWT can be seen by anyone that intercepts the token because it’s just serialized, not encrypted. For this reason, it’s highly recommended to use HTTPS with JWTs (and HTTPS in general, by the way).
https://blog.logrocket.com/jwt-authentication-best-practices/

We use JWT to check if an user is an admin or not, and if the user is not admin, he cannot update hotel details. Thus, using JWT, we ensure that the user is the owner of the JSON data that is hotel.
https://youtu.be/k3Vfj-e1Ma4?t=3429