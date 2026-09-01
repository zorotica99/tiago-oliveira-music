import { Link, NavLink } from "react-router-dom";
import {
  allCatalogueAreas,
  catalogueAreas,
  type CatalogueArea,
} from "../data/catalogue";
import type { Work } from "../data/works";

export function getAreaForWork(work: Work) {
  return allCatalogueAreas.find((area) => area.id === work.category);
}

export function CatalogueCard({ area }: { area: CatalogueArea }) {
  return (
    <Link className="catalogue-card" to={area.slug}>
      <div className="catalogue-card__number">{area.number}</div>

      <div className="catalogue-card__content">
        <span className="catalogue-card__tag">{area.tag}</span>

        <h3>{area.title}</h3>

        <p className="catalogue-card__subtitle">{area.subtitle}</p>

        <p className="catalogue-card__description">{area.description}</p>

        <span className="catalogue-card__button">
          Explorar
          <span>→</span>
        </span>
      </div>
    </Link>
  );
}

export function WorkListItem({ work }: { work: Work }) {
  const area = getAreaForWork(work);

  return (
    <Link className="work-row" to={`/obra/${work.slug}`}>
      <div className="work-row__title">
        {work.composerName && (
          <span className="work-row__composer">{work.composerName}</span>
        )}

        <h3>{work.title}</h3>

        {work.subtitle && <p>{work.subtitle}</p>}
      </div>

      <div className="work-row__formation">
        <span className="work-row__mobile-label">CATEGORIA</span>
        {area?.title}
      </div>

      <div className="work-row__formation">
        <span className="work-row__mobile-label">FORMAÇÃO</span>
        {work.instrumentation}
      </div>

      <div className="work-row__info">
        <span>{work.duration}</span>
        <span>→</span>
      </div>
    </Link>
  );
}

export function CategoryNavigation({
  current,
}: {
  current: CatalogueArea;
}) {
  return (
    <nav className="category-navigation">
      <div className="category-navigation__inner">
        {catalogueAreas.map((area) => (
          <NavLink
            key={area.slug}
            to={area.slug}
            className={area.slug === current.slug ? "active" : ""}
          >
            <span>{area.number}</span>
            {area.shortTitle}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}