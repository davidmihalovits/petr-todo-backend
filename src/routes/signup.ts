import express from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const signup = async (req: express.Request, res: express.Response) => {
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

        const user = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [req.body.username]
        );

        if (user.rows[0] !== undefined) {
            return res.json({ status: "This username is already taken." });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [req.body.username, bcryptPassword]
        );

        const payload = {
            user: {
                id: newUser.rows[0].id,
                username: newUser.rows[0].username,
            },
        };

        const token = jwt.sign(payload, process.env.jwtSecret!, {
            expiresIn: "24h",
        });

        return res.json({ token, user: newUser.rows[0] });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Signup failed." });
    }
};

export default signup;
