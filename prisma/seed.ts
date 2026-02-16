import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  await prisma.user.upsert({
    where: { email: "admin@stupno.cz" },
    update: {},
    create: {
      email: "admin@stupno.cz",
      password: hashSync("admin123", 10),
      name: "Admin",
      role: "ADMIN",
    },
  });

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      seriesName: "Mistrovství XC Horských kol STUPNO",
      contactEmail: "info@stupno.cz",
      contactPhone: "+420 123 456 789",
      facebookUrl: "https://facebook.com/stupnobike",
      instagramUrl: "https://instagram.com/stupnobike",
      registrationUrl: "https://registrace.sportobchod.cz",
      showUciLogo: true,
    },
  });

  // Race — only Stupno
  await prisma.race.upsert({
    where: { slug: "stupno" },
    update: {
      title: "Horská kola Stupno",
      date: new Date("2026-07-17"),
      location: "Stupno u Rokycan",
      uciCategory: "C1",
      heroImage: "/media/races/stupno/hero-poster.jpg",
      heroVideo: "/media/races/stupno/hero-video-720p.mp4",
      heroVideoWebm: "/media/races/stupno/hero-video-720p.webm",
      showHeroVideo: true,
      registrationUrl: "https://registrace.sportobchod.cz/stupno",
    },
    create: {
      title: "Horská kola Stupno",
      slug: "stupno",
      date: new Date("2026-07-17"),
      location: "Stupno u Rokycan",
      uciCategory: "C1",
      navOrder: 1,
      status: "PUBLISHED",
      heroImage: "/media/races/stupno/hero-poster.jpg",
      heroVideo: "/media/races/stupno/hero-video-720p.mp4",
      heroVideoWebm: "/media/races/stupno/hero-video-720p.webm",
      showHeroVideo: true,
      description:
        "<h2>Hlavní závod série</h2><p>Horská kola Stupno je hlavním závodem celé série Mistrovství XC. UCI kategorie C1 přitahuje nejlepší jezdce z celé Evropy.</p><h3>Kategorie</h3><ul><li>Elite muži</li><li>Elite ženy</li><li>U23 muži</li><li>Junioři / Juniorky</li><li>Kadeti / Kadetky</li></ul><p>Okruh vede kolem obce Stupno s technicky náročnými sjezdy a výjezdy.</p>",
      program: JSON.stringify([
        {
          day: "Sobota",
          items: [
            { time: "9:00", desc: "Kadeti / Kadetky" },
            { time: "11:00", desc: "Junioři / Juniorky" },
            { time: "13:00", desc: "U23 muži" },
          ],
        },
        {
          day: "Neděle",
          items: [
            { time: "10:00", desc: "Elite ženy" },
            { time: "12:00", desc: "Elite muži" },
            { time: "15:00", desc: "Vyhlášení výsledků" },
          ],
        },
      ]),
      parking:
        "<p>Hlavní parkoviště u sportovního areálu (200 míst). Záložní parkoviště u školy (100 míst). Doporučujeme příjezd od Rokycan.</p>",
      organizer:
        "<p>Hlavní organizátor: TJ Stupno Bike<br/>Ředitel závodu: Jan Novák<br/>Technický delegát UCI: Peter Schmidt</p>",
      registrationUrl: "https://registrace.sportobchod.cz/stupno",
    },
  });

  // Partners
  const partners = [
    {
      name: "AC Heating",
      logo: "/uploads/partners/ac-heating.svg",
      url: "https://www.ac-heating.cz",
      type: "MAIN",
      order: 1,
    },
    {
      name: "CUBE",
      logo: "/uploads/partners/cube.svg",
      url: "https://www.cube.eu",
      type: "SERIES",
      order: 2,
    },
    {
      name: "Raben",
      logo: "/uploads/partners/raben.svg",
      url: "https://www.rfraben.com",
      type: "SERIES",
      order: 3,
    },
  ];

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({
      where: { name: partner.name },
    });
    if (!existing) {
      await prisma.partner.create({ data: partner });
    }
  }

  // Demo article
  const articleExists = await prisma.article.findUnique({
    where: { slug: "sezona-2026-startuje" },
  });
  if (!articleExists) {
    await prisma.article.create({
      data: {
        title: "Sezóna 2026 startuje!",
        slug: "sezona-2026-startuje",
        content:
          "<h2>Mistrovství XC Horských kol STUPNO 2026</h2><p>S radostí oznamujeme hlavní závod sezóny 2026! 17. července se v obci Stupno u Rokycan uskuteční prestižní závod horských kol UCI kategorie C1.</p><h3>Co je nového?</h3><ul><li>Navýšené prize money pro Elite kategorie</li><li>Vylepšený okruh s novými technickými sekcemi</li><li>Live timing a stream</li></ul><p>Registrace bude otevřena 4 týdny před závodem.</p>",
        excerpt:
          "S radostí oznamujeme hlavní závod sezóny 2026! 17. července se ve Stupně uskuteční prestižní závod horských kol UCI C1.",
        tags: JSON.stringify(["sezóna 2026", "novinky", "Stupno"]),
        status: "PUBLISHED",
        publishedAt: new Date("2026-02-01"),
      },
    });
  }

  // Static pages
  const pages = [
    {
      title: "O nás",
      slug: "o-nas",
      content:
        "<h2>O závodě Horská kola Stupno</h2><p>Mistrovství XC Horských kol Stupno je prestižní závod horských kol v České republice. Závod UCI kategorie C1 přitahuje nejlepší jezdce z celé Evropy.</p><p>Závod se koná od roku 2018 a stal se jedním z nejpopulárnějších MTB XCO závodů ve střední Evropě.</p>",
    },
    {
      title: "Pravidla",
      slug: "pravidla",
      content:
        "<h2>Pravidla závodu 2026</h2><h3>Kategorie</h3><ul><li>Elite muži</li><li>Elite ženy</li><li>U23 muži</li><li>Junioři / Juniorky</li><li>Kadeti / Kadetky</li></ul><h3>Registrace</h3><p>Registrace probíhá online. Kapacita závodního pole je omezena.</p>",
    },
    {
      title: "Kontakt",
      slug: "kontakt",
      content:
        "<h2>Kontaktujte nás</h2><p>Email: info@stupno.cz<br/>Telefon: +420 123 456 789</p><p>Sídlo organizátora:<br/>TJ Stupno Bike<br/>Stupno 123<br/>337 01 Rokycany</p>",
    },
    {
      title: "Dále pořádáme",
      slug: "dale-poradame",
      content:
        "<h2>Další akce</h2><p>Kromě hlavního závodu pořádáme také:</p><ul><li>Stupno MTB Marathon – maratonský závod horských kol</li><li>Stupno Kids Race – závody pro děti</li><li>Zimní cyklokrosový pohár</li></ul>",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  // Demo results for Stupno
  const stupnoRace = await prisma.race.findUnique({
    where: { slug: "stupno" },
  });
  if (stupnoRace) {
    const existingResults = await prisma.result.count({
      where: { raceId: stupnoRace.id },
    });
    if (existingResults === 0) {
      await prisma.result.createMany({
        data: [
          { raceId: stupnoRace.id, category: "Elite muži", position: 1, name: "Jan Novák", team: "AC Sparta Praha", time: "1:29:10", points: 100 },
          { raceId: stupnoRace.id, category: "Elite muži", position: 2, name: "Petr Svoboda", team: "CUBE Team", time: "+23s", points: 80 },
          { raceId: stupnoRace.id, category: "Elite muži", position: 3, name: "Martin Dvořák", team: "Raben Cycling", time: "+45s", points: 60 },
          { raceId: stupnoRace.id, category: "Elite ženy", position: 1, name: "Anna Černá", team: "AC Sparta Praha", time: "1:15:30", points: 100 },
          { raceId: stupnoRace.id, category: "Elite ženy", position: 2, name: "Kateřina Malá", team: "CUBE Team", time: "+1:12", points: 80 },
        ],
      });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
