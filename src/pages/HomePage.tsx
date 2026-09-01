import { Link } from "react-router-dom";
import { CatalogueCard } from "../components/CatalogueUI";
import { ContactContent } from "../components/ContentUI";
import { catalogueAreas } from "../data/catalogue";
import { siteInfo } from "../data/site";

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">MUSIC FOR WINDS</p>

          <h1>
            Music written to
            <span>be played.</span>
          </h1>

          <p className="hero__text">
            Música para sopros, repertório flexível, materiais pedagógicos e
            projetos pensados para diferentes contextos de aprendizagem e
            performance.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" to="/catalogo">
              Explorar catálogo
            </Link>

            <Link className="button button--secondary" to="/contacto">
              Contactar
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="identity-card">
            <div className="identity-card__top">
              <span>COMPOSER</span>
              <span>ARRANGER</span>
            </div>

            <div className="identity-card__center">
              <p>{siteInfo.nameUppercase}</p>

              <h2>Music for Winds</h2>

              <span>Performance · Education · Flexible Ensembles</span>
            </div>

            <div className="identity-card__lines">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="statement">
        <p>
          Repertório para diferentes formações e níveis.
          <strong>
            {" "}
            Um catálogo pensado para intérpretes, professores, escolas e
            ensembles.
          </strong>
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CATÁLOGO</p>
            <h2>Explore the music</h2>
          </div>

          <div>
            <p>
              O catálogo encontra-se organizado por formação e contexto
              musical.
            </p>

            <Link className="text-link" to="/catalogo">
              Ver catálogo completo →
            </Link>
          </div>
        </div>

        <div className="catalogue-grid">
          {catalogueAreas.map((area) => (
            <CatalogueCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      <section className="featured section">
        <div className="featured__content">
          <p className="eyebrow">EM DESTAQUE</p>

          <h2>Flex Band</h2>

          <p>
            Uma área dedicada a repertório com instrumentação flexível,
            pensado para se adaptar a diferentes realidades instrumentais.
          </p>

          <Link className="button button--primary" to="/flex-band">
            Explorar Flex Band
          </Link>
        </div>

        <Link className="featured__visual" to="/flex-band">
          <div className="featured__label">
            <span>FLEX</span>
            <span>BAND</span>
          </div>
        </Link>
      </section>

      <section className="education">
        <div className="education__inner">
          <div>
            <p className="eyebrow">INICIAÇÃO MUSICAL</p>

            <h2>Aprender também pode ser tocar.</h2>
          </div>

          <div className="education__text">
            <p>
              Materiais pensados para os primeiros contactos com a música,
              incluindo repertório pedagógico e recursos Play Along.
            </p>

            <Link className="button button--light" to="/iniciacao-musical">
              Ver iniciação musical
            </Link>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="home-about__photo">
          <img
            src={siteInfo.images.homePortrait}
            alt="Tiago Oliveira com clarinete"
          />

          <div className="home-about__photo-label">
            <span>{siteInfo.nameUppercase}</span>
            <span>CLARINETIST · COMPOSER</span>
          </div>
        </div>

        <div className="home-about__content">
          <p className="eyebrow">SOBRE</p>

          <h2>Intérprete, professor e compositor.</h2>

          <p className="home-about__lead">
            Uma atividade artística ligada ao clarinete, à pedagogia, à música
            de conjunto e à criação de novo repertório.
          </p>

          <p>
            Paralelamente à atividade de intérprete e docente, desenvolve
            trabalho na área da composição e do arranjo, com particular atenção
            à música para sopros e à criação de repertório para jovens músicos.
          </p>

          <Link className="text-link" to="/sobre">
            Ler biografia completa →
          </Link>
        </div>
      </section>

      <section className="contact section">
        <p className="eyebrow">CONTACTO</p>

        <h2>Interessado numa obra ou projeto?</h2>

        <ContactContent />
      </section>
    </main>
  );
}