import express from "express";
import pool from "../db";

const addTodo = async (req: any, res: express.Response) => {
    try {
        const newTodo = await pool.query(
            "INSERT INTO todos (title, description, color, todo_by_id, todo_by_username) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [
                req.body.title,
                req.body.description,
                "#ffffff",
                req.user.id,
                req.user.username,
            ]
        );

        return res.json(newTodo.rows[0]);
    } catch (error) {
        return res.json({
            status: "Can not add.",
        });
    }
};

export default addTodo;
