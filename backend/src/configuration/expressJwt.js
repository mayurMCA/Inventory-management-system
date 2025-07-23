import {expressjwt} from "express-jwt";
import { CONSTANTS } from "./config.js";

const configExpressJwt = () => {
  return expressjwt({
    credentialsRequired: true,
    secret: CONSTANTS.jwtSecret,
    algorithms: [CONSTANTS.jwtAlgorithm],
    getToken: function (req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  }).unless({
    path: ["/v1/auth/user/register", "/v1/auth/user/login","/api-docs/"
      
      ,  /^\/v1\/web\/blog\/.*/, /^\/assets\/.*/],
  });
};

// /^\/v1\/web\/.*/,

export default configExpressJwt;
