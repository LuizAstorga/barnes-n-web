import type { NextApiRequest, NextApiResponse } from "next";
import connectionPool from "@/lib/db"

const bcrypt = require('bcryptjs')

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {username, password, email} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)

    const query =  "INSERT INTO Users (username, email, hashedPassword) " + 
                    `VALUES ('${username}', '${email}', '${hashedPassword}')`;

    try {
        connectionPool.query(
            query,
            (error: any, results: any, fields: any) => {
                if (error && error.code === "ER_DUP_ENTRY") {
                    return res.status(409).send({message: "Username already in use"});
                } else if (error) {
                    throw error;
                }

                return res.status(200).send("Account successfully created !");
            }
        );
    } catch(error: any) {
        return res.status(500).send({message: error.message});
    }
}