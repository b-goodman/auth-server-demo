import { HTTP401Error, HTTP500Error, HTTP404Error } from './../../utils/httpErrors';
import bcrypt from 'bcrypt';
import User from "../../models/User";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


export const addUser = (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = new User({ name, password }); // document = instance of a model

    user.save((err, user) => {
        if (!err) {
            const status = 201;
            res.status(201).send({status, result: user});
        } else {
            const status = 500;
            res.status(500).send({status, err: err});
        }
    });
};

export const authenticateUser = (req: Request, res: Response) => {
    const name = req.body.name as string;
    const password = req.body.password as string;

    User.findOne({name}, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    const status = 200;

                    // Create a token
                    const payload = {
                        user: user.name
                    };
                    const options = {
                        expiresIn: process.env.TOKEN_TTL,
                        issuer:  process.env.TOKEN_ISSUER
                    };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    res.status(status).send({token, status, result: user});
                } else {
                    throw new HTTP401Error("Authentication error");
                }
            }).catch( (err) => {
                throw new HTTP500Error();
            });
        } else {
            throw new HTTP404Error();
        }
    });

}
