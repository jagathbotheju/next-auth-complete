import nodemailer from "nodemailer";
import { html } from "./htmlEmail";

interface Props {
  to: string;
  url: string;
  text: string;
}

const sendEmail = async ({ to, url, text }: Props) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jagathbotheju@gmail.com",
      pass: "ssqfsmhfflltarqx",
    },
  });

  const mailOptions = {
    from: "myauthapp@gmail.com",
    to,
    subject: "MyAuthApp",
    html: html({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};

export default sendEmail;
