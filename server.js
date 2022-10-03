import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import {loginPath, usersPath, loginMiddleware} from "./paths.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(loginMiddleware);
app.use("/login", loginPath);
app.use("/users", usersPath);

app.use(express.static("public"));

const server = app.listen(
     process.env.PORT || 3000,
    () => {
        console.log(`I have started! On: http://localhost:${server.address().port}`);
    }
);