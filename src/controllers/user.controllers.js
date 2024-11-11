import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { sendJwtCookie } from "../utils/jwt.cookie.js";


const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                succes: false,
                message: "User already exists With this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        sendJwtCookie(user, res, 201, "User Registered Successfully")

    } catch (error) {
        console.log("Error in Registering User", error);

    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const userExists = await User.findOne({ email }).select("+password")

        if (!userExists) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const user = await User.findById(userExists._id)

        sendJwtCookie(user, res, 200, `Welcome ${user.name}`)

    } catch (error) {
        console.log("Error in Login User", error);


    }
}

const logoutUser = async (req, res) => {
    try {

        res
            .status(200)
            .cookie("token", "", {
                expries: new Date(Date.now())
            })
            .json({
                success: true,
                message: "User Logged Out Successfully"
            })

         

    } catch (error) {
        console.log("Error in Logout User", error); 
    }
}

const getUserDetails = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            user: req.user
        })

    } catch (error) {
        console.log("Error in getting User Details", error);

    }
}

export { registerUser, loginUser, logoutUser, getUserDetails }