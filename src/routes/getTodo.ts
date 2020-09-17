import express from "express";
import pool from "../db";

const getTodo = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [
            id,
        ]);

        return res.json(todo.rows[0]);
    } catch (error) {
        return res.json({
            status: "Can not get.",
        });
    }
};

export default getTodo;
