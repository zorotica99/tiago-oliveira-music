import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header, ScrollManager } from "./components/SiteShell";
import { catalogueAreas, marchAreas } from "./data/catalogue";
import {
  CataloguePage,
  MarchCategoryPage,
  MarchesPage,
  StandardCategoryPage,
  WorkPage,
} from "./pages/CataloguePages";
import { HomePage } from "./pages/HomePage";
import {
  AboutPage,
  ContactPage,
  NotFoundPage,
} from "./pages/InfoPages";
import "./App.css";

function Website() {
  const normalAreas = catalogueAreas.filter(
    (area) => area.id !== "marchas",
  );

  return (
    <div className="site">
      <ScrollManager />

      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/catalogo" element={<CataloguePage />} />

        {normalAreas.map((area) => (
          <Route
            key={area.slug}
            path={area.slug}
            element={<StandardCategoryPage area={area} />}
          />
        ))}

        <Route path="/marchas" element={<MarchesPage />} />

        <Route
          path="/marchas/rua"
          element={<MarchCategoryPage area={marchAreas[0]} />}
        />

        <Route
          path="/marchas/procissao"
          element={<MarchCategoryPage area={marchAreas[1]} />}
        />

        <Route path="/obra/:slug" element={<WorkPage />} />

        <Route path="/sobre" element={<AboutPage />} />

        <Route path="/contacto" element={<ContactPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Website />
    </BrowserRouter>
  );
}

export default App;