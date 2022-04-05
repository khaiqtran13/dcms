const express = require("express");
const client = require("../connection");
const router = express.Router();

// gets users
router.get("", async (req, res) => {
    try {
        const users = await client.query("SELECT * FROM public.user");
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await client.query(
            `SELECT * FROM public.user WHERE user_id = ${user_id}`,
        );
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
