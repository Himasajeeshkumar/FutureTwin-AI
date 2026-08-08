import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOTP(email, otp) {
    await transporter.sendMail({
        from: `"FutureTwin AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "FutureTwin AI Password Reset OTP",
        html: `
            <div style="font-family:Arial,sans-serif;padding:20px">
                <h2>FutureTwin AI</h2>

                <p>You requested to reset your password.</p>

                <h1 style="letter-spacing:4px">${otp}</h1>

                <p>This OTP is valid for <b>10 minutes</b>.</p>

                <p>If you didn't request this, ignore this email.</p>
            </div>
        `,
    });
}