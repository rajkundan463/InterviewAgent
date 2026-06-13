import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
try {
const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No authorization header found"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const verifyToken = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    if (!verifyToken) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    req.userId = verifyToken.userId;

    next();

} catch (error) {
    return res.status(500).json({
        message: `isAuth error ${error.message}`
    });
}};

export default isAuth;
