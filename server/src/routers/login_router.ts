import { NextFunction, Request, Response, Router } from "express";
import { UserDatabase } from "../database/user_data";
import { QueryChecker } from "../util/query_checker";

const loginRouter: Router = require('express').Router();
const userDatabase = new UserDatabase();
loginRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let key: number = req.body.key;
    let name: string = req.body.name;
    let password: string = req.body.password;
    let checker = new QueryChecker();
    if (key && checker.notNull(key, name, password)) {
        if (checker.hasInvalidString(name, password)) {
            res.status(400).send("Invalid characters in name or password");
        } else {
            userDatabase.login(key, name, password);
        }
        //TODO: 세션 설정
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

module.exports = loginRouter;