import { NextApiRequest, NextApiResponse } from "next";
import getCookieByName from "@/lib/getCookieByName";
import verifyToken from "@/lib/verifyToken";
import connectionPool from "@/lib/db";
import { TokenExpiredError } from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;
    const cookie = req.headers.cookie || "";
    const accessToken = getCookieByName("accessToken", cookie);
    let decodedToken;

    // validate input
    if (!userId) {
        return res.status(400).send({
            error: true,
            message: "Missing userId parameter"
        });
    }

    // users can only see their own profile information
    if (!accessToken) {
        return res.status(401).send({
            error: true,
            message: "Cannot access profile information because user is not logged in"
        });
    }

    try {
        decodedToken = await verifyToken(accessToken);
        if (decodedToken.user_id !== userId) {
            res.status(401).send({
                error: true,
                message: "User id provided in request does not match user id of logged in user"
            });
        }
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).send({
                errror: true,
                message: "Acces token has expired. Please log in again"
            })
        }
    }

    // at this point, we have authenticated user
    const query = `SELECT username, fullname, phone, email, street, optaddress, city, state, zipcode FROM Users WHERE user_id=${userId}`;


    connectionPool.query(query, (error: any, results: any, fields: any) => {
        if (error) {
            res.status(500).send({
                error: true,
                message: error.message
            });
        } else if (results.length === 0) {
            res.status(401).send({
                error: true,
                message: "User does not exists"
            });
        }

        const { username, fullname, phone, email, street, optaddress, city, state, zipcode } = results[0];

        res.status(200).send({
            error: false,
            username: username,
            fullname: fullname,
            phone: phone,
            email: email,
            street: street,
            optaddress: optaddress,
            city: city,
            state: state,
            zipcode: zipcode
        });
    });
}