import type { ReactNode } from "react";
import type { Design } from "./model";
import { variantTemplates } from "./variants";

// Motifs use a local 300 × 140 strip, keeping the text area clear.
function motifs(id: Design["template"]): [ReactNode, ReactNode] {
  switch (id) {
    case "moonwindow":
      return [
        <>
          <path d="M-95 55 V0 Q-95 -35 0 -65 Q95 -35 95 0 V55 M-80 55 V0 Q-80 -23 0 -50 Q80 -23 80 0 V55 M0 -50 V55" />
          <circle
            cx="38"
            cy="-5"
            r="19"
            fill="currentColor"
            fillOpacity=".16"
          />
        </>,
        <>
          <path d="M-120 30 H120 M-90 22 H90 M-65 14 H65" />
          <path d="M-30 -8 Q0 -30 30 -8" opacity=".5" />
        </>,
      ];
    case "ruins":
      return [
        <>
          <path d="M-95 45 V-30 h35 v75 M60 45 V-40 h35 v85 M-102 -30 h49 v-12 h-49Z M53 -40 h49 v-12 h-49Z M-87 -25 V40 M-69 -25 V40 M68 -35 V40 M86 -35 V40 M-110 50 h65 M45 50 h65" />
          <path d="M-70 -44 L-50 -56 -16 -49 M16 -53 L45 -56 70 -54" />
        </>,
        <>
          <path d="M-120 35 Q-60 20 0 -30 Q45 -65 100 -35" />
          {[-70, -35, 0, 35, 70].map((x, i) => (
            <path
              key={x}
              transform={`translate(${x} ${20 - i * 14}) rotate(-20)`}
              d="M0 0 Q-20 -40 10 -25 Q30 -30 0 0 M8 -4 Q38 14 42 -10 Q28 -25 8 -4"
              fill="currentColor"
              fillOpacity=".14"
            />
          ))}
        </>,
      ];
    case "well":
      return [
        <>
          <path d="M0 -58 V-20 M-10 -39 H10" />
          <circle cy="-2" r="5" fill="currentColor" />
          <path d="M-80 50 L-35 10 M80 50 L35 10" />
        </>,
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cy={-25 + i * 14}
              rx={110 - i * 16}
              ry={22 - i * 2}
              opacity={0.9 - i * 0.14}
            />
          ))}
          <path d="M0 -48 V-32" />
        </>,
      ];
    case "veil":
      return [
        <>
          <path d="M-135 -45 Q-110 15 -55 50 M-110 -45 Q-75 5 -38 30 M135 -45 Q110 15 55 50 M110 -45 Q75 5 38 30 M-135 -45 Q0 -8 135 -45" />
          <path
            d="M0 -10 L6 5 22 10 6 15 0 30 -6 15 -22 10 -6 5Z"
            fill="currentColor"
            fillOpacity=".2"
          />
        </>,
        <>
          <path d="M-115 -25 Q-80 30 -25 35 M115 -25 Q80 30 25 35 M-115 -15 Q-80 45 -25 48 M115 -15 Q80 45 25 48" />
          <circle cy="25" r="3" />
        </>,
      ];
    case "emptychair":
      return [
        <path d="M80 -10 h25" />,
        <>
          <path d="M-35 45 V-40 h52 v64 M-35 -29 h52 M-35 24 h70 l-18 -13 h-52 M35 24 V52 M-29 24 V52 M17 24 V43" />
          <path d="M-90 53 H95" opacity=".4" />
        </>,
      ];
    case "ellipsis":
      return [
        <path d="M-100 0 H-25 M35 0 H100" />,
        <>
          {[-28, 0, 28].map((x, i) => (
            <circle
              key={x}
              cx={x}
              r="3"
              fill="currentColor"
              opacity={1 - i * 0.3}
            />
          ))}
          <path d="M-110 30 H-60 M60 30 H110" opacity=".3" />
        </>,
      ];
    case "rosette":
      return [
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cy="-25"
              rx="16"
              ry="32"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="16" />
          <circle r="62" opacity=".45" />
        </>,
        <>
          {[-90, -45, 0, 45, 90].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path d="M0 -20 L20 0 0 20 -20 0Z M0 -10 L10 0 0 10 -10 0Z" />
            </g>
          ))}
        </>,
      ];
    case "cypress":
      return [
        <>
          <path d="M-85 50 V-4 Q-85 -28 0 -60 Q85 -28 85 -4 V50 M-70 50 V0 Q-70 -18 0 -45 Q70 -18 70 0 V50" />
          <path
            d="M0 -18 Q-20 3 0 24 Q20 3 0 -18Z"
            fill="currentColor"
            fillOpacity=".2"
          />
        </>,
        <>
          {[-100, 100].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path
                d="M0 50 V-48 M0 -60 C-55 20 -35 38 0 38 C35 38 55 20 0 -60Z"
                fill="currentColor"
                fillOpacity=".12"
              />
            </g>
          ))}
          <ellipse cy="35" rx="55" ry="13" />
          <path d="M0 29 V-5 Q-20 -25 -30 -2 M0 -5 Q20 -25 30 -2" />
        </>,
      ];
    case "cranes":
      return [
        <>
          <circle
            cx="70"
            cy="-10"
            r="34"
            fill="currentColor"
            fillOpacity=".13"
          />
          <path d="M-110 -30 Q-50 -15 -25 10 Q10 -30 55 -38 M-25 10 Q-5 20 12 10 l22 2 M-25 10 l-25 30 M10 11 l-15 18" />
          <path d="M-60 -30 Q-20 -20 0 -5 Q35 -35 65 -34" opacity=".5" />
        </>,
        <>
          <path d="M-80 -15 Q-30 0 0 15 Q45 -15 95 -20 M0 15 Q20 25 32 17 l25 4 M0 15 l-25 26" />
        </>,
      ];
    case "rain":
      return [
        <>
          <path d="M-140 0 L110 -40 140 -25 -100 16 M-100 16 l-10 20 M-60 10 l-10 20 M-20 4 l-10 20 M20 -2 l-10 20 M60 -8 l-10 20" />
        </>,
        <>
          <path d="M0 45 L-90 -25 Q0 -85 90 -25Z" />
          {[-60, -30, 0, 30, 60].map((x) => (
            <path key={x} d={`M0 45 L${x} ${-49 + Math.abs(x) * 0.2}`} />
          ))}
          <path d="M-90 -25 Q0 -55 90 -25" />
        </>,
      ];
    case "dahlia":
      return [
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 30})`}
              d="M0 -8 Q-27 -30 0 -65 Q27 -30 0 -8Z"
              fill="currentColor"
              fillOpacity=".12"
            />
          ))}
          <circle r="12" />
        </>,
        <>
          {[-100, -50, 0, 50, 100].map((x) => (
            <path
              key={x}
              transform={`translate(${x} 0)`}
              d="M-20 -10 L0 10 20 -10 M-20 5 L0 25 20 5 M0 -22 v8"
            />
          ))}
        </>,
      ];
    case "agave":
      return [
        <>
          <circle r="28" />
          {Array.from({ length: 16 }, (_, i) => (
            <path key={i} d="M0 -36 v-16" transform={`rotate(${i * 22.5})`} />
          ))}
          <path d="M-15 10 L15 -10 M-20 0 L10 -20 M-5 20 L20 0" opacity=".4" />
        </>,
        <>
          {[-65, -40, -20, 0, 20, 40, 65].map((a) => (
            <path
              key={a}
              transform={`translate(0 55) rotate(${a})`}
              d="M0 0 Q-22 -45 0 -115 Q18 -38 0 0Z"
              fill="currentColor"
              fillOpacity=".15"
            />
          ))}
        </>,
      ];
    case "pebble":
      return [
        <path d="M-25 0 Q0 -7 25 0" />,
        <>
          <ellipse cy="35" rx="105" ry="10" opacity=".25" />
          <path
            d="M-80 25 C-100 -10 -30 -62 15 -36 C70 -40 100 17 65 29 Q0 45 -80 25Z"
            fill="currentColor"
            fillOpacity=".12"
          />
          <path d="M-60 10 Q-45 -20 -20 -24" opacity=".35" />
        </>,
      ];
    case "ripple":
      return [
        <path
          d="M0 -35 C-40 10 -20 32 0 32 C20 32 40 10 0 -35Z"
          fill="currentColor"
          fillOpacity=".12"
        />,
        <>
          {[25, 50, 80, 115].map((r, i) => (
            <ellipse key={r} rx={r} ry={r * 0.32} opacity={1 - i * 0.2} />
          ))}
        </>,
      ];
    case "ginkgo": {
      const leaf = (
        <>
          <path
            d="M0 45 Q-80 -5 -70 -40 Q-30 -65 0 -42 Q30 -65 70 -40 Q80 -5 0 45Z"
            fill="currentColor"
            fillOpacity=".1"
          />
          {[-55, -30, 0, 30, 55].map((x) => (
            <path key={x} d={`M0 45 Q${x * 0.7} 0 ${x} -42`} />
          ))}
          <path d="M0 45 V60" />
        </>
      );
      return [
        <g transform="scale(.75)">{leaf}</g>,
        <>
          <g transform="translate(-60 0) rotate(-30) scale(.65)">{leaf}</g>
          <g transform="translate(60 5) rotate(35) scale(.65)">{leaf}</g>
        </>,
      ];
    }
    case "fern":
      return [
        <>
          <path d="M-20 55 V-10 C-20 -65 55 -65 55 -20 C55 10 10 10 10 -15 C10 -30 35 -30 35 -15" />
          <path
            d="M-20 35 Q-65 20 -55 -10 Q-20 -5 -20 35"
            fill="currentColor"
            fillOpacity=".12"
          />
        </>,
        <>
          {[-1, 1].map((side) => (
            <g key={side} transform={`scale(${side} 1)`}>
              <path d="M0 50 Q45 0 105 -45" />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  transform={`translate(${20 + i * 21} ${25 - i * 19}) rotate(40)`}
                  d="M0 0 Q-35 -5 -25 -35 Q0 -20 0 0 Q35 -5 25 -35 Q0 -20 0 0"
                  fill="currentColor"
                  fillOpacity=".12"
                />
              ))}
            </g>
          ))}
        </>,
      ];
    case "reeds":
      return [
        <>
          <path d="M-120 -10 Q-20 -35 100 -10 M-70 10 Q30 -10 130 10 M-100 30 Q-40 15 20 22" />
        </>,
        <>
          {[-60, -20, 20, 60].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 60 Q${x + 10} 0 ${x + 50} ${-45 - i * 6}`} />
              <ellipse
                cx={x + 50}
                cy={-40 - i * 6}
                rx="5"
                ry="22"
                transform={`rotate(28 ${x + 50} ${-40 - i * 6})`}
                fill="currentColor"
                fillOpacity=".25"
              />
              <path
                d={`M${x + 8} 25 Q${x - 30} -5 ${x - 20} -20 M${x + 14} 10 Q${x + 60} 5 ${x + 70} -15`}
              />
            </g>
          ))}
        </>,
      ];
    case "moonwater":
      return [
        <>
          <circle r="43" />
          <circle r="34" opacity=".2" />
        </>,
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${-Math.sqrt(Math.max(0, 1600 - (i - 3) ** 2 * 130))} ${-30 + i * 12} h${2 * Math.sqrt(Math.max(0, 1600 - (i - 3) ** 2 * 130))}`}
              opacity={0.85 - i * 0.09}
            />
          ))}
          <path
            d="M-120 10 h45 M75 -10 h40 M60 40 h70 M-100 45 h30"
            opacity=".4"
          />
        </>,
      ];
    case "glacier":
      return [
        <>
          {[0, 60, 120].map((a) => (
            <path
              key={a}
              d="M0 -45 V45 M-10 -30 L0 -20 10 -30 M-10 30 L0 20 10 30"
              transform={`rotate(${a})`}
            />
          ))}
        </>,
        <>
          <path
            d="M-140 55 L-110 -10 -60 8 -15 -55 40 -5 85 -30 140 55Z"
            fill="currentColor"
            fillOpacity=".1"
          />
          <path d="M-110 -10 L-80 55 -60 8 -15 -55 0 55 40 -5 70 55 85 -30 M-15 -55 L-35 10 -60 8 M40 -5 L55 10 85 -30" />
        </>,
      ];
    case "ridge":
      return [
        <>
          <circle cy="-5" r="25" />
          <path d="M-120 30 h65 M55 30 h65 M-80 40 h25 M55 40 h25" />
        </>,
        <>
          <path d="M-150 55 L-100 -5 -70 15 -10 -60 35 -10 65 -30 150 55 M-100 -5 L-60 55 M-10 -60 L0 0 50 55 M65 -30 L90 30 M-32 -32 L-10 -20 7 -38" />
          <path d="M-130 55 H130" opacity=".4" />
        </>,
      ];
    case "exlibris":
      return [
        <>
          <path d="M0 40 Q-45 15 -100 25 V-45 Q-40 -55 0 -25 Q40 -55 100 -45 V25 Q45 15 0 40Z M0 -25 V40 M-85 -30 Q-40 -35 -15 -17 M15 -17 Q40 -35 85 -30 M-85 -15 Q-40 -20 -15 -2 M15 -2 Q40 -20 85 -15" />
        </>,
        <>
          <path d="M-90 -25 H90 L110 0 90 25 H-90 L-110 0Z M-75 0 H-20 M20 0 H75" />
          <path d="M0 -8 L8 0 0 8 -8 0Z" fill="currentColor" />
        </>,
      ];
    case "correspondence":
      return [
        <>
          <path d="M-65 50 Q0 -35 95 -55 C85 0 30 35 -20 20 M-65 50 L95 -55 M-5 10 L-10 -18 M15 -5 L18 -33 M35 -20 L45 -43 M15 -5 L45 0" />
        </>,
        <>
          <circle r="32" />
          <circle r="25" opacity=".5" />
          <path d="M-12 10 L0 -15 12 10 M-8 3 H8 M-100 0 H-45 M45 0 H100" />
          <path d="M-18 30 L-25 55 0 43 25 55 18 30" />
        </>,
      ];
    case "compass":
      return [
        <>
          <circle r="42" />
          <path d="M0 -60 L12 -12 60 0 12 12 0 60 -12 12 -60 0 -12 -12Z M0 -60 V60 M-60 0 H60" />
          <path
            d="M0 -60 L12 -12 0 0Z M0 60 L-12 12 0 0Z"
            fill="currentColor"
            fillOpacity=".25"
          />
        </>,
        <>
          <path
            d="M-120 30 C-60 -50 -25 50 20 -10 S80 -35 120 -20"
            strokeDasharray="5 8"
          />
          <circle cx="-120" cy="30" r="6" />
          <path d="M110 -30 l20 20 m0 -20 l-20 20" />
        </>,
      ];
    case "footpath":
      return [
        <>
          <path d="M-95 30 Q0 -55 95 30 M-95 20 Q0 -65 95 20 M-95 30 V55 M95 30 V55 M-65 -1 V28 M-35 -16 V13 M0 -23 V8 M35 -16 V13 M65 -1 V28" />
        </>,
        <>
          <path d="M-140 -10 Q-70 -40 0 -10 T140 -10 M-140 10 Q-70 -20 0 10 T140 10 M-100 30 Q-50 5 15 30 T120 30" />
          <path
            d="M-30 -55 l10 6 m20 0 l10 6 m20 0 l10 6"
            strokeDasharray="3 4"
          />
        </>,
      ];
    default:
      return [null, null];
  }
}

export function variantFrames(d: Design, w: number, h: number) {
  const template = variantTemplates.find((t) => t.id === d.template);
  if (!template) return null;
  const m = d.margin + 18,
    cx = w / 2;
  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  const scale = 0.7 + d.patternScale * 0.2;
  const [upper, lower] = motifs(d.template);
  const count = Math.max(2, Math.round(8 * d.density));
  const formal = ["persian", "french", "mexican"].includes(template.tradition);
  const sparse = ["absence", "zen", "tao"].includes(template.tradition);
  const frame = formal ? (
    <>
      <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
      <rect
        x={m + 12}
        y={m + 12}
        width={w - 2 * m - 24}
        height={h - 2 * m - 24}
        opacity=".35"
      />
      {[m + 25, w - m - 25].map((x) => (
        <g key={x}>
          {[m + 25, h - m - 25].map((y) => (
            <path
              key={y}
              d={`M${x} ${y - 7} l7 7 -7 7 -7 -7Z`}
              fill={d.palette.detail}
              stroke="none"
            />
          ))}
        </g>
      ))}
    </>
  ) : sparse ? (
    <path
      d={`M${m} ${m + 45} V${m} h45 M${w - m - 45} ${h - m} h45 v-45`}
      opacity=".35"
    />
  ) : (
    <path
      d={`M${m} ${m + 100} V${m} H${cx - 185} M${cx + 185} ${m} H${w - m} V${m + 100} M${m} ${h - m - 100} V${h - m} H${cx - 185} M${cx + 185} ${h - m} H${w - m} V${h - m - 100}`}
      opacity=".55"
    />
  );
  const pattern = (
    <g stroke={d.palette.detail} opacity=".3">
      {Array.from({ length: count }, (_, i) => {
        const x = m + 35 + (i * (w - 2 * m - 70)) / (count - 1);
        // Pattern marks live along the outer edge, separate from the motifs.
        return (
          <g key={i}>
            {top &&
              (d.template === "rain" ? (
                <path d={`M${x} ${m + 28} l-9 34`} />
              ) : (
                <path d={`M${x} ${m + 26} v${formal ? 9 : 2}`} />
              ))}
            {bottom && <path d={`M${x} ${h - m - 26} v${formal ? -9 : -2}`} />}
          </g>
        );
      })}
    </g>
  );
  const ornaments = (
    <>
      {top && (
        <g transform={`translate(${cx} ${m + 110}) scale(${scale})`}>{upper}</g>
      )}
      {bottom && (
        <g transform={`translate(${cx} ${h - m - 105}) scale(${scale})`}>
          {lower}
        </g>
      )}
    </>
  );
  return { frame, pattern, ornaments };
}
