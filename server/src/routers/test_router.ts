import { NextFunction, Request, Response } from "express";
import { FileUploadBuilder } from "../util/file_upload";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";

const testRouter = require('express').Router();
const fileUploadBuilder = new FileUploadBuilder().setType("text");

testRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.hello);
    res.status(200).send(req.body);
});

testRouter.get('/upload', fileUploadBuilder.upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    res.status(200).send(req.file);
});

testRouter.get('/login', (req: Request, res: Response, next: NextFunction) => {
    let checker = new QueryChecker();
    if (checker.notNull(req.session.key, req.session.name, req.session.password)) {
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});
module.exports = testRouter;