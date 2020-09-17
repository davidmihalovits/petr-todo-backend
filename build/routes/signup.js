"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.username.length < 1 || req.body.username.length > 10) {
            return res.json({
                status: "Enter your username, max 10 characters.",
            });
        }
        if (req.body.password.length < 6) {
            return res.json({
                status: "Password must be at least 6 characters.",
            });
        }
        const user = yield db_1.default.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
        if (user.rows[0] !== undefined) {
            return res.json({ status: "This username is already taken." });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const bcryptPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const newUser = yield db_1.default.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [req.body.username, bcryptPassword]);
        const payload = {
            user: {
                id: newUser.rows[0].id,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.jwtSecret, {
            expiresIn: "24h",
        });
        return res.json({ token, user: newUser.rows[0] });
    }
    catch (error) {
        console.log(error);
        return res.json({ status: "Signup failed." });
    }
});
exports.default = signup;
