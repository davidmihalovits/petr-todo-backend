import express from "express";
import pool from "../db";

const profile = async (req: any, res: express.Response) => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [
            req.user.id,
        ]);

        return res.json(user.rows[0]);
    } catch (error) {
        return res.json({
            status: "No profile.",
        });
    }
};

export default profile;
