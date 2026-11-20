import type { ReactNode } from "react";
import type { Design } from "../model";

export type FrameLayers = {
  pattern: ReactNode;
  frame: ReactNode;
  ornaments: ReactNode;
};

export type ProposalContext = {
  d: Design;
  id: string;
  w: number;
  h: number;
  m: number;
  cx: number;
  cy: number;
  sw: number;
  scale: number;
  top: boolean;
  bottom: boolean;
  paper: string;
  ornament: string;
  detail: string;
  ink: string;
};

export function makeContext(
  d: Design,
  id: string,
  w: number,
  h: number,
): ProposalContext {
  const m = d.margin;
  return {
    d,
    id,
    w,
    h,
    m,
    cx: w / 2,
    cy: h / 2,
    sw: 1.7 * d.thickness,
    scale: 0.72 + d.patternScale * 0.28,
    top: d.decoration !== "bottom",
    bottom: d.decoration !== "top",
    paper: d.palette.paper,
    ornament: d.palette.ornament,
    detail: d.palette.detail,
    ink: d.palette.ink,
  };
}

export const seq = (n: number) =>
  Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => i);

export function starPoly(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points = 8,
  phase = -Math.PI / 2,
) {
  return Array.from({ length: points * 2 }, (_, i) => {
    const a = phase + (i * Math.PI) / points;
    const r = i % 2 ? inner : outer;
    return `${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");
}

/** Four symmetric corners with orientation (0, 90, 180, 270) respecting decoration mode. */
export function FourCorners({
  ctx,
  inset = 0,
  render,
}: {
  ctx: ProposalContext;
  inset?: number;
  render: (i: number) => ReactNode;
}) {
  const { w, h, m, top, bottom } = ctx;
  const x0 = m + inset;
  const x1 = w - m - inset;
  const y0 = m + inset;
  const y1 = h - m - inset;
  const pts: [number, number, number, boolean][] = [
    [x0, y0, 0, top],
    [x1, y0, 90, top],
    [x1, y1, 180, bottom],
    [x0, y1, 270, bottom],
  ];
  return (
    <>
      {pts.map(
        ([x, y, rot, show], i) =>
          show && (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
              {render(i)}
            </g>
          ),
      )}
    </>
  );
}

/** Four mirrored corners (sx/sy reflection) — great for botanical or baroque cornerpieces. */
export function MirroredCorners({
  ctx,
  inset = 0,
  render,
}: {
  ctx: ProposalContext;
  inset?: number;
  render: (i: number) => ReactNode;
}) {
  const { w, h, m, top, bottom } = ctx;
  const x0 = m + inset;
  const x1 = w - m - inset;
  const y0 = m + inset;
  const y1 = h - m - inset;
  const pts: [number, number, number, number, boolean][] = [
    [x0, y0, 1, 1, top],
    [x1, y0, -1, 1, top],
    [x1, y1, -1, -1, bottom],
    [x0, y1, 1, -1, bottom],
  ];
  return (
    <>
      {pts.map(
        ([x, y, sx, sy, show], i) =>
          show && (
            <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
              {render(i)}
            </g>
          ),
      )}
    </>
  );
}

/** Concave-notched classical frame path (Victorian / Grand Siecle / Fine Press). */
export function notchedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  notch: number,
) {
  const r = Math.max(4, Math.min(notch, width / 6, height / 6));
  const x2 = x + width;
  const y2 = y + height;
  return [
    `M${x + r} ${y}`,
    `H${x2 - r}`,
    `A${r} ${r} 0 0 0 ${x2} ${y + r}`,
    `V${y2 - r}`,
    `A${r} ${r} 0 0 0 ${x2 - r} ${y2}`,
    `H${x + r}`,
    `A${r} ${r} 0 0 0 ${x} ${y2 - r}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 0 ${x + r} ${y}Z`,
  ].join(" ");
}

/** Chamfered octagon-corner rectangle path (bookbinding / monumental plaque). */
export function chamferedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  cut: number,
) {
  const c = Math.max(4, Math.min(cut, width / 6, height / 6));
  const x2 = x + width;
  const y2 = y + height;
  return `M${x + c} ${y} H${x2 - c} L${x2} ${y + c} V${y2 - c} L${x2 - c} ${y2} H${x + c} L${x} ${y2 - c} V${y + c}Z`;
}

/** Fine-press Aldine printer's fleuron / floral ornament centered at 0,0. */
export function Fleuron({
  size = 1,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <g transform={`scale(${size})`} stroke={color} fill="none">
      <path
        d="M0 -18 C-7 -10 -12 -3 0 6 C12 -3 7 -10 0 -18Z"
        fill={color ?? "currentColor"}
        fillOpacity=".22"
      />
      <path d="M0 6 C-9 6 -17 1 -22 -7 C-14 -7 -7 -2 0 6Z" />
      <path d="M0 6 C9 6 17 1 22 -7 C14 -7 7 -2 0 6Z" />
      <path d="M0 6 V16 M-8 14 Q0 10 8 14" />
      <circle cy="-22" r="2.2" fill={color ?? "currentColor"} stroke="none" />
    </g>
  );
}

/** Layered geometric rosette (Persian / Mexican / Classical). */
export function Rosette({
  r = 34,
  petals = 12,
  fillOpacity = 0.16,
  stroke,
  centerFill,
}: {
  r?: number;
  petals?: number;
  fillOpacity?: number;
  stroke?: string;
  centerFill?: string;
}) {
  return (
    <g stroke={stroke}>
      {seq(petals).map((i) => (
        <path
          key={i}
          transform={`rotate(${(i * 360) / petals})`}
          d={`M0 ${-r * 0.22} Q${-r * 0.24} ${-r * 0.7} 0 ${-r} Q${r * 0.24} ${-r * 0.7} 0 ${-r * 0.22}Z`}
          fill={stroke ?? "currentColor"}
          fillOpacity={fillOpacity}
        />
      ))}
      <circle r={r * 0.34} fill={centerFill ?? "none"} />
      <circle
        r={r * 0.14}
        fill={stroke ?? "currentColor"}
        stroke="none"
      />
    </g>
  );
}

/** Authentic Japanese vermilion Hanko seal (square with subtle organic interior lines). */
export function HankoSeal({
  x,
  y,
  size = 34,
  color,
  paper,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  paper: string;
}) {
  const s = size / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-s}
        y={-s}
        width={size}
        height={size}
        rx={size * 0.12}
        fill={color}
        stroke="none"
      />
      <rect
        x={-s + 3}
        y={-s + 3}
        width={size - 6}
        height={size - 6}
        rx={size * 0.06}
        fill="none"
        stroke={paper}
        strokeWidth="1.4"
        opacity=".85"
      />
      <path
        d={`M${-s * 0.42} ${-s * 0.36} H${s * 0.42} M0 ${-s * 0.45} V${s * 0.45} M${-s * 0.38} 0 H${s * 0.38} M${-s * 0.35} ${s * 0.38} Q0 ${s * 0.18} ${s * 0.35} ${s * 0.38}`}
        stroke={paper}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/** Subtle border-only mask helper so patterns never invade the reading window. */
export function BorderMask({
  maskId,
  w,
  h,
  x,
  y,
  rx = 0,
}: {
  maskId: string;
  w: number;
  h: number;
  x: number;
  y: number;
  rx?: number;
}) {
  return (
    <mask id={maskId}>
      <rect width={w} height={h} fill="white" />
      <rect
        x={x}
        y={y}
        width={Math.max(10, w - 2 * x)}
        height={Math.max(10, h - 2 * y)}
        rx={rx}
        fill="black"
      />
    </mask>
  );
}
