import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(loginMiddleware);

app.get("/login", (req, res) => {

    const cookieUsername = req.signedCookies.username;

    if(!cookieUsername) {
        return res.sendStatus(401);
    }

    const user = USERS.find(u => u.username === cookieUsername);

    const {username, fullname } = user;

    res.json({username, fullname});

});

const USERS = [
    {
        username: "admin",
        password: "NOTsecret",
        fullname: "Testsson"
    },
    {
        username: "otheruser",
        password: "secret?",
        fullname: "Some Other"
    }
];

app.post("/login", (req, res) =>{
    // POST sends data client -> server
    // somewhere here - I know that there is a request with info in the body

    const { username, password } = req.body;

    const user = USERS.find(u => u.username === username);

    if(user && user.password === password){
        res.cookie("username", username, {signed : true});
        res.sendStatus(200)
            .redirect("/");
    } else {
        res.sendStatus(401)
            .redirect("/");
    }


});

app.get("/users", (req, res) => {
    if(!res.user){
        return res.sendStatus(403);
    }
    res.json(USERS);
});

app.post("/users", (req, res) => {
    const {username, password, fullname} = req.body;
    if(!username || !password || !fullname){
        return res.sendStatus(400);
    }
    USERS.push({username: username, password: password, fullname: fullname});

    res.redirect("/");

});

app.use(express.static("public"));

function loginMiddleware(req, res, next) {
    res.user = USERS.find(u => u.username === req.signedCookies.username);
    next();
}



const server = app.listen(
     process.env.PORT || 3000,
    () => {
        console.log(`I have started! On: http://localhost:${server.address().port}`);
    }
);