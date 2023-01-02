import { User } from "../models";
import { asyncHandler } from "../services";
import { customError } from "../utils";

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}

/************************************************************* 
 @SIGNUP
 @route http://localhost:4000/api/auth/signup
 @description  user signup controller for creating new user
 @parameters name, email, password
 @returns User Object
**************************************************************/

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new customError('Please fill all fields', 400)
    }
    // check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new customError('User already exists', 400)
    }

    // save data into database
    const user = await User.create({ name, email, password })
    // check token
    const token = user.getJwtToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(200).json({success: true, token, user})
})