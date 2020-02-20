import { Request, Response, NextFunction } from "express";
import { HTTP401Error, HTTP500Error } from "../utils/httpErrors";
import jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";

export interface AuthenticatedRequest extends Request {
    user: {
        username: string;
    }
}

interface JwtPayload extends Object{
    username: string;
}

export const validateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer', '').trim() // Bearer <token>
        const options = {
            expiresIn: process.env.TOKEN_TTL,
            issuer: process.env.TOKEN_ISSUER,
            algorithm:  ["RS256"]
        };
        const key = fs.readFileSync( path.join( __dirname, "../../public.key" ), "utf-8");
        jwt.verify(token, key, options, (err, result) => {
            if (err) {
                new HTTP500Error(res, "Verification Error");
            } else {
                if (result) {
                    req.user = {username: (result as JwtPayload).username};
                    next()
                }else{
                    new HTTP401Error(res, "Unauthorized");
                }
            }
        });
    } else {
        new HTTP401Error(res, "Unauthorized");
    }
}