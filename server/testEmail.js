import dotenv from "dotenv";
dotenv.config();

import { sendOTP } from "./utils/sendEmail.js";

try {

    await sendOTP(
        "himasajeesh2005@gmail.com",
        "123456"
    );

    console.log("✅ Test email sent successfully!");

} catch (error) {

    console.error("❌ Email failed:", error);

}