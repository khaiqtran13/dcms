// for demo - delete this later - KT

// const express = require("express");
// import client from "../connection";
// const router = express.Router();

// // gets users
// router.get("", async (req: any, res: any) => {
//     try {
//         const users = await client.query("SELECT * FROM public.user");
//         res.json(users.rows);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// router.get("/:user_id", async (req: any, res: any) => {
//     try {
//         const { user_id } = req.params;
//         const user = await client.query(
//             `SELECT * FROM public.user WHERE user_id = ${user_id}`,
//         );
//         res.json(user.rows[0]);
//     } catch (err: any) {
//         console.error(err.message);
//     }
// });

// export default router;
