import type { Design } from "./model";
import type { FormTemplateId } from "./formTemplates";

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
} satisfies Record<FormTemplateId, string>;

function isForm(id: Design["template"]): id is FormTemplateId {
  return Object.hasOwn(motifs, id);
}

export function formFrames(d: Design, w: number, h: number) {
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
