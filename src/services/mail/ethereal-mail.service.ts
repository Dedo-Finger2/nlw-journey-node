import { MailMessage, MailService } from "./mail.service";
import nodemailer, { TestAccount, Transporter } from "nodemailer";

export class EtherealMailService implements MailService {
  private constructor(
    private readonly transporter: Transporter,
    private readonly account: TestAccount
  ) {}

  static async build() {
    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    return new EtherealMailService(transporter, account);
  }

  async sendMail(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      to: message.to,
      from: message.from,
      subject: message.subject,
      html: message.html
    });
  }
}
