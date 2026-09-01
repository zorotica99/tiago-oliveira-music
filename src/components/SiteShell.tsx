import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { catalogueAreas } from "../data/catalogue";
import { siteInfo } from "../data/site";

export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const catalogueActive =
    location.pathname === "/catalogo" ||
    catalogueAreas.some((area) => area.slug === location.pathname) ||
    location.pathname.startsWith("/marchas/") ||
    location.pathname.startsWith("/obra/");

  return (
    <header className="header">
      <Link className="logo" to="/">
        {siteInfo.nameUppercase}
        <span>{siteInfo.roles}</span>
      </Link>

      <button
        type="button"
        className={`mobile-menu-button ${menuOpen ? "open" : ""}`}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav className={`nav ${menuOpen ? "nav--open" : ""}`}>
        <NavLink
          to="/catalogo"
          className={catalogueActive ? "active" : undefined}
        >
          Catálogo
        </NavLink>

        <NavLink to="/sobre">Sobre</NavLink>

        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__identity">
        <strong>{siteInfo.nameUppercase}</strong>
        <span>{siteInfo.roles}</span>
      </div>

      <p>© 2026</p>

      <div className="footer__links">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/contacto">Contacto</Link>

        <a href={siteInfo.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  );
}