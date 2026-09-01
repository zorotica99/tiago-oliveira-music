import { biography, siteInfo } from "../data/site";

export function BiographyContent() {
  return (
    <div className="biography">
      {biography.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
      ))}
    </div>
  );
}

export function ContactContent() {
  return (
    <>
      <p>
        Para informações sobre partituras, disponibilidade, instrumentação,
        encomendas ou novos projetos, entra diretamente em contacto.
      </p>

      <div className="contact__links">
        <a
          className="button button--light"
          href={`mailto:${siteInfo.email}`}
        >
          Email
        </a>

        <a
          className="button button--light"
          href={siteInfo.instagram}
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>

      <a className="contact__email" href={`mailto:${siteInfo.email}`}>
        {siteInfo.email}
      </a>
    </>
  );
}