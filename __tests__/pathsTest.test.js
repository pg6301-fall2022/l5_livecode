import request from "supertest";
import express from "express";
import {loginMiddleware, loginPath, usersPath} from "../paths.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test secret"));

app.use(loginMiddleware);
app.use("/login", loginPath);
app.use("/users", usersPath);

describe("test suite for paths", () => {

    it("fails to login with unknown user", async () => {
        const response = await request(app)
            .post("/login")
            .send({username: "blorp", password: "blorp"});

        expect(response.status).toEqual(401);
    });


    it("logs in known user", async () => {

        const agent = request.agent(app);

        await agent
            .post("/login")
            .send({username: "admin", password: "NOTsecret"})
            .expect(200);

        const loggedUser = await agent.get("/login");
        console.log(loggedUser.body);
        expect(loggedUser.body).toMatchObject({username: "admin", password: "NOTsecret", fullname: "Testsson"});

    });

});