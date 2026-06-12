import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    console.log("===== AUTH DEBUG =====");
    console.log("req.cookies:", req.cookies);
    console.log("token:", req.cookies?.token);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    let { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        message: "user does not have a token",
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("verifyToken:", verifyToken);

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(500).json({
      message: `isAuth error ${error}`,
    });
  }
};

export default isAuth;