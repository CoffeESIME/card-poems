// Development-only visual review. This entry point is not included in the production bundle.
import { createRoot } from "react-dom/client";
import { Composition } from "./Composition";
import { freshDesign, templates, satiricalExamples } from "./model";
import { variantTemplates } from "./variants";
import { fontCSS } from "./fonts";
const style = document.createElement("style");
style.textContent =
  fontCSS +
  "body{background:#efeee7;padding:25px;font-family:DM Sans}h1{font-family:Cormorant Garamond;font-weight:400}main{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}article{min-width:0}article>div{display:flex;gap:10px;align-items:flex-start}svg{width:62%;height:auto}svg+svg{width:35%}h2{font-size:14px;font-weight:400}";
document.head.appendChild(style);
const landscapesOnly = new URLSearchParams(location.search).has("landscapes");
const variantsOnly = new URLSearchParams(location.search).has("variants");
const satireOnly = new URLSearchParams(location.search).has("satire");
const darkOnly = new URLSearchParams(location.search).has("dark");
const proposalsOnly = new URLSearchParams(location.search).has("proposals");
const reviewedTemplates = proposalsOnly
  ? templates.filter((t) => t.edition === "proposed")
  : darkOnly
    ? templates.filter((t) => t.tradition === "dark")
    : satireOnly
      ? templates.filter((t) => t.tradition === "satire")
      : variantsOnly
        ? variantTemplates
        : landscapesOnly
          ? templates.filter((t) =>
              ["zen", "nature", "tao", "mountain"].includes(t.tradition),
            )
          : templates;
document.fonts.load('47px "Cormorant Garamond"').then(() =>
  createRoot(document.getElementById("root")!).render(
    <>
      <h1>
        Folio ·{" "}
        {proposalsOnly
          ? "Nuevas propuestas"
          : darkOnly
            ? "Visceral y apocalíptica"
            : satireOnly
              ? "Ironía y sátira"
              : variantsOnly
                ? "24 nuevas variantes"
                : landscapesOnly
                  ? "Nuevos horizontes"
                  : "Colección Orígenes"}
      </h1>
      <main>
        {reviewedTemplates.map((t) => (
          <article key={t.id}>
            <h2>{t.name}</h2>
            <div>
              <Composition
                design={{
                  ...freshDesign(t.id),
                  ...(satireOnly
                    ? satiricalExamples[t.id === "bureaucracy" ? 1 : 0]
                    : {}),
                }}
              />
              <Composition
                design={{
                  ...freshDesign(t.id),
                  ...(satireOnly
                    ? satiricalExamples[t.id === "bureaucracy" ? 1 : 0]
                    : {}),
                  format: "story",
                }}
              />
            </div>
          </article>
        ))}
      </main>
    </>,
  ),
);
