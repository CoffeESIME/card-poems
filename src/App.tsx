import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Expand,
  Eye,
  Feather,
  FolderOpen,
  Grid2X2,
  Italic,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  Save,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { Composition } from "./Composition";
import {
  changeTemplate,
  dimensions,
  examples,
  freshDesign,
  palettes,
  templates,
  traditions,
  type Design,
  type Tradition,
} from "./model";
import { compositionBlob, download } from "./export";
import {
  hydrateDesign,
  keys,
  readLocal,
  writeLocal,
  type Preset,
} from "./storage";

function Mark({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={small ? 22 : 35}
      height={small ? 22 : 35}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.15">
        {[0, 45, 90, 135].map((a) => (
          <rect
            key={a}
            x="9"
            y="9"
            width="22"
            height="22"
            transform={`rotate(${a} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="5" />
      </g>
    </svg>
  );
}
function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="range-label">
      <span>
        {label}
        <output>
          {Number(value.toFixed(2))}
          {unit}
        </output>
      </span>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={
          {
            "--progress": `${((value - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
      />
    </label>
  );
}
function SectionLabel({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{children}</span>
      {aside}
    </div>
  );
}
export default function App() {
  const [design, setDesign] = useState<Design>(() =>
    hydrateDesign(readLocal(keys.draft, null)),
  );
  const [tradition, setTradition] = useState<Tradition>(
    () => templates.find((t) => t.id === design.template)!.tradition,
  );
  const [panel, setPanel] = useState<"text" | "ornament">("text");
  const [guides, setGuides] = useState(false),
    [zoom, setZoom] = useState(100),
    [focus, setFocus] = useState(false);
  const [collection, setCollection] = useState(false),
    [exportOpen, setExportOpen] = useState(false);
  const [saved, setSaved] = useState<Design[]>(() =>
    readLocal(keys.designs, []),
  );
  const [presets, setPresets] = useState<Preset[]>(() =>
    readLocal(keys.presets, []),
  );
  const [busy, setBusy] = useState(false),
    [toast, setToast] = useState(""),
    [storageOk, setStorageOk] = useState(true);
  const [fontTick, setFontTick] = useState(0);
  const [textOverflow, setTextOverflow] = useState(false);
  const poemRef = useRef<HTMLTextAreaElement>(null),
    exportRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const template = templates.find((t) => t.id === design.template)!;
  const [width, height] = dimensions[design.format];
  const update = (patch: Partial<Design>) =>
    setDesign((d) => ({ ...d, ...patch }));
  const notify = (message: string) => setToast(message);
  useEffect(() => {
    const timer = setTimeout(
      () => setStorageOk(writeLocal(keys.draft, design)),
      400,
    );
    return () => clearTimeout(timer);
  }, [design]);
  useEffect(() => {
    setTextOverflow(
      exportRef.current?.querySelector("svg")?.getAttribute("data-overflow") ===
        "true",
    );
  }, [design, fontTick]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const handler = () => setFontTick((t) => t + 1);
    document.fonts.ready.then(handler);
    document.fonts.addEventListener("loadingdone", handler);
    return () => document.fonts.removeEventListener("loadingdone", handler);
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFocus(false);
        setCollection(false);
        setExportOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    if (!collection) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled),input,select,textarea,[tabindex="0"]',
      );
      if (!controls?.length) return;
      const first = controls[0],
        last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      previous?.focus();
    };
  }, [collection]);
  function saveDesign(copy = false) {
    const nextDesign = copy
      ? { ...design, id: crypto.randomUUID(), name: `${design.name} · copia` }
      : design;
    const next = [nextDesign, ...saved.filter((d) => d.id !== nextDesign.id)];
    if (writeLocal(keys.designs, next)) {
      setSaved(next);
      if (copy) setDesign(nextDesign);
      notify(
        copy
          ? "Copia creada en tu biblioteca."
          : "Composición guardada en tu biblioteca.",
      );
    } else
      notify(
        "No hay espacio para guardar. Exporta tu composición para conservarla.",
      );
  }
  async function exportDesign(format: "png" | "svg" | "jpeg") {
    if (textOverflow) {
      notify(
        "El poema supera el área de lectura. Acórtalo o cambia al formato vertical.",
      );
      return;
    }
    setBusy(true);
    try {
      const svg = exportRef.current?.querySelector("svg");
      if (!svg) throw new Error("No se encontró el lienzo.");
      const blob = await compositionBlob(svg, design, format);
      download(
        blob,
        `${
          design.name
            .trim()
            .replace(/[^\p{L}\p{N}-]+/gu, "-")
            .slice(0, 70) || "folio"
        }-${width}x${height}.${format === "jpeg" ? "jpg" : format}`,
      );
      setExportOpen(false);
      notify(`Tu composición en ${format.toUpperCase()} está lista.`);
    } catch (e) {
      notify(
        e instanceof Error
          ? e.message
          : "No se pudo exportar. Inténtalo de nuevo.",
      );
    } finally {
      setBusy(false);
    }
  }
  function savePreset() {
    const next = [
      ...presets,
      {
        id: crypto.randomUUID(),
        name: `${template.name} · ${design.palette.name}`,
        template: design.template,
        palette: { ...design.palette },
      },
    ];
    if (writeLocal(keys.presets, next)) {
      setPresets(next);
      notify("Marco y paleta guardados como preset.");
    } else notify("No se pudo guardar el preset.");
  }
  const canvas = (
    <Composition
      design={design}
      guides={guides}
      onSelectText={() => {
        setPanel("text");
        poemRef.current?.focus();
      }}
      key={`canvas-${fontTick}`}
    />
  );
  return (
    <div className={`app ${focus ? "focus-mode" : ""}`}>
      <header className="app-header">
        <a
          className="brand"
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="Folio, taller de poesía visual"
        >
          <Mark />
          <span>
            folio<span className="brand-dot">.</span>
          </span>
          <span className="brand-caption">TALLER DE POESÍA VISUAL</span>
        </a>
        <div className="header-actions">
          <span className={`draft-status ${!storageOk ? "error" : ""}`}>
            <span />
            {storageOk ? "Borrador local" : "Sin guardado automático"}
          </span>
          <button className="button quiet" onClick={() => setCollection(true)}>
            <FolderOpen size={16} />
            <span>Mis composiciones</span>
            <span className="count">{saved.length}</span>
          </button>
          <div className="export-wrap">
            <button
              className="button primary"
              onClick={() => setExportOpen((v) => !v)}
              aria-expanded={exportOpen}
            >
              <ArrowDownToLine size={16} />
              Exportar
              <ChevronDown size={14} />
            </button>
            {exportOpen && (
              <div className="export-popover">
                <SectionLabel>GUARDAR UNA IMAGEN</SectionLabel>
                <p>
                  {width} × {height} px · sin marcas de agua
                </p>
                {(["png", "svg", "jpeg"] as const).map((format) => (
                  <button
                    key={format}
                    disabled={busy}
                    onClick={() => exportDesign(format)}
                  >
                    <span>
                      {format.toUpperCase()}
                      <small>
                        {format === "png"
                          ? "Alta calidad · recomendado"
                          : format === "svg"
                            ? "Vectorial · fuentes incluidas"
                            : "Imagen ligera"}
                      </small>
                    </span>
                    <ArrowDownToLine size={16} />
                  </button>
                ))}
                {busy && <p role="status">Preparando tu composición…</p>}
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="workspace-heading">
        <div>
          <span className="eyebrow">EL ARTE DE DAR FORMA A LAS PALABRAS</span>
          <h1>
            Un pequeño universo, <em>tus versos.</em>
          </h1>
        </div>
        <span className="heading-note">
          <Feather size={18} />
          <span>
            Hecho con calma.
            <br />
            Creado por ti.
          </span>
        </span>
      </div>
      <main className="workspace">
        <aside className="library panel">
          <div className="panel-heading">
            <h2>La colección</h2>
            <span>01 — 09</span>
          </div>
          <SectionLabel>TRADICIÓN ARTÍSTICA</SectionLabel>
          <div
            className="traditions"
            role="tablist"
            aria-label="Tradición artística"
          >
            {traditions.map((t) => (
              <button
                role="tab"
                aria-selected={tradition === t.id}
                key={t.id}
                className={tradition === t.id ? "active" : ""}
                onClick={() => setTradition(t.id)}
              >
                <span>{t.mark}</span>
                {t.label}
              </button>
            ))}
          </div>
          <div className="collection-caption">
            <span>{traditions.find((t) => t.id === tradition)!.region}</span>
            <span>3 marcos</span>
          </div>
          <div className="template-list">
            {templates
              .filter((t) => t.tradition === tradition)
              .map((t, i) => (
                <button
                  className={`template-card ${design.template === t.id ? "selected" : ""}`}
                  key={t.id}
                  onClick={() => setDesign((d) => changeTemplate(d, t))}
                  aria-pressed={design.template === t.id}
                >
                  <div className="template-art">
                    <Composition
                      design={{ ...freshDesign(t.id), format: "square" }}
                      thumbnail
                    />
                    {design.template === t.id && (
                      <span className="selected-mark">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="template-number">
                      0
                      {traditions.findIndex((f) => f.id === tradition) * 3 +
                        i +
                        1}
                    </span>
                    <h3>{t.name}</h3>
                    <p>{t.subtitle}</p>
                  </div>
                </button>
              ))}
          </div>
          <div className="palette-section">
            <SectionLabel>
              PALETAS DE COLOR{" "}
              <span className="subtle">/ {palettes.length}</span>
            </SectionLabel>
            <div className="palette-list">
              {palettes.map((p) => (
                <button
                  key={p.name}
                  title={p.name}
                  aria-label={`Paleta ${p.name}`}
                  aria-pressed={design.palette.name === p.name}
                  className={`palette-chip ${design.palette.name === p.name ? "active" : ""}`}
                  onClick={() => update({ palette: { ...p } })}
                >
                  <span style={{ background: p.paper }} />
                  <span style={{ background: p.ornament }} />
                  <span style={{ background: p.detail }} />
                </button>
              ))}
            </div>
            <p className="palette-name">
              {design.palette.name}
              <span>↗</span>
            </p>
          </div>
          {presets.length > 0 && (
            <div className="presets">
              <SectionLabel>TUS PRESETS</SectionLabel>
              {presets.map((p) => (
                <div key={p.id}>
                  <button
                    onClick={() => {
                      update({ template: p.template, palette: p.palette });
                      setTradition(
                        templates.find((t) => t.id === p.template)!.tradition,
                      );
                    }}
                  >
                    {p.name}
                  </button>
                  <button
                    aria-label={`Eliminar preset ${p.name}`}
                    onClick={() => {
                      const next = presets.filter((n) => n.id !== p.id);
                      if (writeLocal(keys.presets, next)) setPresets(next);
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="library-note">
            <Sparkles size={16} />
            <p>
              Pequeñas páginas.
              <br />
              Infinitas maneras de sentir.
            </p>
          </div>
        </aside>
        <section className="studio" aria-label="Lienzo de composición">
          <div className="studio-toolbar">
            <div className="format-select">
              <select
                aria-label="Formato del lienzo"
                value={design.format}
                onChange={(e) =>
                  update({ format: e.target.value as Design["format"] })
                }
              >
                <option value="square">Cuadrado · 1:1</option>
                <option value="story">Historia · 9:16</option>
                <option value="portrait">Retrato · 4:5</option>
              </select>
              <ChevronDown size={13} />
            </div>
            <div className="canvas-tools">
              <button
                title="Mostrar guías de márgenes y zona segura"
                aria-label="Guías de márgenes"
                aria-pressed={guides}
                className={guides ? "active" : ""}
                onClick={() => setGuides((v) => !v)}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                title="Vista sin paneles"
                aria-label="Ampliar vista"
                onClick={() => setFocus(true)}
              >
                <Expand size={16} />
              </button>
            </div>
          </div>
          <div className={`canvas-stage format-${design.format}`}>
            <div
              className="canvas-paper"
              style={
                {
                  aspectRatio: `${width}/${height}`,
                  "--zoom": zoom / 100,
                } as React.CSSProperties
              }
            >
              {canvas}
            </div>
          </div>
          <div className="canvas-status">
            <span>
              <span className="status-dot" />
              {width} × {height} px<span className="status-divider">/</span>SVG
              vectorial
            </span>
            <div className="zoom-controls">
              <button
                aria-label="Alejar lienzo"
                disabled={zoom <= 50}
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
              >
                <Minus size={13} />
              </button>
              <button onClick={() => setZoom(100)} title="Restablecer zoom">
                {zoom}%
              </button>
              <button
                aria-label="Acercar lienzo"
                disabled={zoom >= 150}
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          <div className="template-story">
            <span className="story-mark">
              <Mark small />
            </span>
            <div>
              <span className="eyebrow">
                {traditions.find((t) => t.id === template.tradition)!.label} ·
                MARCO {String(templates.indexOf(template) + 1).padStart(2, "0")}
              </span>
              <h2>{template.name}</h2>
              <p>{template.description}</p>
            </div>
            <span className="story-edition">
              COLECCIÓN
              <br />
              <b>ORÍGENES</b>
            </span>
          </div>
          <p className="canvas-hint">
            <span>✧</span> Cada palabra encuentra su lugar.
          </p>
        </section>
        <aside className="inspector panel">
          <div
            className="inspector-tabs"
            role="tablist"
            aria-label="Ajustes de composición"
          >
            <button
              role="tab"
              aria-selected={panel === "text"}
              className={panel === "text" ? "active" : ""}
              onClick={() => setPanel("text")}
            >
              <Type size={15} />
              Tu poema
            </button>
            <button
              role="tab"
              aria-selected={panel === "ornament"}
              className={panel === "ornament" ? "active" : ""}
              onClick={() => setPanel("ornament")}
            >
              <SlidersHorizontal size={15} />
              Ornamento
            </button>
          </div>
          {panel === "text" ? (
            <div className="inspector-content" role="tabpanel">
              <SectionLabel>
                PALABRAS QUE PERMANECEN <Feather size={13} />
              </SectionLabel>
              <label className="field-label" htmlFor="poem-title">
                Título <span>opcional</span>
              </label>
              <input
                id="poem-title"
                placeholder="Dale un nombre a tu poema"
                value={design.title}
                maxLength={150}
                onChange={(e) => update({ title: e.target.value })}
              />
              <label className="field-label" htmlFor="poem">
                Poema
              </label>
              <div className="poem-field">
                <textarea
                  ref={poemRef}
                  id="poem"
                  dir="auto"
                  value={design.poem}
                  maxLength={6000}
                  onChange={(e) => update({ poem: e.target.value })}
                  placeholder="Aquí empiezan tus versos…"
                />
                <span>{design.poem.length} caracteres</span>
              </div>
              <label className="field-label" htmlFor="author">
                Autoría
              </label>
              <input
                id="author"
                dir="auto"
                value={design.author}
                maxLength={150}
                onChange={(e) => update({ author: e.target.value })}
                placeholder="Tu nombre o seudónimo"
              />
              <details className="examples">
                <summary>
                  ¿Una página en blanco?
                  <span>
                    Prueba un poema <ArrowUpRight size={12} />
                  </span>
                </summary>
                <div>
                  {examples.map((e, i) => (
                    <button
                      key={e.label}
                      onClick={() => {
                        update({
                          poem: e.poem,
                          author: e.author,
                          font:
                            i === 3 ? "japanese" : i === 4 ? "arabic" : "serif",
                          direction: "auto",
                        });
                      }}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </details>
              <div className="control-section">
                <SectionLabel>TIPOGRAFÍA</SectionLabel>
                <select
                  aria-label="Tipografía del poema"
                  value={design.font}
                  onChange={(e) =>
                    update({ font: e.target.value as Design["font"] })
                  }
                >
                  <option value="serif">Cormorant Garamond</option>
                  <option value="japanese">Noto Serif JP · 日本語</option>
                  <option value="arabic">Noto Naskh Arabic · فارسی</option>
                </select>
                <div className="type-controls">
                  <div className="font-size">
                    <button
                      aria-label="Reducir tamaño de letra"
                      disabled={design.fontSize <= 18}
                      onClick={() => update({ fontSize: design.fontSize - 1 })}
                    >
                      <Minus size={13} />
                    </button>
                    <label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        aria-label="Tamaño de letra"
                        value={design.fontSize}
                        onChange={(e) =>
                          update({
                            fontSize: Math.min(
                              100,
                              Math.max(18, +e.target.value || 18),
                            ),
                          })
                        }
                      />
                      <span>px</span>
                    </label>
                    <button
                      aria-label="Aumentar tamaño de letra"
                      disabled={design.fontSize >= 100}
                      onClick={() => update({ fontSize: design.fontSize + 1 })}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <div className="segmented styles">
                    <button
                      aria-label="Negrita"
                      aria-pressed={design.bold}
                      className={design.bold ? "active" : ""}
                      onClick={() => update({ bold: !design.bold })}
                    >
                      <b>B</b>
                    </button>
                    <button
                      aria-label="Cursiva"
                      aria-pressed={design.italic}
                      className={design.italic ? "active" : ""}
                      onClick={() => update({ italic: !design.italic })}
                    >
                      <Italic size={15} />
                    </button>
                  </div>
                </div>
                <Range
                  label="Interlineado"
                  value={design.lineHeight}
                  min={1}
                  max={2.5}
                  step={0.05}
                  onChange={(lineHeight) => update({ lineHeight })}
                />
                <Range
                  label="Espacio entre letras"
                  value={design.letterSpacing}
                  min={0}
                  max={8}
                  step={0.2}
                  onChange={(letterSpacing) => update({ letterSpacing })}
                />
                <SectionLabel>ALINEACIÓN</SectionLabel>
                <div className="segmented alignment">
                  {(
                    [
                      ["left", AlignLeft, "Izquierda"],
                      ["center", AlignCenter, "Centro"],
                      ["right", AlignRight, "Derecha"],
                    ] as const
                  ).map(([value, Icon, label]) => (
                    <button
                      key={value}
                      aria-label={`Alineación ${label}`}
                      aria-pressed={design.align === value}
                      className={design.align === value ? "active" : ""}
                      onClick={() => update({ align: value })}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
                <Range
                  label="Posición vertical"
                  value={design.position}
                  min={15}
                  max={85}
                  unit="%"
                  onChange={(position) => update({ position })}
                />
                <details className="advanced">
                  <summary>
                    Más ajustes de texto <ChevronDown size={13} />
                  </summary>
                  <label className="field-label" htmlFor="direction">
                    Dirección de lectura
                  </label>
                  <select
                    id="direction"
                    value={design.direction}
                    onChange={(e) =>
                      update({
                        direction: e.target.value as Design["direction"],
                      })
                    }
                  >
                    <option value="auto">Automática</option>
                    <option value="ltr">De izquierda a derecha</option>
                    <option value="rtl">De derecha a izquierda</option>
                  </select>
                  <label className="field-label" htmlFor="authorPosition">
                    Posición del autor
                  </label>
                  <select
                    id="authorPosition"
                    value={design.authorPosition}
                    onChange={(e) =>
                      update({
                        authorPosition: e.target
                          .value as Design["authorPosition"],
                      })
                    }
                  >
                    <option value="below">Debajo del poema</option>
                    <option value="bottom">Al pie de la página</option>
                    <option value="hidden">Ocultar autoría</option>
                  </select>
                </details>
                <p
                  className={`reading-note ${textOverflow ? "overflow-warning" : ""}`}
                  role={textOverflow ? "alert" : undefined}
                >
                  {textOverflow
                    ? "Este poema supera el área de lectura. Acórtalo o elige un formato vertical antes de exportar."
                    : "El texto se ajusta al espacio disponible para conservar la lectura."}
                </p>
              </div>
            </div>
          ) : (
            <div className="inspector-content" role="tabpanel">
              <SectionLabel>
                EL DETALLE HACE LA PÁGINA <Sparkles size={13} />
              </SectionLabel>
              <p className="settings-intro">
                Ajusta el ritmo, el color y la presencia de tu marco.
              </p>
              <div className="color-fields">
                {(
                  [
                    ["paper", "Fondo"],
                    ["ornament", "Marco"],
                    ["detail", "Detalles"],
                    ["ink", "Texto"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key}>
                    <input
                      type="color"
                      aria-label={`Color ${label}`}
                      value={design.palette[key]}
                      onChange={(e) =>
                        update({
                          palette: {
                            ...design.palette,
                            name: "Paleta personal",
                            [key]: e.target.value,
                          },
                        })
                      }
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <Range
                label="Grosor del marco"
                value={design.thickness}
                min={0.4}
                max={3}
                step={0.1}
                unit="×"
                onChange={(thickness) => update({ thickness })}
              />
              <Range
                label="Margen exterior"
                value={design.margin}
                min={16}
                max={90}
                unit=" px"
                onChange={(margin) => update({ margin })}
              />
              <Range
                label="Margen de lectura"
                value={design.innerMargin}
                min={0}
                max={100}
                unit=" px"
                onChange={(innerMargin) => update({ innerMargin })}
              />
              <Range
                label="Escala del patrón"
                value={design.patternScale}
                min={0.5}
                max={2}
                step={0.1}
                unit="×"
                onChange={(patternScale) => update({ patternScale })}
              />
              <Range
                label="Opacidad ornamental"
                value={design.opacity}
                min={0}
                max={1}
                step={0.05}
                onChange={(opacity) => update({ opacity })}
              />
              <Range
                label="Densidad de los bordes"
                value={design.density}
                min={0.5}
                max={2}
                step={0.25}
                unit="×"
                onChange={(density) => update({ density })}
              />
              <label className="field-label" htmlFor="decoration">
                Distribución de los motivos
              </label>
              <select
                id="decoration"
                value={design.decoration}
                onChange={(e) =>
                  update({ decoration: e.target.value as Design["decoration"] })
                }
              >
                <option value="all">Composición completa</option>
                <option value="top">Acento superior</option>
                <option value="bottom">Acento inferior</option>
              </select>
              <div className="control-section">
                <SectionLabel>
                  CAPAS INDEPENDIENTES <Layers size={14} />
                </SectionLabel>
                {(
                  [
                    ["texture", "Textura del papel"],
                    ["pattern", "Patrón de fondo"],
                    ["frame", "Marco exterior"],
                    ["ornaments", "Motivos ornamentales"],
                  ] as const
                ).map(([key, label]) => (
                  <label className="toggle-row" key={key}>
                    {label}
                    <input
                      type="checkbox"
                      checked={design.layers[key]}
                      onChange={(e) =>
                        update({
                          layers: { ...design.layers, [key]: e.target.checked },
                        })
                      }
                    />
                    <span className="toggle" />
                  </label>
                ))}
              </div>
              <button className="button outline full" onClick={savePreset}>
                <Plus size={14} />
                Guardar marco y paleta
              </button>
              <button
                className="button quiet full reset-button"
                onClick={() => {
                  setDesign((d) => changeTemplate(d, template));
                  notify("Marco restablecido. Tus versos siguen aquí.");
                }}
              >
                <RotateCcw size={13} />
                Restablecer este marco
              </button>
            </div>
          )}
          <div className="save-area">
            <button
              className="button outline full"
              onClick={() => saveDesign()}
            >
              <BookOpen size={15} />
              Guardar composición
            </button>
          </div>
        </aside>
      </main>
      <footer className="app-footer">
        <span>
          FOLIO <span className="footer-star">✧</span> PALABRAS CON UN LUGAR EN
          EL MUNDO
        </span>
        <span>Sin prisa. Sin ruido. Solo poesía.</span>
        <span>
          Todo se guarda en este navegador <span className="local-dot" />
        </span>
      </footer>
      {focus && (
        <div className="focus-layer">
          <button
            className="button outline focus-close"
            onClick={() => setFocus(false)}
          >
            <ArrowLeft size={15} />
            Volver al taller <span>Esc</span>
          </button>
          <div
            className="focus-paper"
            style={{ aspectRatio: `${width}/${height}` }}
          >
            {canvas}
          </div>
          <span className="focus-caption">
            {template.name} · {width} × {height} px
          </span>
        </div>
      )}
      {collection && (
        <div className="drawer-backdrop" onClick={() => setCollection(false)}>
          <section
            ref={dialogRef}
            className="collection-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="collection-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <span className="eyebrow">TU BIBLIOTECA PERSONAL</span>
                <h2 id="collection-title">Páginas que se quedan.</h2>
              </div>
              <button
                className="icon-button"
                aria-label="Cerrar biblioteca"
                onClick={() => setCollection(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p>Composiciones guardadas en este navegador.</p>
            <label className="field-label" htmlFor="composition-name">
              Nombre de la composición actual
            </label>
            <input
              id="composition-name"
              value={design.name}
              maxLength={100}
              onChange={(e) => update({ name: e.target.value })}
            />
            <div className="drawer-actions">
              <button className="button primary" onClick={() => saveDesign()}>
                <Save size={15} />
                Guardar actual
              </button>
              <button
                className="button outline"
                onClick={() => saveDesign(true)}
              >
                <Copy size={15} />
                Duplicar
              </button>
              <button
                className="button quiet"
                onClick={() => {
                  setDesign(freshDesign());
                  setTradition("persian");
                  setCollection(false);
                }}
              >
                <Plus size={15} />
                Nueva página
              </button>
            </div>
            {saved.length ? (
              <div className="saved-grid">
                {saved.map((d) => (
                  <article className="saved-card" key={d.id}>
                    <button
                      className="saved-preview"
                      aria-label={`Abrir ${d.name}`}
                      onClick={() => {
                        setDesign(hydrateDesign(d));
                        setTradition(
                          templates.find((t) => t.id === d.template)!.tradition,
                        );
                        setCollection(false);
                      }}
                    >
                      <Composition design={d} />
                    </button>
                    <div>
                      <h3>{d.name || "Sin título"}</h3>
                      <span>
                        {templates.find((t) => t.id === d.template)!.name}
                      </span>
                    </div>
                    <button
                      className="delete-design icon-button"
                      aria-label={`Eliminar ${d.name}`}
                      onClick={() => {
                        const next = saved.filter((s) => s.id !== d.id);
                        if (writeLocal(keys.designs, next)) {
                          setSaved(next);
                          notify("Composición eliminada de la biblioteca.");
                        }
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-library">
                <BookOpen size={32} />
                <h3>Tu primera página está por llegar.</h3>
                <p>Guarda una composición y vuelve a ella cuando quieras.</p>
              </div>
            )}
          </section>
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <Check size={15} />
          {toast}
          <button aria-label="Cerrar aviso" onClick={() => setToast("")}>
            <X size={14} />
          </button>
        </div>
      )}
      <div className="export-target" ref={exportRef} aria-hidden="true">
        <Composition design={design} key={`export-${fontTick}`} />
      </div>
      <div className="mobile-tip">
        <Eye size={14} />
        El lienzo siempre refleja tus cambios.
      </div>
    </div>
  );
}
