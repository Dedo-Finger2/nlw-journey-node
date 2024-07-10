import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AppService } from "../../interfaces/app-service.interface";
import { MailService } from "../../services/mail/mail.service";
import { TripEntity } from "../domain/entities/trip.entity";
import { TripRepository } from "../repositories/trip.repository";

dayjs.extend(localizedFormat);
dayjs.locale("pt-br");

export type CreateTripServiceRequest = {
  destination: string;
  startsAt: Date;
  endsAt: Date;
  isConfirmed: boolean;
  ownerName: string;
  ownerEmail: string;
  emailsToInvite: Array<string>;
};

export type CreateTripServiceResponse = {
  tripId: string;
};

export class CreateTripService
  implements AppService<CreateTripServiceRequest, CreateTripServiceResponse>
{
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly mailService: MailService
  ) {}

  async execute({
    destination,
    startsAt,
    endsAt,
    isConfirmed,
    ownerName,
    ownerEmail,
    emailsToInvite
  }: CreateTripServiceRequest): Promise<CreateTripServiceResponse> {
    const tripEntity = TripEntity.build({
      destination,
      startsAt,
      endsAt,
      isConfirmed
    });

    const { tripId } = await this.tripRepository.save({
      tripEntity,
      ownerName,
      ownerEmail,
      emailsToInvite
    });

    const formattedStartDate = dayjs(startsAt).format("LL");
    const formattedEndDate = dayjs(endsAt).format("LL");

    const confirmationRouteUrl = `http://localhost:3333/trips/${tripId}/confirm`;

    await this.mailService.sendMail({
      to: {
        name: ownerName,
        address: ownerEmail
      },
      from: {
        name: "Equipe Plann.er",
        address: "planner@company.com"
      },
      subject: `Confirmação da sua viagem para ${destination} em ${formattedStartDate}.`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você solicitou a crianção de uma viagem para <strong>${destination}</strong> nas datas de <strong>${formattedStartDate}</strong> até <strong>${formattedEndDate}</strong>.</p>
          <p>Para confirmar sua viagem, clique no link abaixo:</p>
          <p>
            <a href="${confirmationRouteUrl}">Confirmar viagem</a>
          </p>
          <p>Caso esteja usando um dispositivo móvel, você também pode confirmar a criação da viagem pelos aplicativos:</p>
          <p>
            <a href="#">Aplicativo para IPhone</a>
          </p>
          <p>
            <a href="#">Aplicativo para Android</a>
          </p>
          <p>Caso você não saiba do que se trata este e-mail, apenas ignore-o.</p>
        </div>
      `.trim()
    });

    return {
      tripId
    };
  }
}
