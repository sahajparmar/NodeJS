"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const environment_1 = require("../environments/environment");
// Load environment variables from .env file
dotenv.config();
class NodeMailer {
    static initiateTransport() {
        return nodeMailer.createTransport({
            service: "mailtrap",
            auth: {
                user: (0, environment_1.getEnvironmentVariables)().mail_auth.user,
                pass: (0, environment_1.getEnvironmentVariables)().mail_auth.pass,
            },
        });
    }
    static sendMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: (0, environment_1.getEnvironmentVariables)().testMail.email_from,
                to: data.to.join(", "),
                subject: data.subject,
                html: data.html,
            };
            try {
                const transport = NodeMailer.initiateTransport();
                yield transport.sendMail(mailOptions);
                console.log("Email sent successfully");
            }
            catch (error) {
                console.error("Error sending email:", error);
                throw error;
            }
        });
    }
}
exports.NodeMailer = NodeMailer;
