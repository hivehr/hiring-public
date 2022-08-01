import { ErrorRequestHandler, Response as _Response } from "express";

type Response<Data = unknown> = {
    data: Data;
    errors: string[] | null;
};

export class HTTPError extends Error {
    public status: number;

    constructor(message: string, status = 500) {
        super(message);
        this.status = status;
    }
}

export class HTTPResponse<Data = unknown> {
    public data: Data;
    public status: number;
    public errors: string[];

    constructor(
        data: Data,
        errors: string | string[] = [],
        status = errors.length > 1 ? 500 : 200
    ) {
        this.status = status;
        this.data = data;
        this.errors = Array.isArray(errors) ? errors : [errors];
    }

    send<R extends _Response>(res: R): R {
        return res.json({
            data: this.data,
            errors: this.errors
        } as Response<Data>);
    }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    if (err == null) {
        next();
        return;
    }

    if (err instanceof HTTPError) {
        new HTTPResponse(null, [err.message]).send(res);
    } else if (err != null) {
        new HTTPResponse(null, [
            process.env.NODE_ENV === "production"
                ? "Internal server error"
                : err.stack
        ]).send(res);
    }
};
