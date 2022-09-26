import express from "express";

const app = express();

app.get("/login", (req, res) => {
    res.json({
        username: "admin"
    });
});

app.post("/login", (req, res) =>{
    // POST sends data client -> server
    console.log("Test");
    res.sendStatus(200);
});

const server = app.listen(
     process.env.PORT || 3000,
    () => {
        console.log("I have started!");
    }
);