type MessageAddress = {
  name: string;
  address: string;
};

export type MailMessage = {
  to: MessageAddress;
  from: MessageAddress;
  subject: string;
  html: string;
};

export interface MailService {
  sendMail(message: MailMessage): Promise<void>;
}
