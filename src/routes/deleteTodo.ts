import express from "express";
import pool from "../db";

const deleteTodo = async (req: any, res: express.Response) => {
    try {
        await pool.query("DELETE FROM todos WHERE id = $1", [req.params.id]);

        const allTodos = await pool.query(
            "SELECT * FROM todos WHERE todo_by_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        );

        return res.json(allTodos.rows);
    } catch (error) {
        return res.json({
            status: "Can not delete.",
        });
    }
};

export default deleteTodo;
