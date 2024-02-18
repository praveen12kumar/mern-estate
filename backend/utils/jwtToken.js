
// creating token and saving in cookie
import { errorHandler } from "./errorHandler.js"

const sendToken = (user, statusCode, res) => {
    try {
        const token = user.getJWTToken();
  
        // options for cookie
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + (process.env.COOKIE_EXPIRES || 7) * 24 * 60 * 60 * 1000), // Default to 7 days if COOKIE_EXPIRES is not set
        };
   
        res.status(statusCode).cookie("access_token", token, options).json({
            success: true,
            user: {
                // Optionally filter or sanitize user data before sending
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar:user.avatar,
                // ... other necessary fields
            },
            token,
        });
    } catch (error) {
        console.error("Error sending token:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  
    
  export {sendToken};