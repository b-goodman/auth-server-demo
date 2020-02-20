import { Request, Response } from "express";

export abstract class HTTPClientError extends Error {
    readonly statusCode!: number;
    readonly name!: string;

    constructor(message: object | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}


export class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;

    constructor(message: string | object = "Bad Request") {
        super(message);
    }
}


export class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;

    constructor(message: string | object = "Not found") {
        super(message);

    }
}

export class HTTP401Error extends HTTPClientError {
    readonly statusCode = 401;

    constructor(res: Response, message: string | object = "Unauthorized User") {
        super(message);
        res.status(this.statusCode).send(message);
    }
}

export class HTTP500Error extends HTTPClientError {
    readonly statusCode = 500;
    constructor(res: Response, message: string | object = "Internal Server Error") {
        super(message);
        res.status(this.statusCode).send(message);
    }
}