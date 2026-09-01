import type { WorkCategory } from "./works";

export type CatalogueArea = {
  number: string;
  slug: string;
  id: WorkCategory | "marchas";
  title: string;
  shortTitle: string;
  subtitle: string;
  tag: string;
  description: string;
};

export const catalogueAreas: CatalogueArea[] = [
  {
    number: "01",
    id: "flex-band",
    slug: "/flex-band",
    title: "Flex Band",
    shortTitle: "Flex Band",
    subtitle: "Flexible instrumentation",
    tag: "FLEXIBLE ENSEMBLES",
    description:
      "Repertório pensado para formações flexíveis e diferentes combinações instrumentais.",
  },
  {
    number: "02",
    id: "concert-band",
    slug: "/concert-band",
    title: "Concert Band",
    shortTitle: "Concert Band",
    subtitle: "Wind band repertoire",
    tag: "WIND MUSIC",
    description:
      "Obras para banda, ensemble de sopros e diferentes contextos de concerto.",
  },
  {
    number: "03",
    id: "marchas",
    slug: "/marchas",
    title: "Marchas",
    shortTitle: "Marchas",
    subtitle: "Street & Processional Marches",
    tag: "MARCH MUSIC",
    description:
      "Uma área dedicada a marchas, organizada entre repertório de rua e repertório de procissão.",
  },
  {
    number: "04",
    id: "iniciacao-musical",
    slug: "/iniciacao-musical",
    title: "Iniciação Musical",
    shortTitle: "Iniciação",
    subtitle: "Music education",
    tag: "EDUCATION",
    description:
      "Materiais pedagógicos, repertório para os primeiros anos de aprendizagem e recursos com Play Along.",
  },
  {
    number: "05",
    id: "clarinete-camara",
    slug: "/clarinete-camara",
    title: "Clarinete & Música de Câmara",
    shortTitle: "Clarinete & Câmara",
    subtitle: "Clarinet and chamber music",
    tag: "CHAMBER MUSIC",
    description:
      "Repertório para clarinete, pequenas formações e diferentes contextos camerísticos.",
  },
  {
    number: "06",
    id: "vocal-concert-band",
    slug: "/vocal-concert-band",
    title: "Vocal & Concert Band",
    shortTitle: "Vocal & Band",
    subtitle: "Voice, Choir & Wind Ensemble",
    tag: "VOCAL MUSIC",
    description:
      "Obras para voz, solistas vocais ou coro com acompanhamento de Concert Band e ensemble de sopros.",
  },
];

export const marchAreas: CatalogueArea[] = [
  {
    number: "01",
    id: "marchas-rua",
    slug: "/marchas/rua",
    title: "Marchas de Rua",
    shortTitle: "Rua",
    subtitle: "Street Marches",
    tag: "MARCHAS DE RUA",
    description:
      "Área dedicada ao repertório de marcha destinado a contextos de rua.",
  },
  {
    number: "02",
    id: "marchas-procissao",
    slug: "/marchas/procissao",
    title: "Marchas de Procissão",
    shortTitle: "Procissão",
    subtitle: "Processional Marches",
    tag: "MARCHAS DE PROCISSÃO",
    description:
      "Área dedicada ao repertório de marcha destinado a contextos de procissão.",
  },
];

export const allCatalogueAreas = [...catalogueAreas, ...marchAreas];