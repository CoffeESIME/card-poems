// Development-only visual review. This entry point is not included in the production bundle.
import { createRoot } from "react-dom/client";
import { Composition } from "./Composition";
import { freshDesign, templates } from "./model";
import { fontCSS } from "./fonts";
const style = document.createElement("style");
style.textContent =
  fontCSS +
  "body{background:#efeee7;padding:25px;font-family:DM Sans}h1{font-family:Cormorant Garamond;font-weight:400}main{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}article{min-width:0}article>div{display:flex;gap:10px;align-items:flex-start}svg{width:62%;height:auto}svg+svg{width:35%}h2{font-size:14px;font-weight:400}";
document.head.appendChild(style);
createRoot(document.getElementById("root")!).render(
  <>
    <h1>Folio · Colección Orígenes</h1>
    <main>
      {templates.map((t) => (
        <article key={t.id}>
          <h2>{t.name}</h2>
          <div>
            <Composition design={freshDesign(t.id)} />
            <Composition design={{ ...freshDesign(t.id), format: "story" }} />
          </div>
        </article>
      ))}
    </main>
  </>,
);
