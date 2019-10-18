import { addUser, authenticateUser } from "./handlers";
import { checkUserParams } from "../../middleware/checks";

export default [
    {
        path: "/users",
        method: "post",
        handler: [
            checkUserParams,
            addUser
        ]
    },
    {
        path: "/login",
        method: "post",
        handler: [
            checkUserParams,
            authenticateUser
        ]
    }
];