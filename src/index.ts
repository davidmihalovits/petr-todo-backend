import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./middlewares/auth";
import addTodo from "./routes/addTodo";
import getTodos from "./routes/getTodos";
import getTodo from "./routes/getTodo";
import updateTodo from "./routes/updateTodo";
import updateColor from "./routes/updateColor";
import deleteTodo from "./routes/deleteTodo";
import signup from "./routes/signup";
import login from "./routes/login";
import profile from "./routes/profile";
import updateUser from "./routes/updateUser";

const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//todo
app.post("/addTodo", auth, addTodo);
app.get("/getTodos", auth, getTodos);
app.get("/getTodo/:id", auth, getTodo);
app.put("/updateTodo/:id", auth, updateTodo);
app.put("/updateColor/:id", auth, updateColor);
app.delete("/deleteTodo/:id", auth, deleteTodo);

//user
app.post("/signup", signup);
app.post("/login", login);
app.get("/profile", auth, profile);
app.put("/updateUser", auth, updateUser);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
