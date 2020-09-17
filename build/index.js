"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const addTodo_1 = __importDefault(require("./routes/addTodo"));
const getTodos_1 = __importDefault(require("./routes/getTodos"));
const getTodo_1 = __importDefault(require("./routes/getTodo"));
const updateTodo_1 = __importDefault(require("./routes/updateTodo"));
const updateColor_1 = __importDefault(require("./routes/updateColor"));
const deleteTodo_1 = __importDefault(require("./routes/deleteTodo"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const profile_1 = __importDefault(require("./routes/profile"));
const updateUser_1 = __importDefault(require("./routes/updateUser"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//todo
app.post("/addTodo", auth_1.default, addTodo_1.default);
app.get("/getTodos", auth_1.default, getTodos_1.default);
app.get("/getTodo/:id", auth_1.default, getTodo_1.default);
app.put("/updateTodo/:id", auth_1.default, updateTodo_1.default);
app.put("/updateColor/:id", auth_1.default, updateColor_1.default);
app.delete("/deleteTodo/:id", auth_1.default, deleteTodo_1.default);
//user
app.post("/signup", signup_1.default);
app.post("/login", login_1.default);
app.get("/profile", auth_1.default, profile_1.default);
app.put("/updateUser", auth_1.default, updateUser_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
