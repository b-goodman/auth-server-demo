import { HTTP401Error, HTTP500Error, HTTP404Error, HTTP400Error } from './../../utils/httpErrors';
import User from "../../models/user";
import { Request, Response } from "express";
import { AuthenticatedRequest } from './../../middleware/auth';
import issueToken from "./issueToken";
export {issueToken};


export const addUser = (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email }); // document = instance of a model

    user.save((err, user) => {
        if (!err) {
            const status = 201;
            res.status(201).send({status, result: { username, password, email } });
        } else {
            const status = 500;
            res.status(500).send({status, err: err});
        }
    });
};

export const deleteUser = (req: AuthenticatedRequest, res: Response) => {
    const username = req.user.username;
    User.findOne({username}, (err, user) => {
        if (!err && user) {
            User.deleteOne({username}, (err) => {
                if (err) {
                    new HTTP500Error(res, "Error deleting user.");
                }
                res.status(200);
            })
        } else {
            throw new HTTP400Error(`Could not lookup user '${username}'`);
        }
    })
};
