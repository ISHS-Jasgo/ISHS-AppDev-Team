import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_data";

const loginRouter: Router = require('express').Router();
const userDatabase = new UserDatabase();
const injectionRegex = new RegExp(/#|-|\/|\\|\"|\'|;/g);
loginRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.body.key;
    let name: string = req.body.name;
    let password: string = req.body.password;
    if (key && name && password) {
        if (injectionRegex.test(name) || injectionRegex.test(password)) {
            res.status(400).send("Invalid characters in name or password");
        } else {
            userDatabase.login(key, name, password);
        }
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

module.exports = loginRouter;