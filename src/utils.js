import { jwt } from 'jsonwebtoken'

APP_SECRET = "test"

function getTokenPayload(token) {
    return jwt.verify(token, APP_SECRET)
}

function getUserId(req, authToken) {
    if(req) {
        const authHeader = req.header.authorization;

        if(authHeader) {
            const token = authHeader.replace("Bearer", "");
            if(!token) {
                throw new Error("")
            }

            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }

    throw new Error("")
}

export default {
    APP_SECRET,
    getUserId,
};