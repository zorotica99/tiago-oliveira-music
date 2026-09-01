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
    slug: "the-wind-spand",
    title: "The Wind Spand",
    category: "flex-band",

    composerName: "Alberto Caeiro",
    subtitle: "for Flex Band",

    instrumentation:
      "5 Flexible Parts + Percussion",

    duration: "ca. 2:30",
    year: "2026",
    level: "Grade 1.5",

    description:
      "Uma obra de carácter sério e expressivo para Flex Band, concebida para jovens músicos e instrumentação flexível. Ao longo da obra, a escrita explora diferentes cores e texturas, incluindo um momento em que os intérpretes mais jovens utilizam garrafas para produzir som, integrando um elemento tímbrico pouco convencional na performance.",

    audio: "/audio/the-wind-spand.mp3",
    scoreSample: "/scores/the-wind-spand.pdf",

    featured: true,
  },

  {
    slug: "basses-for-fun",
    title: "Basses for Fun",
    category: "concert-band",

    composerName: "Alberto Caeiro",
    subtitle: "for Concert Band",

    instrumentation:
      "Flute, Oboe, Clarinet in B♭ 1, Clarinet in B♭ 2, Clarinet in B♭ 3, Alto Saxophone, Tenor Saxophone, Baritone Saxophone, Bassoon, Trumpet in B♭ 1, Trumpet in B♭ 2, Horn in F, Trombone, Euphonium, Tuba, Timpani, Tambourine, Triangle, Marimba",

    duration: "ca. 3:00",
    year: "2025",
    level: "Grade 2",

    description:
      "Uma obra divertida para Concert Band que procura inverter, por momentos, os papéis habituais dentro da banda. Os instrumentos graves ganham especial protagonismo, assumindo frequentemente uma função melódica e tornando-se quase a voz principal da obra. Uma peça leve e enérgica, pensada para valorizar os baixos e proporcionar um momento divertido tanto aos músicos como ao público.",

    audio: "/audio/basses-for-fun.mp3",
    scoreSample: "/scores/basses-for-fun.pdf",

    featured: false,
  },

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