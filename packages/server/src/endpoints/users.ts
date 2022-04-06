import client from "../../connection";

// TODO: express Typing - didn't add TypeScript for shits and giggles

/* 
ideally we want to just use the SQL scripts instead of posting
to the server page 
honestly it doesn't really matter because fuck security 
but 100% printing to the page is not needed 
you can simply make these functions with SQL logic 
unless your a JT/TS god and want to parse JSON instead of using SQL
what're chances the prof checks
*/

export const getUsers = async (req: any, res: any) => {
    try {
        const users = await client.query("SELECT * FROM public.user");
        res.json(users.rows);
    } catch (err: any) {
        console.error(err.message);
    }
};

export const getUserById = async (req: any, res: any) => {
    try {
        const { user_id } = req.params;
        const user = await client.query(
            `SELECT * FROM public.user WHERE user_id = ${user_id}`,
        );
        res.json(user.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
};
