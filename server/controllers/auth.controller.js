import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;


        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
            });
        }

        const token = await genToken(user._id);

        return res.status(200).json({
            success: true,
            user,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Google auth error: ${error.message} `,
        });
    }

};

export const logOut = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Logout error: ${error.message}`,
        });
    }
};