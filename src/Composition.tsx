import { useId, type ReactNode } from "react";
import { dimensions, type Design } from "./model";
import { layoutText } from "./layout";
export { readingInset } from "./layout";
import { literaryFrames } from "./LiteraryFrames";
import { poeticFrames } from "./PoeticFrames";
import { variantFrames } from "./VariantFrames";
import { satiricalFrames } from "./SatiricalFrames";
import { darkFrames } from "./DarkFrames";
import {
  backgroundRange,
  photoPaper,
  textOutline,
  type TextColors,
} from "./photo";
import { formFrames } from "./FormFrames";
import { warFrames } from "./WarFrames";
import { collectiveFrames } from "./CollectiveFrames";
import { landscapeFrames } from "./LandscapeFrames";
import { proposalFrames } from "./proposals";

export function starPoints(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points = 8,
  phase = -Math.PI / 2,
) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const angle = phase + (i * Math.PI) / points,
      r = i % 2 ? inner : outer;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(" ");
}
function Star({
  x = 0,
  y = 0,
  size = 45,
  points = 8,
}: {
  x?: number;
  y?: number;
  size?: number;
  points?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none">
      <polygon points={starPoints(0, 0, size, size * 0.43, points)} />
      <polygon points={starPoints(0, 0, size * 0.72, size * 0.49, points, 0)} />
      <circle r={size * 0.2} />
      <circle r={size * 0.1} fill="currentColor" stroke="none" />
    </g>
  );
}
function Floral({ size = 1 }: { size?: number }) {
  return (
    <g transform={`scale(${size})`} fill="none">
      <path d="M0 0 C90 15 130 110 205 165 M55 21 C42 65 68 112 108 105 C120 76 98 46 55 21 M115 82 C145 35 188 62 175 108 C159 127 131 123 115 82 M156 131 C141 184 179 217 214 187 M35 8 C48 -22 82 -29 95 -4 M12 2 C-9 40 14 74 44 66" />
      <path d="M44 66 Q24 55 12 2 M108 105 Q92 73 55 21 M175 108 Q163 93 115 82 M214 187 Q192 174 156 131" />
      <circle cx="205" cy="165" r="8" />
      <path d="M-2 0 Q34 -44 70 -48 Q48 -11 -2 0 M100 71 Q122 1 155 0 Q154 47 100 71" />
    </g>
  );
}
function Flower({
  x = 0,
  y = 0,
  r = 42,
}: {
  x?: number;
  y?: number;
  r?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 22.5})`}>
          <ellipse
            cy={-r * 0.58}
            rx={r * 0.2}
            ry={r * 0.42}
            fill="currentColor"
            fillOpacity=".22"
          />
          <path
            d={`M0 ${-r * 0.18} Q${-r * 0.36} ${-r * 0.88} 0 ${-r} Q${r * 0.36} ${-r * 0.88} 0 ${-r * 0.18}`}
            fill="none"
          />
        </g>
      ))}
      <circle r={r * 0.35} fill="currentColor" fillOpacity=".22" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle
          key={i}
          cx={Math.cos(i) * r * 0.2}
          cy={Math.sin(i) * r * 0.2}
          r="2.4"
          fill="currentColor"
          stroke="none"
        />
      ))}
    </g>
  );
}
export function Composition({
  design: d,
  thumbnail = false,
  page = 0,
  guides = false,
  onSelectText,
  svgId,
}: {
  design: Design;
  thumbnail?: boolean;
  page?: number;
  guides?: boolean;
  onSelectText?: () => void;
  svgId?: string;
}) {
  const rawId = useId();
  const id = `f${rawId.replace(/:/g, "").replace(/[^a-zA-Z0-9]/g, "")}`;
  const [w, h] = dimensions[d.format],
    { paper, ornament, detail, ink } = d.palette;
  const photoMode = d.backgroundMode === "photo";
  const photo = photoMode ? d.photo : null;
  const range = photo && backgroundRange(photo, photo.opacity);
  const photoText = (role: keyof TextColors) => {
    if (!photo || !range) return {};
    const fill = photo.colors[role];
    const stroke = textOutline(fill, range);
    return {
      fill,
      stroke,
      strokeWidth: stroke ? "0.12em" : undefined,
      paintOrder: "stroke",
      strokeLinejoin: "round" as const,
    };
  };
  const m = d.margin,
    sw = 1.7 * d.thickness,
    unit = (100 * d.patternScale) / d.density;
  const textLayout = layoutText(d);
  const { inset, horizontalInset, readWidth, readHeight } = textLayout;
  const corners = [
    [m + 51, m + 51, 0],
    [w - m - 51, m + 51, 90],
    [w - m - 51, h - m - 51, 180],
    [m + 51, h - m - 51, 270],
  ];
  const isTop = (index: number) => index < 2;
  const cornerNodes = (render: (index: number) => ReactNode, distance = 0) =>
    corners.map(
      ([x, y, rotate], i) =>
        (d.decoration === "all" || (d.decoration === "top") === isTop(i)) && (
          <g
            key={i}
            transform={`translate(${x + (i === 0 || i === 3 ? distance : -distance)} ${y + (i < 2 ? distance : -distance)}) rotate(${rotate})`}
          >
            {render(i)}
          </g>
        ),
    );
  const edgeDots = (
    axis: "x" | "y",
    render: (x: number, y: number, i: number) => ReactNode,
  ) => {
    const length = axis === "x" ? w : h,
      count = Math.max(
        2,
        Math.floor((length - 2 * m - 150) / (95 / d.density)),
      );
    return Array.from({ length: count }, (_, i) => {
      const p = m + 130 + ((length - 2 * m - 260) * (i + 0.5)) / count;
      return (
        <g key={i}>
          {axis === "x" ? (
            <>
              <g>{render(p, m + 28, i)}</g>
              <g>{render(p, h - m - 28, i)}</g>
            </>
          ) : (
            <>
              <g>{render(m + 28, p, i)}</g>
              <g>{render(w - m - 28, p, i)}</g>
            </>
          )}
        </g>
      );
    });
  };
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;
  switch (d.template) {
    case "stars":
      pattern = (
        <rect
          x={m + 11}
          y={m + 11}
          width={w - 2 * m - 22}
          height={h - 2 * m - 22}
          fill={`url(#${id}-girih)`}
          mask={`url(#${id}-border)`}
          opacity=".55"
        />
      );
      frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
          <rect
            x={m + 7}
            y={m + 7}
            width={w - 2 * m - 14}
            height={h - 2 * m - 14}
            opacity=".5"
          />
          <rect
            x={m + 61}
            y={m + 61}
            width={w - 2 * m - 122}
            height={h - 2 * m - 122}
          />
          <rect
            x={m + 69}
            y={m + 69}
            width={w - 2 * m - 138}
            height={h - 2 * m - 138}
            opacity=".5"
          />
          {edgeDots("x", (x, y, i) => (
            <Star key={i} x={x} y={y} size={17} />
          ))}
          {edgeDots("y", (x, y, i) => (
            <Star key={i} x={x} y={y} size={17} />
          ))}
        </>
      );
      ornaments = (
        <>
          {cornerNodes(() => (
            <>
              <rect
                x="-42"
                y="-42"
                width="84"
                height="84"
                fill={paper}
                transform="rotate(45)"
              />
              <Star size={57} />
              <g transform="translate(5 5)" stroke={detail}>
                <Floral size={0.62} />
              </g>
            </>
          ))}
          <g transform={`translate(${w / 2} ${m + 115})`} stroke={detail}>
            <Star size={23} />
            <path d="M-90 0 H-40 M40 0 H90" strokeWidth="1" />
          </g>
          <g transform={`translate(${w / 2} ${h - m - 115})`}>
            <Star size={15} />
            <path d="M-65 0 H-29 M29 0 H65" />
          </g>
        </>
      );
      break;
    case "manuscript":
      pattern = (
        <rect
          width={w}
          height={h}
          fill={`url(#${id}-shippo)`}
          mask={`url(#${id}-border)`}
          opacity=".13"
        />
      );
      frame = (
        <>
          <rect
            x={m + 7}
            y={m + 7}
            width={w - 2 * m - 14}
            height={h - 2 * m - 14}
          />
          <rect
            x={m + 16}
            y={m + 16}
            width={w - 2 * m - 32}
            height={h - 2 * m - 32}
            stroke={detail}
          />
          <path
            d={`M${m + 58} ${h / 2 - 140} V${m + 160} Q${m + 58} ${m + 58} ${m + 160} ${m + 58} H${w - m - 160} Q${w - m - 58} ${m + 58} ${w - m - 58} ${m + 160} V${h - m - 160} Q${w - m - 58} ${h - m - 58} ${w - m - 160} ${h - m - 58} H${m + 160} Q${m + 58} ${h - m - 58} ${m + 58} ${h - m - 160} Z`}
          />
        </>
      );
      ornaments = (
        <>
          {cornerNodes(
            () => (
              <>
                <Floral size={0.92} />
                <g transform="rotate(90) scale(1 -1)">
                  <Floral size={0.92} />
                </g>
                <Star size={25} />
              </>
            ),
            16,
          )}
          {[m + 84, h - m - 84].map((y, i) => (
            <g key={i} transform={`translate(${w / 2} ${y})`} stroke={detail}>
              <path
                d="M-110 0 Q-66 -9 -40 0 Q-28 -35 0 -43 Q28 -35 40 0 Q66 -9 110 0 Q66 9 40 0 Q28 35 0 43 Q-28 35 -40 0 Q-66 9 -110 0Z"
                fill={paper}
              />
              <Star size={23} points={10} />
            </g>
          ))}
        </>
      );
      break;
    case "infinite":
      pattern = (
        <rect
          width={w}
          height={h}
          fill={`url(#${id}-girih)`}
          mask={`url(#${id}-fade)`}
          opacity=".52"
        />
      );
      frame = (
        <>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            stroke={detail}
          />
          <rect
            x={m + 10}
            y={m + 10}
            width={w - 2 * m - 20}
            height={h - 2 * m - 20}
            opacity=".45"
          />
        </>
      );
      ornaments = (
        <>
          {cornerNodes(() => (
            <Star size={32} points={12} />
          ))}
          <Star x={w / 2} y={h - m - 78} size={20} points={12} />
        </>
      );
      break;
    case "silence":
      pattern = (
        <circle
          cx={w - m - 150}
          cy={m + 160}
          r="68"
          fill={detail}
          stroke="none"
          opacity=".8"
        />
      );
      frame = (
        <>
          <path d={`M${m + 48} ${m + 30} V${h - m - 30}`} opacity=".16" />
          <path d={`M${w - m - 48} ${h - m - 80} v50 h-50`} stroke={detail} />
        </>
      );
      ornaments = (
        <g
          transform={
            d.decoration === "top"
              ? `translate(${w} ${h}) rotate(180)`
              : undefined
          }
        >
          <path
            d={`M${m + 20} ${h - m - 50} Q170 ${h - 155} 214 ${h - 260} Q233 ${h - 310} 220 ${h - 365} M167 ${h - 175} Q250 ${h - 180} 316 ${h - 236} M204 ${h - 243} Q143 ${h - 280} 132 ${h - 330}`}
            strokeWidth="5"
          />
          {[
            [190, h - 220, -40],
            [232, h - 290, -12],
            [275, h - 214, 50],
            [149, h - 288, -50],
            [220, h - 338, 5],
          ].map(([x, y, a], i) => (
            <path
              key={i}
              transform={`translate(${x} ${y}) rotate(${a})`}
              d="M0 0 Q-20 -45 0 -75 Q20 -40 0 0Z"
              fill={ornament}
              stroke="none"
            />
          ))}
          <g
            transform={`translate(${w - m - 110} ${h - m - 115})`}
            stroke={detail}
            strokeWidth="2"
          >
            <rect width="31" height="41" />
            <path d="M7 10 h17 M15 7 v27 M7 24 h17 M9 34 l14 -18" />
          </g>
        </g>
      );
      break;
    case "waves":
      pattern = (
        <rect
          x={m}
          y={m}
          width={w - m * 2}
          height={h - m * 2}
          fill={`url(#${id}-waves)`}
          mask={`url(#${id}-border)`}
        />
      );
      frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
          <rect
            x={m + 88}
            y={m + 88}
            width={w - 2 * m - 176}
            height={h - 2 * m - 176}
          />
          <rect
            x={m + 95}
            y={m + 95}
            width={w - 2 * m - 190}
            height={h - 2 * m - 190}
            opacity=".4"
          />
        </>
      );
      ornaments = (
        <>
          <circle cx={w / 2} cy={m + 94} r="23" fill={paper} stroke="none" />
          <circle cx={w / 2} cy={m + 94} r="12" fill={detail} stroke="none" />
          <path
            d={`M${w / 2 - 15} ${h - m - 156} h30 v30 h-30 Z m6 7 h18 m-12 -2 v19 m-6 -7 h18`}
            stroke={detail}
            strokeWidth="2"
          />
        </>
      );
      break;
    case "ink":
      pattern = (
        <rect
          x={m + 8}
          y={m + 8}
          width={w - 2 * m - 16}
          height={h - 2 * m - 16}
          fill={`url(#${id}-asanoha)`}
          opacity=".07"
          mask={`url(#${id}-border)`}
        />
      );
      frame = (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <g
              key={i}
              opacity={0.08 + (i % 3) * 0.07}
              strokeWidth={2 + (i % 4)}
            >
              <path
                d={`M${m + 16 + i * 1.8} ${h - m + 12 - i * 2} Q${m - 5 + i * 3} ${h / 2} ${m + 20 + i * 1.2} ${m + 20} Q${w / 2} ${m - 6 + i * 2.5} ${w - m + 12 - i * 2} ${m + 8 + i * 2} M${w - m - i * 1.6} ${m - 3 + i * 3} Q${w - m + 16 - i * 2} ${h / 2} ${w - m - i * 2} ${h - m - i} Q${w / 2} ${h - m - 8 + i} ${m - 13 + i * 3} ${h - m - 5 + i * 2}`}
              />
            </g>
          ))}
        </>
      );
      ornaments = (
        <g
          transform={
            d.decoration === "top"
              ? `translate(${w} ${h}) rotate(180)`
              : undefined
          }
        >
          <path
            d={`M${m + 60} ${h - m - 55} Q${m + 128} ${h - 180} ${m + 170} ${h - 300}`}
            strokeWidth="5"
          />
          {Array.from({ length: 5 }, (_, i) => (
            <g
              key={i}
              transform={`translate(${m + 88 + i * 19} ${h - m - 92 - i * 37}) rotate(${i * 10 - 30})`}
            >
              <path
                d="M0 0 Q-85 -16 -98 -60 Q-40 -57 0 0 M0 0 Q23 -71 70 -85 Q60 -26 0 0"
                fill={ornament}
                stroke="none"
              />
            </g>
          ))}
          <circle
            cx={w - m - 105}
            cy={m + 110}
            r="23"
            fill={detail}
            stroke="none"
            opacity=".85"
          />
        </g>
      );
      break;
    case "marigold":
      pattern = (
        <rect
          width={w}
          height={h}
          fill={`url(#${id}-dots)`}
          opacity=".14"
          mask={`url(#${id}-border)`}
        />
      );
      frame = (
        <>
          <rect
            x={m + 18}
            y={m + 18}
            width={w - 2 * m - 36}
            height={h - 2 * m - 36}
            stroke={detail}
          />
          <rect
            x={m + 29}
            y={m + 29}
            width={w - 2 * m - 58}
            height={h - 2 * m - 58}
            stroke={detail}
            strokeDasharray="1 9"
            strokeLinecap="round"
          />
          {edgeDots("x", (x, y, i) => (
            <path
              key={i}
              d={`M${x - 22} ${y + 28} q22 -18 44 0 q-22 18 -44 0`}
              stroke={detail}
            />
          ))}
          {edgeDots("y", (x, y, i) => (
            <path
              key={i}
              d={`M${x + 28} ${y - 22} q-18 22 0 44 q18 -22 0 -44`}
              stroke={detail}
            />
          ))}
        </>
      );
      ornaments = (
        <>
          {cornerNodes(
            () => (
              <>
                <circle r="75" fill={paper} stroke="none" />
                <g stroke={detail}>
                  <Floral size={0.72} />
                </g>
                <Flower r={56} />
                <Flower x={73} y={13} r={25} />
                <Flower x={13} y={73} r={25} />
              </>
            ),
            26,
          )}
          <Flower x={w / 2} y={h - m - 95} r={22} />
        </>
      );
      break;
    case "papel":
      pattern = (
        <rect
          x={m}
          y={m}
          width={w - 2 * m}
          height={h - 2 * m}
          fill={`url(#${id}-cut)`}
          mask={`url(#${id}-border)`}
        />
      );
      frame = (
        <>
          <rect
            x={m - 8}
            y={m - 8}
            width={w - 2 * m + 16}
            height={h - 2 * m + 16}
          />
          <rect
            x={m + 98}
            y={m + 98}
            width={w - 2 * m - 196}
            height={h - 2 * m - 196}
            stroke={detail}
            strokeDasharray="3 7"
          />
          {edgeDots("x", (x, y, i) => (
            <path
              key={i}
              d={`M${x - 27} ${y + 57} Q${x} ${y + 92} ${x + 27} ${y + 57}`}
              strokeWidth="6"
            />
          ))}
          {edgeDots("y", (x, y, i) => (
            <path
              key={i}
              d={`M${x + 57} ${y - 27} Q${x + 92} ${y} ${x + 57} ${y + 27}`}
              strokeWidth="6"
            />
          ))}
        </>
      );
      ornaments = (
        <>
          {cornerNodes(() => (
            <>
              <circle r="59" fill={ornament} stroke="none" />
              {Array.from({ length: 8 }, (_, i) => (
                <ellipse
                  key={i}
                  cy="-29"
                  rx="10"
                  ry="19"
                  transform={`rotate(${i * 45})`}
                  fill={paper}
                  stroke="none"
                />
              ))}
              <circle r="9" fill={paper} />
            </>
          ))}
          <path
            d={`M${w / 2 - 18} ${h - m - 150} l18 -18 18 18 -18 18Z`}
            fill={detail}
            stroke="none"
          />
        </>
      );
      break;
    case "memory":
      pattern = (
        <rect
          x={m + 7}
          y={m + 7}
          width={w - 2 * m - 14}
          height={h - 2 * m - 14}
          fill={`url(#${id}-hatch)`}
          mask={`url(#${id}-border)`}
          opacity=".6"
        />
      );
      frame = (
        <>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            strokeWidth={4 * d.thickness}
          />
          <rect
            x={m + 12}
            y={m + 12}
            width={w - 2 * m - 24}
            height={h - 2 * m - 24}
          />
          <rect
            x={m + 66}
            y={m + 66}
            width={w - 2 * m - 132}
            height={h - 2 * m - 132}
            strokeWidth={3 * d.thickness}
          />
        </>
      );
      ornaments = (
        <>
          {cornerNodes(
            () => (
              <>
                <path
                  d="M-27 94 Q35 33 83 -20 M0 64 Q-44 44 -27 0 Q18 11 0 64 M30 29 Q8 -26 46 -41 Q70 -9 30 29 M56 8 Q73 44 114 27 Q98 -10 56 8"
                  fill={paper}
                  strokeWidth="3"
                />
                {Array.from({ length: 6 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${-20 + i * 3} ${12 + i * 6} l${20 - i} 12 M${43 + i * 9} ${15 + i * 1.4} l12 15`}
                  />
                ))}
                <Star size={25} points={12} />
              </>
            ),
            29,
          )}
          <g transform={`translate(${w / 2} ${h - m - 117})`}>
            <circle r="20" />
            {Array.from({ length: 16 }, (_, i) => (
              <path key={i} d="M0 -28 v-14" transform={`rotate(${i * 22.5})`} />
            ))}
          </g>
        </>
      );
  }
  const landscape =
    proposalFrames(d, id, w, h) ??
    formFrames(d, w, h) ??
    warFrames(d, w, h) ??
    collectiveFrames(d, w, h) ??
    darkFrames(d, w, h) ??
    satiricalFrames(d, w, h) ??
    variantFrames(d, w, h) ??
    poeticFrames(d, w, h) ??
    literaryFrames(d, w, h) ??
    landscapeFrames({ design: d, id, w, h });
  if (landscape) ({ frame, pattern, ornaments } = landscape);
  const {
    contentFamily,
    overhead,
    size,
    measure,
    pages,
    authorLines,
    authorLeading,
  } = textLayout;
  const currentPage = Math.min(Math.max(0, page), pages.length - 1);
  const lines = pages[currentPage];
  const titleSize = d.titleSize,
    authorSize = d.authorSize;
  const fullHeight = Math.max(1, lines.length) * size * d.lineHeight + overhead;
  const centerY = inset + (readHeight * d.position) / 100;
  const start = Math.max(
    inset,
    Math.min(h - inset - fullHeight, centerY - fullHeight / 2),
  );
  const x =
    d.align === "left"
      ? horizontalInset
      : d.align === "right"
        ? w - horizontalInset
        : w / 2;
  const anchor =
    d.align === "left" ? "start" : d.align === "right" ? "end" : "middle";
  const rtl =
    d.direction === "rtl" ||
    (d.direction === "auto" &&
      /^[^A-Za-z\u3040-\u9fff]*[\u0590-\u08ff]/.test(d.poem));
  const textY = start + (d.title ? d.titleSize + d.titleGap : 0) + size;
  const titleWidth = measure(titleSize, d.titleBold, d.titleItalic)(d.title);
  const fitTitleSize = Math.min(
    titleSize,
    (titleSize * readWidth) / Math.max(1, titleWidth),
  );
  const authorY =
    d.authorPosition === "bottom"
      ? h - inset - (authorLines.length - 1) * authorLeading
      : textY +
        (lines.length - 1) * size * d.lineHeight +
        d.authorGap +
        authorSize;
  return (
    <svg
      id={svgId}
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Composición ${d.title || d.name}`}
      data-font-size={size}
      data-font-family={contentFamily}
      data-overflow={lines.length * size * d.lineHeight + overhead > readHeight}
    >
      <defs>
        <pattern
          id={`${id}-girih`}
          width={unit}
          height={unit}
          patternUnits="userSpaceOnUse"
        >
          <g stroke={ornament} strokeWidth={sw * 0.65} fill="none">
            <polygon
              points={starPoints(
                unit / 2,
                unit / 2,
                unit * 0.57,
                unit * 0.32,
                d.template === "infinite" ? 12 : 8,
              )}
            />
            <path
              d={`M0 0 L${unit} ${unit} M0 ${unit} L${unit} 0 M0 ${unit / 2} L${unit / 2} 0 ${unit} ${unit / 2} ${unit / 2} ${unit}Z`}
            />
            <circle cx={unit / 2} cy={unit / 2} r={unit * 0.12} />
          </g>
        </pattern>
        <pattern
          id={`${id}-waves`}
          width={unit}
          height={unit / 2}
          patternUnits="userSpaceOnUse"
        >
          <rect width={unit} height={unit / 2} fill={ornament} />
          <g stroke={paper} strokeWidth={1.6 * d.thickness} fill="none">
            {[-1, 0, 1, 2].map((col) => (
              <g key={col} transform={`translate(${col * unit} 0)`}>
                {[0.12, 0.23, 0.34, 0.45].map((r) => (
                  <path
                    key={r}
                    d={`M${unit * (0.5 - r)} ${unit / 2} a${unit * r} ${unit * r} 0 0 1 ${unit * r * 2} 0 M${-unit * r} 0 a${unit * r} ${unit * r} 0 0 1 ${unit * r * 2} 0`}
                  />
                ))}
              </g>
            ))}
          </g>
        </pattern>
        <pattern
          id={`${id}-shippo`}
          width={unit}
          height={unit}
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={ornament} strokeWidth={sw}>
            <circle r={unit / 2} cx={unit / 2} cy={unit / 2} />
            <circle r={unit / 2} />
            <circle r={unit / 2} cx={unit} cy={unit} />
          </g>
        </pattern>
        <pattern
          id={`${id}-asanoha`}
          width={unit}
          height={unit * 0.866}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M0 0 H${unit} L${unit / 2} ${unit * 0.866}Z M${unit / 2} 0 V${unit * 0.866} M0 0 L${unit * 0.75} ${unit * 0.433} M${unit} 0 L${unit * 0.25} ${unit * 0.433} M0 ${unit * 0.866} L${unit / 2} 0 ${unit} ${unit * 0.866}`}
            stroke={ornament}
            strokeWidth={sw}
            fill="none"
          />
        </pattern>
        <pattern
          id={`${id}-dots`}
          width={unit / 3}
          height={unit / 3}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1.3" fill={ornament} />
        </pattern>
        <pattern
          id={`${id}-cut`}
          width={unit * 0.6}
          height={unit * 0.6}
          patternUnits="userSpaceOnUse"
        >
          <rect width={unit * 0.6} height={unit * 0.6} fill={ornament} />
          <g transform={`translate(${unit * 0.3} ${unit * 0.3})`} fill={paper}>
            {[0, 90, 180, 270].map((a) => (
              <ellipse
                key={a}
                cy={-unit * 0.14}
                rx={unit * 0.055}
                ry={unit * 0.105}
                transform={`rotate(${a})`}
              />
            ))}
            <circle r={unit * 0.045} />
            <path
              d={`M${-unit * 0.3} ${-unit * 0.22} l${unit * 0.08} ${-unit * 0.08} ${-unit * 0.08} ${-unit * 0.08} ${-unit * 0.08} ${unit * 0.08}Z`}
            />
          </g>
        </pattern>
        <pattern
          id={`${id}-hatch`}
          width={12 * d.patternScale}
          height={12 * d.patternScale}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 12 L12 0 M-3 3 L3 -3 M9 15 L15 9"
            stroke={ornament}
            strokeWidth="1.1"
          />
        </pattern>
        <filter id={`${id}-paper`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".72"
            numOctaves="3"
            seed="8"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id={`${id}-radial`}>
          <stop offset="0" stopColor="black" />
          <stop offset=".55" stopColor="black" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <mask id={`${id}-fade`}>
          <rect width={w} height={h} fill={`url(#${id}-radial)`} />
        </mask>
        <mask id={`${id}-border`}>
          <rect width={w} height={h} fill="white" />
          <rect
            x={m + 80}
            y={m + 80}
            width={w - 2 * m - 160}
            height={h - 2 * m - 160}
            fill="black"
          />
        </mask>
        <clipPath id={`${id}-textClip`}>
          <rect
            x={horizontalInset - 3}
            y={inset - 20}
            width={readWidth + 6}
            height={readHeight + 40}
          />
        </clipPath>
      </defs>
      <rect
        width={w}
        height={h}
        fill={photo ? photoPaper(photo.dominant) : paper}
      />
      {photo && (
        <image
          href={photo.src}
          x="0"
          y="0"
          width={w}
          height={h}
          preserveAspectRatio="xMidYMid slice"
          opacity={photo.opacity / 100}
        />
      )}
      {!photoMode && d.layers.texture && !thumbnail && (
        <rect
          width={w}
          height={h}
          filter={`url(#${id}-paper)`}
          opacity=".065"
          style={{ mixBlendMode: "multiply" }}
        />
      )}
      <g
        color={ornament}
        stroke={ornament}
        strokeWidth={sw}
        fill="none"
        opacity={d.opacity}
        strokeLinejoin="round"
      >
        {!photoMode && d.layers.pattern && pattern}
        {!photoMode && d.layers.frame && frame}
        {!photoMode && d.layers.ornaments && ornaments}
      </g>
      {!thumbnail && (
        <g
          fill={ink}
          stroke="none"
          fontFamily={`"${contentFamily}", serif`}
          textAnchor={
            rtl
              ? anchor === "start"
                ? "end"
                : anchor === "end"
                  ? "start"
                  : anchor
              : anchor
          }
          direction={rtl ? "rtl" : "ltr"}
          style={{ unicodeBidi: "plaintext" }}
          clipPath={`url(#${id}-textClip)`}
          onClick={onSelectText}
        >
          {d.title && (
            <text
              x={x}
              y={start + titleSize}
              fontSize={fitTitleSize}
              {...photoText("title")}
              fontWeight={d.titleBold ? 600 : 400}
              fontStyle={d.titleItalic ? "italic" : "normal"}
            >
              {d.title}
            </text>
          )}
          <text
            fontSize={size}
            {...photoText("poem")}
            fontWeight={d.bold ? 600 : 400}
            fontStyle={d.italic ? "italic" : "normal"}
            letterSpacing={d.letterSpacing}
          >
            {lines.map((line, i) => (
              <tspan key={i} x={x} y={textY + i * size * d.lineHeight}>
                {line || "\u00a0"}
              </tspan>
            ))}
          </text>
          {authorLines.length > 0 && (
            <text
              data-author="true"
              fontSize={authorSize}
              {...photoText("author")}
              fontWeight={d.authorBold ? 600 : 400}
              fontStyle={d.authorItalic ? "italic" : "normal"}
            >
              {authorLines.map((line, i) => (
                <tspan key={i} x={x} y={authorY + i * authorLeading}>
                  {line || "\u00a0"}
                </tspan>
              ))}
            </text>
          )}
        </g>
      )}
      {thumbnail && (
        <g fill={photo?.colors.poem ?? ink} opacity=".65">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={w * (0.29 + (i % 2) * 0.035)}
              y={h * 0.41 + i * 49}
              width={w * (0.42 - (i % 2) * 0.07)}
              height="7"
              rx="3"
            />
          ))}
          <rect x={w * 0.41} y={h * 0.41 + 240} width={w * 0.18} height="4" />
        </g>
      )}
      {!thumbnail && pages.length > 1 && (
        <text
          x={w / 2}
          y={h - d.margin - 28}
          textAnchor="middle"
          fontFamily="serif"
          fontSize="20"
          fill={photo?.colors.poem ?? ink}
          {...photoText("poem")}
        >
          {currentPage + 1} / {pages.length}
        </text>
      )}
      {guides && !thumbnail && (
        <g
          fill="none"
          stroke="#d97357"
          strokeWidth="2"
          strokeDasharray="10 9"
          pointerEvents="none"
        >
          <rect
            x={horizontalInset}
            y={inset}
            width={readWidth}
            height={readHeight}
          />
          {d.format === "story" && (
            <>
              <rect x="65" y="250" width="835" height="1300" />
              <text
                x="80"
                y="235"
                fill="#d97357"
                stroke="none"
                fontSize="20"
                fontFamily="sans-serif"
              >
                Zona segura orientativa · Reels / TikTok
              </text>
            </>
          )}
        </g>
      )}
    </svg>
  );
}
