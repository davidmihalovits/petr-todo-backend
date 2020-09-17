import pool from "../db";

const getTodos = async (req: any, res: any) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todos WHERE todo_by_id = $1 ORDER BY created_at DESC",
            [req.user.id]
        ); //ORDER BY RANDOM()

        return res.json(allTodos.rows);
    } catch (error) {
        return res.json({
            status: "Can not get.",
        });
    }
};

export default getTodos;
