const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
    // Convert expiration times to milliseconds
    const accessTokenMaxAge = Math.max(0, (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000);
    const refreshTokenMaxAge = Math.max(0, (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000);

    // Set Cookie for Access Token
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: accessTokenMaxAge
    });

    // Set Cookie for Refresh Token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: refreshTokenMaxAge
    });

    // Set Cookie for is_auth
    res.cookie('is_auth', true, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: refreshTokenMaxAge
    });
}

export default setTokensCookies; 

