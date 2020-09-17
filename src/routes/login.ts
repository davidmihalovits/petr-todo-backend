import express from "express";
import pool from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const login = async (req: express.Request, res: express.Response) => {
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [req.body.username]
        );

        if (user.rows[0] === undefined) {
            return res.json({ status: "Invalid credentials." });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.json({ status: "Invalid credentials." });
        }

        const payload = {
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
            },
        };

        const token = jwt.sign(payload, process.env.jwtSecret!, {
            expiresIn: "24h",
        });

        return res.json({ token, user: user.rows[0] });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Login failed." });
    }
};

export default login;
