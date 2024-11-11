import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please Login to get User Details"
        })
    }

    const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedTokenData._id)

    next()
}

export { isAuthenticated }