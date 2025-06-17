const Pool = require("pg").Pool

const pool = new Pool({
    user: "taskmgr",
    host: "localhost",
    database: "task",
    password: "password",
    port: 5432,
})

//--------------------------------------------------------------------------------------------------
app.post("/getTasks", async (req, res, next) => { try {
    pool.query('SELECT * FROM task', (error, results) => {
        if (error)
            res.json({ error: error })
        else
            res.json({ row: results.rows })
    })
} catch (e) { next(e) }})

//--------------------------------------------------------------------------------------------------
app.post("/deleteTask", async (req, res, next) => { try {
    pool.query('DELETE FROM task WHERE id = ' + req.body.args.id, (error, results) => {
        if (error)
            res.json({ error: error })
        else
            res.json({ results: results })
    })
} catch (e) { next(e) }})

//--------------------------------------------------------------------------------------------------
app.post("/addTask", async (req, res, next) => { try {
    var insert = {
        text: "INSERT INTO task (title, description, assignee, remarks) VALUES ($1, $2, $3, $4)",
        values: [req.body.args.title, req.body.args.description, req.body.args.assignee, req.body.args.remarks]
    }

    pool.query(insert, (error, results) => {
        if (error)
            res.json({ error: error })
        else
            res.json({ results: results })
    })
} catch (e) { next(e) }})

//--------------------------------------------------------------------------------------------------
app.post("/editTask", async (req, res, next) => { try {
    var insert = {
        text: "UPDATE task SET title = $2, completed = $3, description = $4, assignee = $5, remarks = $6 WHERE id = $1",
        values: [req.body.args.id, req.body.args.title, req.body.args.completed, req.body.args.description, req.body.args.assignee, req.body.args.remarks]
    }

    pool.query(insert, (error, results) => {
        if (error)
            res.json({ error: error })
        else
            res.json({ results: results })
    })
} catch (e) { next(e) }})