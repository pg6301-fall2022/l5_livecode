import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/login", (req, res) => {

    const user = USERS.find(u => u.username === req.cookies.username);

    const {username, fullname } = user;

    res.json({username, fullname});

});

const USERS = [
    {
        username: "admin",
        password: "NOTsecret",
        fullname: "Testsson"
    }
];

app.post("/login", (req, res) =>{
    // POST sends data client -> server
    // somewhere here - I know that there is a request with info in the body

    console.log("getting this far");

    const { username, password } = req.body;

    if(USERS.find(u => u.username === username).password === password){
        res.cookie("username", username);
        res.sendStatus(200);
    }

    res.sendStatus(401);

});

const server = app.listen(
     process.env.PORT || 3000,
    () => {
        console.log("I have started!");
    }
);