import { Request, Response } from "express";
import { checkSearchParams } from "../../middleware/checks";
import { validateToken } from "../../middleware/auth";

export default [
    {
        path: "/search",
        method: "get",
        handler: [
            checkSearchParams,
            async (req: Request, res: Response) => {
                const q = req.query.q;
                res.send({q});
            }
        ]
    },
    {
        path: "/private",
        method: "get",
        handler: [
            validateToken,
            async (req: Request, res: Response) => {
                res.send("user is signed in");
            }
        ]
    }
];