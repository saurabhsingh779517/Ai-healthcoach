
const crypto = require("crypto");
const User = require("../models/User");
const sendVerificationEmail = require("../services/EmailServices");

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // 1. Check email
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // 3. Check if email is already verified
        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email is already verified",
            });
        }

        // 4. Generate NEW verification token
        const verificationToken = crypto
            .randomBytes(32)
            .toString("hex");

        // 5. Set token expiry to 10 minutes
        const verificationExpires =
            Date.now() + 10 * 60 * 1000;

        // 6. Save new token and expiry
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = verificationExpires;

        await user.save();

        // 7. Send verification email
        await sendVerificationEmail(
            user.email,
            verificationToken
        );

        // 8. Response
        return res.status(200).json({
            message: "Verification email sent successfully",
        });

    } catch (error) {
        console.error("Resend verification error:", error);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    resendVerificationEmail,
};