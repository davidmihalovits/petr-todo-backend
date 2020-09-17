import express from "express";
import pool from "../db";

const updateUser = async (req: any, res: express.Response) => {
    try {
        const updateUser = await pool.query(
            "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
            [req.body.username, req.user.id]
        );

        return res.json(updateUser.rows[0]);
    } catch (error) {
        return res.json({
            status: "Can not update.",
        });
    }
};

export default updateUser;
