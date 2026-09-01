import { useMemo, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  CatalogueCard,
  CategoryNavigation,
  getAreaForWork,
  WorkListItem,
} from "../components/CatalogueUI";
import {
  catalogueAreas,
  marchAreas,
  type CatalogueArea,
} from "../data/catalogue";
import { siteInfo } from "../data/site";
import { works, type WorkCategory } from "../data/works";

export function CataloguePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    WorkCategory | "marchas" | "all"
  >("all");

  const filteredWorks = useMemo(() => {
    const searchValue = search.trim().toLocaleLowerCase("pt");

    return works.filter((work) => {
      const categoryMatches =
        activeCategory === "all"
          ? true
          : activeCategory === "marchas"
            ? work.category === "marchas-rua" ||
              work.category === "marchas-procissao"
            : work.category === activeCategory;

      const searchableContent = [
        work.title,
        work.composerName,
        work.subtitle,
        work.instrumentation,
        work.year,
        work.level,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("pt");

      const searchMatches =
        searchValue.length === 0 || searchableContent.includes(searchValue);

      return categoryMatches && searchMatches;
    });
  }, [search, activeCategory]);

  const hasFilters = search.trim() !== "" || activeCategory !== "all";

  return (
    <main className="inner-page">
      <section className="page-hero catalogue-main-hero">
        <div className="page-hero__index">00</div>

        <div className="page-hero__content">
          <p className="eyebrow">MUSIC CATALOGUE</p>

          <h1>Catálogo</h1>

          <p>
            Explora o repertório através das diferentes formações e áreas
            musicais.
          </p>
        </div>
      </section>

      <section className="catalogue-navigation">
        <div className="catalogue-navigation__inner">
          <span>ÁREAS</span>

          <div>
            {catalogueAreas.map((area) => (
              <Link key={area.slug} to={area.slug}>
                {area.number} {area.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="catalogue-browser">
        <div className="catalogue-browser__inner">
          <div className="catalogue-browser__heading">
            <div>
              <p className="eyebrow">TODAS AS OBRAS</p>
              <h2>Pesquisar catálogo</h2>
            </div>

            <span>
              {works.length} {works.length === 1 ? "obra" : "obras"}
            </span>
          </div>

          <div className="catalogue-tools">
            <label className="catalogue-search">
              <span>PROCURAR</span>

              <div className="catalogue-search__field">
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Título, instrumentação, nível..."
                  aria-label="Pesquisar catálogo"
                />

                <span className="catalogue-search__icon">⌕</span>
              </div>
            </label>

            <div className="catalogue-filters">
              <span className="catalogue-filters__label">FILTRAR</span>

              <div className="catalogue-filters__buttons">
                <button
                  type="button"
                  className={activeCategory === "all" ? "active" : ""}
                  onClick={() => setActiveCategory("all")}
                >
                  Todas
                </button>

                {catalogueAreas.map((area) => (
                  <button
                    type="button"
                    key={area.id}
                    className={activeCategory === area.id ? "active" : ""}
                    onClick={() => setActiveCategory(area.id)}
                  >
                    {area.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="catalogue-results">
            {filteredWorks.length > 0 ? (
              <>
                <div className="catalogue-results__header">
                  <span>OBRA</span>
                  <span>CATEGORIA</span>
                  <span>FORMAÇÃO</span>
                  <span>INFO</span>
                </div>

                <div className="works-list">
                  {filteredWorks.map((work) => (
                    <WorkListItem key={work.slug} work={work} />
                  ))}
                </div>
              </>
            ) : (
              <div className="catalogue-browser-empty">
                <div className="catalogue-browser-empty__symbol">—</div>

                <div>
                  <p className="eyebrow">
                    {hasFilters ? "SEM RESULTADOS" : "CATÁLOGO"}
                  </p>

                  <h3>
                    {hasFilters
                      ? "Não foram encontradas obras."
                      : "Catálogo em preparação"}
                  </h3>

                  <p>
                    {hasFilters
                      ? "Altera a pesquisa ou seleciona outra categoria."
                      : "A estrutura do catálogo está pronta para receber as obras."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="catalogue-areas-section">
        <div className="catalogue-areas-section__inner">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ÁREAS</p>
              <h2>Por formação</h2>
            </div>

            <div>
              <p>
                Também podes explorar diretamente uma área específica do
                catálogo.
              </p>
            </div>
          </div>

          <div className="catalogue-grid">
            {catalogueAreas.map((area) => (
              <CatalogueCard key={area.slug} area={area} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function StandardCategoryPage({
  area,
}: {
  area: CatalogueArea;
}) {
  const categoryWorks = works.filter((work) => work.category === area.id);

  return (
    <main className="inner-page">
      <section className="category-hero">
        <div className="category-hero__top">
          <Link className="back-link" to="/catalogo">
            ← Catálogo
          </Link>

          <span>{area.tag}</span>
        </div>

        <div className="category-hero__content">
          <div className="category-hero__number">{area.number}</div>

          <div>
            <p className="eyebrow">{area.subtitle}</p>
            <h1>{area.title}</h1>

            <p className="category-hero__description">{area.description}</p>
          </div>
        </div>
      </section>

      <CategoryNavigation current={area} />

      <section className="works-section">
        <div className="works-section__heading">
          <div>
            <p className="eyebrow">REPERTÓRIO</p>
            <h2>Obras</h2>
          </div>

          <span>
            {categoryWorks.length}{" "}
            {categoryWorks.length === 1 ? "obra" : "obras"}
          </span>
        </div>

        {categoryWorks.length > 0 ? (
          <div className="works-list">
            {categoryWorks.map((work) => (
              <WorkListItem key={work.slug} work={work} />
            ))}
          </div>
        ) : (
          <div className="empty-catalogue">
            <div className="empty-catalogue__symbol">—</div>

            <div>
              <p className="eyebrow">REPERTÓRIO</p>

              <h3>Catálogo em preparação</h3>

              <p>
                Esta área está preparada para receber as obras desta categoria.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="category-contact">
        <div>
          <p className="eyebrow">CONTACTO</p>
          <h2>Procuras algo específico?</h2>
        </div>

        <div>
          <p>
            Para informações sobre repertório, instrumentação ou partituras,
            entra diretamente em contacto.
          </p>

          <Link className="button button--light" to="/contacto">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}

export function MarchesPage() {
  const marchesArea = catalogueAreas.find((area) => area.id === "marchas");

  if (!marchesArea) {
    return null;
  }

  return (
    <main className="inner-page">
      <section className="category-hero">
        <div className="category-hero__top">
          <Link className="back-link" to="/catalogo">
            ← Catálogo
          </Link>

          <span>{marchesArea.tag}</span>
        </div>

        <div className="category-hero__content">
          <div className="category-hero__number">{marchesArea.number}</div>

          <div>
            <p className="eyebrow">{marchesArea.subtitle}</p>

            <h1>{marchesArea.title}</h1>

            <p className="category-hero__description">
              {marchesArea.description}
            </p>
          </div>
        </div>
      </section>

      <CategoryNavigation current={marchesArea} />

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MOSTRA DE MARCHAS</p>
            <h2>Escolher repertório</h2>
          </div>

          <div>
            <p>A mostra encontra-se dividida em duas áreas distintas.</p>
          </div>
        </div>

        <div className="catalogue-grid catalogue-grid--marches">
          {marchAreas.map((area) => (
            <CatalogueCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      <section className="category-bottom">
        <div className="category-bottom__number">03</div>

        <div>
          <p className="eyebrow">MOSTRA DE MARCHAS</p>
          <h2>Rua & Procissão</h2>
        </div>
      </section>

      <section className="category-contact">
        <div>
          <p className="eyebrow">CONTACTO</p>
          <h2>Procuras uma marcha específica?</h2>
        </div>

        <div>
          <p>
            Para informações sobre repertório ou partituras, entra diretamente
            em contacto.
          </p>

          <Link className="button button--light" to="/contacto">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}

export function MarchCategoryPage({
  area,
}: {
  area: CatalogueArea;
}) {
  const categoryWorks = works.filter((work) => work.category === area.id);

  return (
    <main className="inner-page">
      <section className="category-hero">
        <div className="category-hero__top">
          <Link className="back-link" to="/marchas">
            ← Marchas
          </Link>

          <span>{area.tag}</span>
        </div>

        <div className="category-hero__content">
          <div className="category-hero__number">{area.number}</div>

          <div>
            <p className="eyebrow">{area.subtitle}</p>

            <h1>{area.title}</h1>

            <p className="category-hero__description">{area.description}</p>
          </div>
        </div>
      </section>

      <nav className="category-navigation">
        <div className="category-navigation__inner">
          <NavLink to="/marchas">
            <span>00</span>
            Todas as Marchas
          </NavLink>

          {marchAreas.map((marchArea) => (
            <NavLink
              key={marchArea.slug}
              to={marchArea.slug}
              className={marchArea.slug === area.slug ? "active" : ""}
            >
              <span>{marchArea.number}</span>
              {marchArea.shortTitle}
            </NavLink>
          ))}
        </div>
      </nav>

      <section className="works-section">
        <div className="works-section__heading">
          <div>
            <p className="eyebrow">MOSTRA DE MARCHAS</p>
            <h2>{area.shortTitle}</h2>
          </div>

          <span>
            {categoryWorks.length}{" "}
            {categoryWorks.length === 1 ? "marcha" : "marchas"}
          </span>
        </div>

        {categoryWorks.length > 0 ? (
          <div className="works-list">
            {categoryWorks.map((work) => (
              <WorkListItem key={work.slug} work={work} />
            ))}
          </div>
        ) : (
          <div className="empty-catalogue">
            <div className="empty-catalogue__symbol">—</div>

            <div>
              <p className="eyebrow">{area.tag}</p>

              <h3>Mostra em preparação</h3>

              <p>
                Esta área está pronta para receber as marchas desta categoria.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="category-bottom">
        <div className="category-bottom__number">{area.number}</div>

        <div>
          <p className="eyebrow">MARCHAS</p>

          <h2>{area.title}</h2>
        </div>
      </section>

      <section className="category-contact">
        <div>
          <p className="eyebrow">CONTACTO</p>

          <h2>Interessado numa marcha?</h2>
        </div>

        <div>
          <p>
            Para informações sobre partituras ou repertório, entra diretamente
            em contacto.
          </p>

          <Link className="button button--light" to="/contacto">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}

export function WorkPage() {
  const { slug } = useParams();
  const [scoreOpen, setScoreOpen] = useState(false);

  const work = works.find((item) => item.slug === slug);

  if (!work) {
    return (
      <main className="work-not-found">
        <div className="work-not-found__inner">
          <p className="eyebrow">CATÁLOGO</p>

          <h1>Obra não encontrada.</h1>

          <p>
            Esta página não corresponde a nenhuma obra disponível no catálogo.
          </p>

          <Link className="button button--primary" to="/catalogo">
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    );
  }

  const area = getAreaForWork(work);

  const metadata = [
    {
      label: "INSTRUMENTAÇÃO",
      value: work.instrumentation,
    },
    {
      label: "DURAÇÃO",
      value: work.duration,
    },
    {
      label: "ANO",
      value: work.year,
    },
    {
      label: "NÍVEL",
      value: work.level,
    },
  ].filter((item) => item.value);

  const hasMedia = Boolean(work.audio || work.scoreSample);

  return (
    <main className="work-page">
      <section className="work-hero">
        <div className="work-hero__top">
          <Link className="back-link" to={area?.slug ?? "/catalogo"}>
            ← {area?.title ?? "Catálogo"}
          </Link>

          {area?.tag && <span>{area.tag}</span>}
        </div>

        <div className="work-hero__layout">
          <div className="work-hero__side">
            <span>WORK</span>
          </div>

          <div className="work-hero__main">
            {work.composerName && (
              <p className="eyebrow">{work.composerName}</p>
            )}

            <h1>{work.title}</h1>

            {work.subtitle && (
              <p className="work-hero__subtitle">{work.subtitle}</p>
            )}
          </div>
        </div>
      </section>

      {metadata.length > 0 && (
        <section className="work-data">
          <div className="work-data__inner">
            {metadata.map((item) => (
              <div className="work-data__item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      {(work.description || hasMedia) && (
        <section
          className={`work-content ${
            !hasMedia ? "work-content--single" : ""
          }`}
        >
          {work.description && (
            <div className="work-content__main">
              <p className="eyebrow">SOBRE A OBRA</p>

              <h2>{work.title}</h2>

              <p className="work-description">{work.description}</p>
            </div>
          )}

          {hasMedia && (
            <aside className="work-media">
              {work.audio && (
                <div className="media-block">
                  <span className="media-block__label">OUVIR</span>

                  <p className="media-block__description">
                    Audio preview
                  </p>

                  <audio
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    src={work.audio}
                    onContextMenu={(event) => event.preventDefault()}
                  >
                    O teu navegador não suporta reprodução de áudio.
                  </audio>
                </div>
              )}

              {work.scoreSample && (
                <div className="media-block">
                  <span className="media-block__label">PARTITURA</span>

                  <p className="media-block__description">
                    Consulta a partitura geral diretamente no site.
                  </p>

                  <button
                    type="button"
                    className="score-link"
                    onClick={() => setScoreOpen(true)}
                  >
                    Ver partitura →
                  </button>
                </div>
              )}
            </aside>
          )}
        </section>
      )}

      {work.scoreSample && scoreOpen && (
        <section className="score-viewer">
          <div className="score-viewer__header">
            <div>
              <p className="eyebrow">SCORE PREVIEW</p>
              <h2>{work.title}</h2>
            </div>

            <button
              type="button"
              className="score-viewer__close"
              onClick={() => setScoreOpen(false)}
              aria-label="Fechar partitura"
            >
              Fechar ×
            </button>
          </div>

          <div
            className="score-viewer__frame"
            onContextMenu={(event) => event.preventDefault()}
          >
            <iframe
              src={`${work.scoreSample}#toolbar=0&navpanes=0&scrollbar=1`}
              title={`Partitura de ${work.title}`}
            />
          </div>

          <div className="score-viewer__footer">
            <p>
              Partitura disponibilizada exclusivamente para consulta.
            </p>

            <button
              type="button"
              className="button button--primary"
              onClick={() => setScoreOpen(false)}
            >
              Fechar partitura
            </button>
          </div>
        </section>
      )}

      <section className="work-contact">
        <div>
          <p className="eyebrow">PARTITURA</p>

          <h2>Interessado nesta obra?</h2>
        </div>

        <div>
          <p>
            Para informações sobre a partitura, disponibilidade ou
            instrumentação, entra diretamente em contacto.
          </p>

          <a
            className="button button--light"
            href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(
              `Informação sobre ${work.title}`,
            )}`}
          >
            Pedir informações
          </a>
        </div>
      </section>
    </main>
  );
}