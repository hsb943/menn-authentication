import dotenv from "dotenv"
dotenv.config()

import jwt from 'jsonwebtoken';
import UserRefreshTokenModel from '../modules/UserRefreshToken.js';

const verifyRefreshToken = async (providedRefreshToken) => {
    try {
        if (!providedRefreshToken) {
            return { error: true, message: "Refresh token is required" };
        }

        const privateKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

        // Find the refresh token document
        const storedTokenDoc = await UserRefreshTokenModel.findOne({ token: providedRefreshToken});

        // If refresh token not found, return error
        if(!storedTokenDoc){
            return { error: true, message: "Invalid refresh token" };
        }

        // Verify the refresh token
        const tokenDetails = jwt.verify(providedRefreshToken, privateKey);

        // If verification successful, return token details
        return {
            tokenDetails: {
                _id: tokenDetails.id, // Extract the id from the token payload
                ...tokenDetails
            },
            error: false,
            message: "Valid refresh token",
        }
        
    } catch (error) {
        console.error("Token verification error:", error);
        return { error: true, message: "Invalid refresh token" };
    }
}

export default verifyRefreshToken