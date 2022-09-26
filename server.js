import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/login", (req, res) => {
    res.json({
        username: "admin"
    });
});

const USERS = [
    {
        username: "admin",
        password: "secret"
    }
];

app.post("/login", (req, res) =>{
    // POST sends data client -> server
    // somewhere here - i know that there is a request with info in the body

    const body = req.body;
    const { username, password } = body;

    if(USERS.find(u => u.username === username).password === password){
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

const server = app.listen(
     process.env.PORT || 3000,
    () => {
        console.log("I have started!");
    }
);