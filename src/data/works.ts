export type WorkCategory =
  | "flex-band"
  | "concert-band"
  | "marchas-rua"
  | "marchas-procissao"
  | "iniciacao-musical"
  | "clarinete-camara"
  | "vocal-concert-band";

export type Work = {
  slug: string;
  title: string;
  category: WorkCategory;

  composerName?: string;
  subtitle?: string;
  instrumentation?: string;
  duration?: string;
  year?: string;
  level?: string;
  description?: string;

  audio?: string;
  scoreSample?: string;
  image?: string;

  featured?: boolean;
};

/*
  CATÁLOGO

  Categorias disponíveis:

  "flex-band"
  "concert-band"
  "marchas-rua"
  "marchas-procissao"
  "iniciacao-musical"
  "clarinete-camara"
  "vocal-concert-band"

  Estrutura preparada para:

  audio:
  "/audio/nome-da-obra.mp3"

  scoreSample:
  "/scores/nome-da-obra.pdf"

  image:
  "/images/works/nome-da-obra.jpg"
*/

export const works: Work[] = [
  {
    slug: "semper-caecum",
    title: "Semper Caecum",
    category: "concert-band",

    composerName: "Alberto Caeiro",
    subtitle: "for Concert Band",

    instrumentation:
      "Flute, Oboe, Clarinet in B♭ 1, Clarinet in B♭ 2, Clarinet in B♭ 3, Bass Clarinet in B♭, Alto Saxophone 1, Alto Saxophone 2, Tenor Saxophone, Baritone Saxophone, Bassoon 1, Bassoon 2, Trumpet in B♭ 1, Trumpet in B♭ 2, Horn in F, Trombone 1, Trombone 2, Euphonium, Tuba, Tenor Drum, Cowbell, Marimba",

    duration: "ca. 4:00",
    year: "2026",
    level: "Grade 3",

    description:
      "Uma obra curta, enérgica e divertida para Concert Band, concebida como um momento leve de concerto ou como encore. Com forte carácter rítmico, contrastes súbitos e uma escrita irreverente, procura sobretudo surpreender intérpretes e público.",

    audio: "/audio/semper-caecum.mp3",
    scoreSample: "/scores/semper-caecum.pdf",

    featured: true,
  },

  {
    slug: "coro-dos-sabios",
    title: "Coro dos Sábios",
    category: "vocal-concert-band",

    composerName: "Alberto Caeiro",
    subtitle: "for Two Voices and Concert Band",

    instrumentation:
      "2 Solo Voices, Flute, Oboe (optional Flute 2), Clarinet in B♭ 1, Clarinet in B♭ 2, Bass Clarinet in B♭, Alto Saxophone, Tenor Saxophone, Bassoon, Trumpet in B♭ 1, Trumpet in B♭ 2, Trumpet in B♭ 3, Horn in F, Trombone, Euphonium, Tuba, Timpani, Glockenspiel, Wind Chimes / Suspended Cymbal",

    duration: "ca. 4:45",
    year: "2026",
    level: "Grade 2.5",

    description:
      "Uma obra para dois solistas vocais e Concert Band, de carácter expressivo e motivacional. As duas partes vocais foram concebidas com uma tessitura relativamente acessível, permitindo a participação de cantores sem exigir um registo vocal extremo.",

    audio: "/audio/coro-dos-sabios.mp3",
    scoreSample: "/scores/coro-dos-sabios.pdf",

    featured: false,
  },
];