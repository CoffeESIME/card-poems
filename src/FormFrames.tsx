import type { Design } from "./model";
import type { FormTemplateId } from "./formTemplates";

const addedForms = {
  observatory: {
    layout: "corners",
    motif:
      "M-48 28h96 M-39 28V7h78v21 M-44 7a44 42 0 0 1 88 0z M-11 5q0 -25 16 -40 M0 5q2 -25 15 -37 M-27 16h9m8 0h9m8 0h9",
  },
  sextant: {
    layout: "medallion",
    motif:
      "M-35 21L0 -33l40 48q-33 30 -75 6z M-24 17q27 13 51 -2 M0 -33l9 53 M-29 14l-5 7m18 -3 -2 8m34 -10 4 7 M-16 -18l37 -10 2 7 -36 10z",
  },
  telescope: {
    layout: "frieze",
    motif:
      "M-43 4l62 -29 6 13 -62 29z M18 -26l12 -5 8 17 -12 5z M-41 10l-12 6 3 6 12 -6 M0 2v12l-22 23m22 -23 23 23m-23 -23v24",
  },
  transitplot: {
    layout: "diagonal",
    motif:
      "M-57 -17h29q7 0 10 19t11 20h16q8 0 11 -20t12 -19h25 M-56 32h112 M-48 28v8m24 -8v8m24 -8v8m24 -8v8m24 -8v8",
  },
  helixform: {
    layout: "corners",
    motif:
      "M-58 -19C-35 -19 -34 20 -12 20S11 -20 33 -20Q48 -20 58 4 M-58 19C-35 19 -34 -20 -12 -20S11 20 33 20Q48 20 58 -4 M-52 -17v34m34 -34v34m10 -35v36m36 -37v38m10 -36v34",
  },
  horseshoemagnet: {
    layout: "medallion",
    motif:
      "M-30 -28v35a30 30 0 0 0 60 0v-35H16V7a16 16 0 0 1 -32 0v-35z M-30 -14h14m32 0h14 M-23 -29q23 -33 46 0 M-16 -22q16 -18 32 0",
  },
  cellslide: {
    layout: "frieze",
    motif:
      "M-47 1Q-51 -23 -24 -29T20 -23Q56 -17 43 11T-7 28Q-43 33 -47 1z M-14 -5a12 10 0 1 0 24 0a12 10 0 1 0 -24 0 M18 10q12 -9 17 -3q2 8 -16 8z M-37 5q8 -5 12 1t-9 5z",
  },
  waveform: {
    layout: "diagonal",
    motif:
      "M-18 -33v33a18 18 0 0 0 36 0v-33h-7V0a11 11 0 0 1 -22 0v-33z M-4 18v19h8V18 M-30 -24q-8 12 0 24m-9 -30q-11 19 0 35 M30 -24q8 12 0 24m9 -30q11 19 0 35",
  },
  moonform: {
    layout: "corners",
    motif:
      "M13 -32A34 34 0 1 0 22 27Q-18 23 -15 -6Q-13 -22 13 -32z M-27 1q-5 12 5 21",
  },
  solarflare: {
    layout: "medallion",
    motif:
      "M-24 0a24 24 0 1 0 48 0a24 24 0 1 0 -48 0 M-36 0h-9m90 0h-9 M0 -34v-9m0 86v-9 M-25 -25l-7 -7m64 64 -7 -7 M25 -25l7 -7m-64 64 7 -7 M-17 -16q-17 -25 5 -17q9 2 2 11",
  },
  spiralgalaxy: {
    layout: "frieze",
    motif:
      "M-56 6C-46 -31 21 -39 38 -16C50 3 15 24 -6 15C-26 6 -8 -9 4 -7 M56 -6C46 31 -21 39 -38 16C-50 -3 -15 -24 6 -15C26 -6 8 9 -4 7 M-4 0a4 3 0 1 0 8 0a4 3 0 1 0 -8 0",
  },
  asteroidform: {
    layout: "diagonal",
    motif:
      "M-44 -7l12 -17 29 -10 25 8 22 15 -5 22 -21 17 -31 -3 -23 -12z M-27 -7q7 -12 15 -4t-6 13q-12 0 -9 -9z M6 10q5 -10 14 -7t-2 12q-11 4 -12 -5z M4 -20l8 -2 5 5 -7 4z",
  },
  windshear: {
    layout: "corners",
    motif:
      "M-59 0h71q22 0 18 -18q-3 -12 -15 -7q-8 4 -3 10 M-45 10h79q17 0 17 13t-18 9 M-39 -10h31q15 0 12 -15t-16 -5",
  },
  stormbolt: {
    layout: "medallion",
    motif:
      "M8 -36l-36 42h23l-10 32 44 -50H7l12 -24z M-40 2l10 -14m56 24 11 -17",
  },
  aurorafold: {
    layout: "frieze",
    motif:
      "M-55 21Q-22 -34 0 -16T55 -29 M-55 31Q-22 -12 0 0T55 -15 M-40 3v13m9 -24v14m10 -22v17m10 -19v17m11 -15v16m11 -10v14m11 -14v13m11 -22v16m11 -25v15",
  },
  snowcrystal: {
    layout: "diagonal",
    motif:
      "M0 -34v68 M-30 -17l60 34 M-30 17l60 -34 M-8 -27l8 8 8 -8 M-8 27l8 -8 8 8 M-28 -8l12 -1 -5 -12 M28 8l-12 1 5 12 M-28 8l12 1 -5 12 M28 -8l-12 -1 5 -12",
  },
  volcaniccone: {
    layout: "corners",
    motif:
      "M-58 28q23 -8 43 -42l12 4 13 -4q18 26 48 42z M-16 -12l-7 22 15 -11 9 7 8 -17 M-4 -19q15 -7 4 -14q-10 -7 4 -13",
  },
  ammoniteshell: {
    layout: "medallion",
    motif:
      "M40 13C29 44 -25 41 -36 12C-51 -27 -1 -46 22 -21C47 5 14 30 -7 16C-26 3 -6 -15 6 -7Q17 2 4 5 M-33 17l12 -6m-16 -7 12 1m-8 -16 11 6m-1 -19 7 11m7 -15 1 12m11 -10 -4 11",
  },
  riverdelta: {
    layout: "frieze",
    motif:
      "M-6 -36q16 18 4 33t-7 35 M-1 -16q-2 16 -17 20t-26 24 M0 -4q13 7 17 19t25 16 M-22 6l-3 12 -9 14 M14 10l11 3 12 11 M-52 37q13 -4 26 0t26 0t26 0t26 0",
  },
  faultline: {
    layout: "diagonal",
    motif:
      "M-55 -21h42l18 45h-60z M-5 -30h60v43H12z M-55 -7h47m-47 15h53 M1 -15h54M7 0h48",
  },
  abacusbeads: {
    layout: "corners",
    motif:
      "M-50 -26h100v52H-50z M-50 -13h100 M-50 0h100 M-50 13h100 M-40 -19h9v12h-9z M-27 -19h9v12h-9z M22 -6h9V6h-9z M-40 7h9v12h-9z M-27 7h9v12h-9z M-14 7h9v12h-9z",
  },
  romandial: {
    layout: "medallion",
    motif:
      "M-36 15a39 39 0 0 1 72 0 M-21 -12l12 18m0 -18 -12 18 M0 -12V6m9 -18V6 M-3 22l-11 -6m11 6 20 -11 M-38 16h6m64 0h6",
  },
  binarytape: {
    layout: "frieze",
    motif:
      "M-55 -20h110v40H-55z M-28 -20v40M0 -20v40m28 -40v40 M-47 -6q5 -8 10 0v12q-5 8 -10 0z M-19 -4l5 -5V9 M8 -6q5 -8 10 0v12q-5 8 -10 0z M36 -4l5 -5V9",
  },
  triangularsum: {
    layout: "diagonal",
    motif:
      "M-3 -22a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M-11.5 -7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M5.5 -7a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M-20 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M-3 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M14 8a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M-28.5 23a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M-11.5 23a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M5.5 23a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M22.5 23a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  },
  musicalpause: {
    layout: "corners",
    motif:
      "M-44 12q44 -75 88 0 M-36 8q36 -55 72 0 M-6 6a6 6 0 1 0 12 0a6 6 0 1 0 -12 0",
  },
  directionrose: {
    layout: "medallion",
    motif:
      "M0 -38l7 25 14 -8 -8 14 27 7 -27 7 8 14 -14 -8 -7 25 -7 -25 -14 8 8 -14 -27 -7 27 -7 -8 -14 14 8z M0 -38V0l40 0 M0 38V0h-40",
  },
  bracesform: {
    layout: "frieze",
    motif:
      "M-14 -34q-16 0 -16 14v10q0 10 -14 10q14 0 14 10v10q0 14 16 14 M14 -34q16 0 16 14v10q0 10 14 10q-14 0 -14 10v10q0 14 -16 14",
  },
  repeatdots: {
    layout: "diagonal",
    motif:
      "M-45 -20h90m-90 10h90m-90 10h90m-90 10h90m-90 10h90 M20 -23v46m7 -46h5v46h-5z M6 -5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M6 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
  },
} as const;

type AddedForm = (typeof addedForms)[keyof typeof addedForms];

const motifs = {
  astrolabe:
    "M-38 0a38 38 0 1 0 76 0a38 38 0 1 0 -76 0 M-31 0a31 31 0 1 0 62 0a31 31 0 1 0 -62 0 M-32 18L32 -18 M0 -38v8 M0 30v8 M-38 0h8 M30 0h8",
  skyplot:
    "M-58 18L-28 -12 4 2 27 -26 54 -12 M-58 14v8m-4 -4h8 M-28 -16v8m-4 -4h8 M4 -2v8m-4 -4h8 M27 -30v8m-4 -4h8 M54 -16v8m-4 -4h8",
  flask:
    "M-13 -37h26v5h-3v22l26 42q2 5 -5 5h-62q-7 0 -5 -5l26 -42v-22h-3z M-22 15q12 -7 23 0t21 0 M4 5a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",
  prism:
    "M-30 28L0 -31l30 59z M-70 -7l52 10 34 -3 M16 0l55 -14 M16 0l55 1 M16 0l55 16",
  rings:
    "M-28 0a28 28 0 1 0 56 0a28 28 0 1 0 -56 0 M-28 1C-94 45 54 7 61 -17Q62 -26 25 -14",
  comettail:
    "M-43 16a13 13 0 1 0 26 0a13 13 0 1 0 -26 0 M-39 5Q-7 -16 55 -37 M-24 3Q9 -11 49 -18 M-17 17Q15 4 38 -2",
  raincloud:
    "M-38 8C-56 7 -53 -16 -35 -16C-30 -43 4 -39 11 -20C32 -32 54 -11 42 5Q39 10 29 10h-67z M-24 18l-6 10 M-2 18l-8 16 M22 18l-6 10",
  haloarc:
    "M-49 24a49 49 0 0 1 98 0 M-38 24a38 38 0 0 1 76 0 M-27 24a27 27 0 0 1 54 0",
  strata:
    "M-53 -23q25 16 53 1t53 1v45q-25 -16 -53 -1t-53 -1z M-53 -8q25 16 53 1t53 1 M-53 7q25 16 53 1t53 1",
  quartz:
    "M-18 25v-45l17 -23 19 24v44L0 37z M-1 -43v59l-17 9 M-1 16l19 9 M18 1l16 -19 10 9 -9 34 -17 6 M-18 1l-15 -17 -10 8 8 32 17 7",
  tallies:
    "M-48 -21v42 M-37 -21v42 M-26 -21v42 M-15 -21v42 M-55 17l47 -33 M12 -21v42 M23 -21v42 M34 -21v42 M45 -21v42 M6 17l46 -33",
  digits:
    "M-58 -14q0 -12 9 -12t9 12v28q0 12 -9 12t-9 -12z M-28 -17l9 -9v52m-8 0h16 M0 -16q2 -15 14 -9q13 7 0 21L0 24h24 M37 -23q23 -10 21 10q-1 10 -14 11q16 -1 16 13q0 20 -24 12",
  infinityloop: "M0 0C-71 -84 -71 84 0 0S71 84 0 0Z",
  pilcrowmark:
    "M26 -31h-34a18 18 0 0 0 0 36h6 M-2 -31v64 M11 -31v64 M-9 33h14 M6 33h14",
} satisfies Record<Exclude<FormTemplateId, keyof typeof addedForms>, string>;

function isForm(id: Design["template"]): id is keyof typeof motifs {
  return Object.hasOwn(motifs, id);
}

function isAddedForm(id: Design["template"]): id is keyof typeof addedForms {
  return Object.hasOwn(addedForms, id);
}

function illustratedFrame(form: AddedForm, d: Design, w: number, h: number) {
  const m = d.margin + 12;
  const right = w - m;
  const base = h - m;
  const scale = 0.78 + d.patternScale * 0.3;
  const gap = 8 + d.innerMargin * 0.3;
  const top = d.decoration !== "bottom";
  const bottom = d.decoration !== "top";
  const ticks = Math.max(2, Math.round(d.density * 9));
  const { detail, paper } = d.palette;

  function motif(x: number, y: number, size = 1) {
    return (
      <path
        d={form.motif}
        transform={`translate(${x} ${y}) scale(${scale * size})`}
      />
    );
  }

  function edge(y: number, lower: boolean) {
    const sign = lower ? -1 : 1;
    switch (form.layout) {
      case "corners":
        return (
          <>
            {motif(m + 88, y + sign * 59)}
            {motif(right - 88, y + sign * 59)}
            <path
              stroke={detail}
              d={`M${m + 167} ${y + sign * 59}H${right - 167}`}
            />
          </>
        );
      case "medallion":
        return (
          <g transform={`translate(${w / 2} ${y + sign * 78})`}>
            <ellipse rx={88 * scale} ry={52 * scale} fill={paper} />
            <ellipse
              rx={81 * scale}
              ry={46 * scale}
              stroke={detail}
              strokeDasharray="3 7"
            />
            {motif(0, 0)}
          </g>
        );
      case "frieze":
        return (
          <>
            {[0.24, 0.5, 0.76].map((fraction, index) => (
              <g key={fraction} stroke={index === 1 ? undefined : detail}>
                {motif(w * fraction, y + sign * 61, index === 1 ? 1.2 : 0.72)}
              </g>
            ))}
          </>
        );
      case "diagonal":
        return motif(lower ? right - 105 : m + 105, y + sign * 69, 1.22);
    }
  }

  let frame;
  switch (form.layout) {
    case "corners":
      frame = (
        <path
          d={`M${m + 44} ${m}H${right - 44}l44 44V${base - 44}l-44 44H${m + 44}l-44 -44V${m + 44}z`}
        />
      );
      break;
    case "medallion":
      frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} rx="60" />
          <rect
            x={m + gap}
            y={m + gap}
            width={w - 2 * (m + gap)}
            height={h - 2 * (m + gap)}
            rx="48"
            opacity=".55"
          />
        </>
      );
      break;
    case "frieze":
      frame = (
        <path
          d={`M${m} ${m + 115}V${m}H${right}v115 M${m} ${base - 115}v115H${right}v-115 M${m} ${m + 110}H${right} M${m} ${base - 110}H${right}`}
        />
      );
      break;
    case "diagonal":
      frame = (
        <path
          d={`M${m} ${base - 150}V${m}H${right - 145} M${right} ${m + 150}V${base}H${m + 145} M${m + gap} ${m + 118}V${m + gap}h180 M${right - gap} ${base - 118}V${base - gap}h-180`}
        />
      );
      break;
  }
  const pattern = Array.from({ length: ticks }, (_, i) => {
    const x = m + 32 + ((i + 0.5) * (right - m - 64)) / ticks;
    const y = m + 140 + ((i + 0.5) * (h / 2 - m - 140)) / ticks;
    const marks =
      form.layout === "frieze" || form.layout === "corners"
        ? [
            `M${x - 4} ${m + gap}l4 -4 4 4 -4 4z`,
            `M${w - x - 4} ${base - gap}l4 -4 4 4 -4 4z`,
          ]
        : [`M${m + gap} ${y}h10`, `M${right - gap} ${h - y}h-10`];
    return (
      <g key={i} stroke={detail}>
        {top && <path d={marks[0]} />}
        {bottom && <path d={marks[1]} />}
      </g>
    );
  });
  return {
    frame,
    pattern,
    ornaments: (
      <>
        {top && edge(m, false)}
        {bottom && edge(base, true)}
      </>
    ),
  };
}

export function formFrames(d: Design, w: number, h: number) {
  if (isAddedForm(d.template))
    return illustratedFrame(addedForms[d.template], d, w, h);
  if (!isForm(d.template)) return null;
  const motif = motifs[d.template];
  const m = d.margin + 12;
  const top = d.decoration !== "bottom";
  const bottom = d.decoration !== "top";
  const scale = 0.8 + d.patternScale * 0.28;
  const count = Math.max(2, Math.round(6 * d.density));
  const inner = m + d.innerMargin;
  const frame = (
    <>
      <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
      <path
        opacity=".55"
        d={`M${inner} ${inner + 48}v-48h64 M${w - inner - 64} ${inner}h64v48 M${inner} ${h - inner - 48}v48h64 M${w - inner - 64} ${h - inner}h64v-48`}
      />
    </>
  );
  const pattern = Array.from({ length: count }, (_, i) => {
    const y = m + 100 + (i * (h / 2 - m - 112)) / count;
    return (
      <g key={i} stroke={d.palette.detail}>
        {top && (
          <path
            d={motif}
            transform={`translate(${m + 21} ${y}) scale(${scale * 0.19})`}
          />
        )}
        {bottom && (
          <path
            d={motif}
            transform={`translate(${w - m - 21} ${h - y}) scale(${scale * 0.19})`}
          />
        )}
      </g>
    );
  });
  const ornament = (
    <>
      <path d={motif} />
      <path
        stroke={d.palette.detail}
        d="M-146 0h61m170 0h61 M-95 -4l6 4 -6 4 M95 -4l-6 4 6 4"
      />
    </>
  );
  const ornaments = (
    <>
      {top && (
        <g transform={`translate(${w / 2} ${m + 65}) scale(${scale})`}>
          {ornament}
        </g>
      )}
      {bottom && (
        <g transform={`translate(${w / 2} ${h - m - 65}) scale(${scale})`}>
          {ornament}
        </g>
      )}
    </>
  );
  return { frame, pattern, ornaments };
}
