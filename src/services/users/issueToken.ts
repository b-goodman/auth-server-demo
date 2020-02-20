import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/user";
import { HTTP401Error, HTTP500Error,} from './../../utils/httpErrors';


const issueToken = (req: Request, res: Response) => {
    const username = req.body.username as string;
    const password = req.body.password as string;

    User.findOne({username}, (err, user) => {
        if (!err && user) {
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        const status = 200;

                        // Create a token
                        const payload = {
                            username: user.username,
                        };
                        const options = {
                            expiresIn: process.env.TOKEN_TTL,
                            issuer:  process.env.TOKEN_ISSUER,
                            algorithm:  "RS256"
                        };
                        const key = fs.readFileSync( path.join( __dirname, "../../../private.key"), "utf-8");
                        const token = jwt.sign(payload, key, options);

                        res.status(status).send({token, status});
                    } else {
                        new HTTP401Error(res, "Authentication error");
                    }
                })
                .catch( (err) => {
                    new HTTP500Error(res, "Error authenticating user.");
                });
        } else {
            new HTTP401Error(res, "Invalid username/password");
        }
    });
}

export default issueToken;
