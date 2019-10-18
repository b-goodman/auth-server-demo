import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP400Error("Missing q parameter");
    } else {
        next();
    }
};

export const checkUserParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.password) {
        throw new HTTP400Error("Missing parameter");
    } else {
        next();
    }
};