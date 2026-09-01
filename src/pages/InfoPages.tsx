import { Link } from "react-router-dom";
import {
  BiographyContent,
  ContactContent,
} from "../components/ContentUI";
import { siteInfo } from "../data/site";

export function AboutPage() {
  return (
    <main className="inner-page">
      <section className="about-portrait">
        <div className="about-portrait__image">
          <img
            src={siteInfo.images.aboutPortrait}
            alt="Retrato de Tiago Oliveira com clarinete"
          />
        </div>

        <div className="about-portrait__intro">
          <p className="eyebrow">BIOGRAPHY</p>

          <h1>{siteInfo.name}</h1>

          <p className="about-portrait__subtitle">
            Clarinetist · Composer · Arranger · Teacher
          </p>

          <div className="about-portrait__line" />

          <p className="about-portrait__statement">
            Música, interpretação, pedagogia e criação de repertório para
            diferentes contextos e formações.
          </p>
        </div>
      </section>

      <section className="about-biography">
        <div className="about-biography__side">
          <span>ABOUT</span>
          <strong>TO</strong>
        </div>

        <div className="about-biography__content">
          <p className="eyebrow">BIOGRAFIA</p>

          <h2>Percurso</h2>

          <BiographyContent />
        </div>
      </section>

      <section className="category-contact">
        <div>
          <p className="eyebrow">MÚSICA</p>
          <h2>Explorar o catálogo</h2>
        </div>

        <div>
          <p>
            O repertório encontra-se organizado por diferentes formações e
            contextos musicais.
          </p>

          <Link className="button button--light" to="/catalogo">
            Ver catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__index">02</div>

        <div className="page-hero__content">
          <p className="eyebrow">GET IN TOUCH</p>

          <h1>Contacto</h1>

          <p>Partituras, projetos, instrumentação e outras informações.</p>
        </div>
      </section>

      <section className="contact section">
        <p className="eyebrow">CONTACTO DIRETO</p>

        <h2>Vamos falar.</h2>

        <ContactContent />
      </section>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>

      <h1>Página não encontrada.</h1>

      <Link className="button button--primary" to="/">
        Voltar ao início
      </Link>
    </main>
  );
}