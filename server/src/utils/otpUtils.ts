import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendOtpToEmail = async (email: string): Promise<string> => {
  const otp = generateOtp();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your OTP for Account Verification",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", otp);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }

  return otp;
};

const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

let otpStore: Record<string, { otp: string; expiresAt: number }> = {};

export const validateOtp = async (
  userId: string,
  otp: string
): Promise<boolean> => {
  const storedOtp = otpStore[userId];

  if (!storedOtp) return false;

  const isExpired = Date.now() > storedOtp.expiresAt;
  if (isExpired) {
    delete otpStore[userId];
    return false;
  }

  if (storedOtp.otp === otp) {
    delete otpStore[userId];
    return true;
  }

  return false;
};

export const storeOtp = (userId: string, otp: string) => {
  otpStore[userId] = {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, 
  };
};
