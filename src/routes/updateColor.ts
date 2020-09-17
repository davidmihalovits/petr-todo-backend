import express from "express";
import pool from "../db";

const updateColor = async (req: express.Request, res: express.Response) => {
    try {
        const updateColor = await pool.query(
            "UPDATE todos SET color = $1 WHERE id = $2 RETURNING *",
            [req.body.color, req.params.id]
        );

        return res.json(updateColor.rows[0]);
    } catch (error) {
        return res.json({
            status: "Can not update.",
        });
    }
};

export default updateColor;
