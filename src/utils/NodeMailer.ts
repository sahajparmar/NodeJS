import * as nodeMailer from "nodemailer";
import * as dotenv from "dotenv";
import { getEnvironmentVariables } from "../environments/environments";
// Load environment variables from .env file
dotenv.config();
export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport({
      service: "mailtrap",
      auth: {
        user: getEnvironmentVariables().mail_auth.user,
        pass: getEnvironmentVariables().mail_auth.pass,
      },
    });
  }
  static async sendMail(data: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions = {
      from: getEnvironmentVariables().testMail.email_from,
      to: data.to.join(", "),
      subject: data.subject,
      html: data.html,
    };
    try {
      const transport = NodeMailer.initiateTransport();
      await transport.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
