import refreshAccessToken from "../utils/refreshAccessToken.js";
import isTokenExpired from "../utils/isTokenExpired.js"
import setTokensCookies from "../utils/setTokensCookies.js";   

const accessTokenAutoRefresh = async(req , res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (accessToken && !isTokenExpired(accessToken)) {
            // add the access token to the Authorization header
            req.headers['authorization'] = `Bearer ${accessToken}`
        }

        if (!accessToken || isTokenExpired(accessToken)) {
            // Attempt to get a new access token using the refresh token 
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken) {
                // If refresh token is missing, throw an error
                throw new Error("Refresh token is missing")
            }

            // Access token is expired, make a refresh token request
            const result = await refreshAccessToken(req)

            if (result.error) {
                throw new Error(result.message);
            }

            const {newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp} = result;

            //set cookies
            setTokensCookies(res, newAccessToken, newRefreshToken, newAccessTokenExp, newRefreshTokenExp);

            // Add the access token to the Authorization header
            req.headers['authorization'] = `Bearer ${newAccessToken}`
        }

        next()

    } catch (error) {
        // Handle the error, such as returing an error response or redirecting to the login page 
        res.status(401).json({ error: "Unauthorized", message: "Access token is missing or invalid"});
        }
    }

    export default accessTokenAutoRefresh
