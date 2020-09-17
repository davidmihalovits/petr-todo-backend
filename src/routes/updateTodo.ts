import express from "express";
import pool from "../db";

const updateTodo = async (req: express.Request, res: express.Response) => {
    try {
        const updateTodo = await pool.query(
            "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [req.body.title, req.body.description, req.params.id]
        );

        return res.json(updateTodo.rows[0]);
    } catch (error) {
        return res.json({
            status: "Can not update.",
        });
    }
};

export default updateTodo;
