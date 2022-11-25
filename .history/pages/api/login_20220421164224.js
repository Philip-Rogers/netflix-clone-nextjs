// Import magic admin so we can communicate server side
import { magicAdmin } from "../../lib/magic";

// Requires npm install jsonwebtoken
import jwt from "jsonwebtoken";

// Import functions to check user info and create new user where applicable
import { isNewUser, createNewUser } from "../../lib/db/hasura";

// Import function so we can create cookies
import { setTokenCookie } from "../../lib/cookies";


// Function to grab database information
export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : "";

            // Invoke magic admin
            const metadata = await magicAdmin.users.getMetadataByToken(didToken);

            // Create jwt tokens
            const token = jwt.sign(
                {
                ...metadata,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": `${metadata.issuer}`,
                },
            },
            process.env.JWT_SECRET
        );

            const isNewUserQuery = await isNewUser(token, metadata.issuer);
            isNewUserQuery && (await createNewUser(token, metadata));
            // Create cookie
            setTokenCookie(token, res);
            res.send({ done: true });
        } catch (error) {
            console.error("Something went wrong logging in", error);
            res.status(500).send({ done: false });
        }
    } else {
        res.send({ done: false });
    }
}