import { env } from "../config/env";
import { dayjs } from "./dayjs";
import { prisma } from "./prisma";

async function main() {
  const tripAlreadyExists = await prisma.trip.findUnique({
    where: {
      id: env.TEST_TRIP_ID
    }
  });

  if (tripAlreadyExists) {
    console.log("Trip already created.");

    return;
  }

  const trip = await prisma.trip.create({
    data: {
      id: env.TEST_TRIP_ID,
      destination: "Hawaii",
      starts_at: dayjs("5024-01-10").toDate(),
      ends_at: dayjs("5024-01-20").toDate(),
      is_confirmed: true,
      participants: {
        createMany: {
          data: [
            {
              id: env.TEST_TRIP_OWNER_ID,
              name: "John Doe",
              email: "john@example.com",
              is_confirmed: true,
              is_owner: true
            },
            {
              name: "John Doe Cousin",
              email: "johncousin@example.com"
            },
            {
              id: env.TEST_TRIP_PARTICIPANT_ID,
              name: "John Doe Mother",
              email: "johnmother@example.com",
              is_confirmed: true
            },
            {
              name: "John Doe Father",
              email: "johnfather@example.com",
              is_confirmed: true
            },
            {
              name: "John Doe Brother",
              email: "johnbrother@example.com"
            }
          ]
        }
      },
      activities: {
        createMany: {
          data: [
            {
              title: "Surfing",
              occurs_at: dayjs("5024-01-10").toDate()
            },
            {
              title: "Lunch",
              occurs_at: dayjs("5024-01-10").toDate()
            },
            {
              title: "Lunch",
              occurs_at: dayjs("5024-01-14").toDate()
            },
            {
              title: "Beach",
              occurs_at: dayjs("5024-01-14").toDate()
            },
            {
              title: "Beach",
              occurs_at: dayjs("5024-01-15").toDate()
            },
            {
              title: "Sky Diving",
              occurs_at: dayjs("5024-01-16").toDate()
            },
            {
              title: "Sleep all day",
              occurs_at: dayjs("5024-01-17").toDate()
            },
            {
              title: "Subscribe to Rocketseat's YouTube channel",
              occurs_at: dayjs("5024-01-19").toDate()
            }
          ]
        }
      },
      links: {
        createMany: {
          data: [
            {
              title: "Travel Guide",
              url: "http://example.com/travel-guide"
            },
            {
              title: "Rocketseat Channel",
              url: "http://example.com/travel-guide"
            },
            {
              title: "My LinkedIn",
              url: "http://example.com/travel-guide"
            },
            {
              title: "Repository URL",
              url: "http://example.com/travel-guide"
            }
          ]
        }
      }
    }
  });

  console.log("Created trip:", trip.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
