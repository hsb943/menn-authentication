import jwt from "jsonwebtoken";
import UserRefreshTokenModel from "../modules/UserRefreshToken.js";

import dotenv from 'dotenv'
dotenv.config()

const generateTokens = async(user) => {
    try {
        const payload = { 
            id: user._id.toString(), // Convert ObjectId to string
            roles: user.roles
        };

        // Generate Access Token with expiration time 
        const accessTokenExp = Math.floor(Date.now() / 1000) + 100; //  Set expiration to 100 seconds from now 
        const accessToken = jwt.sign(
            {...payload, exp: accessTokenExp},
            process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        );

        // Generate Refresh Token with expiration time 
        const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;  // Set expiration to 5 days from now
        const refreshToken = jwt.sign(
            {...payload, exp: refreshTokenExp},
            process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        );

        // Delete old refresh token
        await UserRefreshTokenModel.findOneAndDelete({userId: user._id});

        // Save refresh token to database 
        await new UserRefreshTokenModel({ 
            userId: user._id, 
            token: refreshToken 
        }).save();

        return { accessToken, refreshToken, accessTokenExp, refreshTokenExp };
    } catch (error) {
        console.error('Token Generation Error:', error);
        throw error; // Propagate error to be handled by caller
    }
}

export default generateTokens;
