import { Request, Response, NextFunction } from "express";
import { HTTP401Error, HTTP500Error } from "../utils/httpErrors";
import jwt from 'jsonwebtoken';

export const checkUserAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP401Error("Unauthorized");
    } else {
        next();
    }
};

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const authorizationHeaader = req.headers.authorization;
    // let result;
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: process.env.TOKEN_TTL,
            issuer: process.env.TOKEN_ISSUER
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            // result = jwt.verify(token, process.env.JWT_SECRET, options);

            // Let's pass back the decoded token to the request object
            // req.decoded = jwt.verify(token, process.env.JWT_SECRET, options);
            const result = jwt.verify(token, process.env.JWT_SECRET, options);
            console.log(result)

            // We call next to pass execution to the subsequent middleware
            if (result) {
                next()
            }else{
                throw new HTTP401Error("Unauthorized");
            }

        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            throw new HTTP500Error();
        }
    } else {
        throw new HTTP401Error("Unauthorized");
    }
}