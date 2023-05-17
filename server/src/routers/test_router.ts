import { NextFunction, Request, Response } from "express";
import { FileUploadBuilder } from "../util/file_upload";

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

module.exports = testRouter;