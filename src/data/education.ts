export type EducationResourceType =
  | "book"
  | "play-along"
  | "orff"
  | "ensemble"
  | "other";

export type EducationResource = {
  slug: string;
  title: string;
  type: EducationResourceType;

  subtitle?: string;
  description?: string;

  instruments?: string[];
  levels?: string[];

  image?: string;
  audio?: string;
  scoreSample?: string;

  featured?: boolean;
};

/*
  INICIAÇÃO MUSICAL

  Este ficheiro ficará reservado para materiais pedagógicos
  que não tenham de funcionar exatamente como uma obra
  tradicional do catálogo.

  Exemplos de tipos possíveis:

  "book"
  "play-along"
  "orff"
  "ensemble"
  "other"

  NÃO introduzimos nenhum material real enquanto
  não forem fornecidas as informações respetivas.
*/

export const educationResources: EducationResource[] = [];