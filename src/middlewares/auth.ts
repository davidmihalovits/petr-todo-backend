import express from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const auth = async (
    req: any,
    res: express.Response,
    next: express.NextFunction
) => {
    const token = req.header("token");

    if (!token) {
        return res.json({ status: "No token." });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.jwtSecret!);

        req.user = decoded.user;

        return next();
    } catch (error) {
        return res.json({ status: "Token not valid." });
    }
};

export default auth;
