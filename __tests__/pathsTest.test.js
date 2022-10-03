import supertest from "supertest";
import express from "express";
import {loginPath, usersPath} from "../paths.js";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
app.use("/login", loginPath);

describe("test suite for paths", () => {

    it("fails to login with unknown user", async () => {
        const response = await supertest(app)
            .post("/login")
            .send({username: "blorp", password: "blorp"});

        expect(response.status).toEqual(401);
    });

});