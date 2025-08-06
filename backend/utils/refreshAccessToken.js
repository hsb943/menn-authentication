import UserModel from '../modules/User.js';
import UserRefreshTokenModel from '../modules/UserRefreshToken.js';
import generateTokens from './generateTokens.js';
import verifyRefreshToken from './verifyRefreshToken.js';

const refreshAccessToken = async (req) => { 
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        if (!oldRefreshToken) {
            return { error: true, message: "Refresh token is required" };
        }

        // Verify if Refresh Token is valid or not
        const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);

        if (error) {
            return { error: true, message: "Invalid refresh token" };
        }

        // Find User based on Refresh Token detail id 
        const user = await UserModel.findById(tokenDetails._id);

        if (!user) {
            return { error: true, message: "User not found" };
        }

        // Find the refresh token in database
        const userRefreshToken = await UserRefreshTokenModel.findOne({ userId: tokenDetails._id });

        if (!userRefreshToken) {
            return { error: true, message: "Refresh token not found" };
        }

        // Compare the tokens
        if (oldRefreshToken !== userRefreshToken.token || userRefreshToken.blacklisted) {
            return { error: true, message: "Unauthorized access" };
        }

        // Generate new access and refresh tokens
        const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = await generateTokens(user);
        
        return {
            error: false,
            newAccessToken: accessToken,
            newRefreshToken: refreshToken,
            newAccessTokenExp: accessTokenExp, 
            newRefreshTokenExp: refreshTokenExp,
        }
        
    } catch (error) {
        console.error("Refresh token error:", error);
        return { error: true, message: "Internal server error" };
    }
}

export default refreshAccessToken