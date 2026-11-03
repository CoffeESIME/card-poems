import type { ReactNode } from "react";
import type { Design } from "./model";

type Layers = { pattern: ReactNode; frame: ReactNode; ornaments: ReactNode };
type FrameContext = { design: Design; id: string; w: number; h: number };
const sequence = (n: number) => Array.from({ length: n }, (_, i) => i);

// Coordinates are local to each motif. Only positions and repetition counts
// depend on the page dimensions, so landscape and botanical forms stay intact.
function Leaf({
  x = 0,
  y = 0,
  angle = 0,
  size = 1,
}: {
  x?: number;
  y?: number;
  angle?: number;
  size?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}>
      <path
        d="M0 0 C-28 -14 -37 -45 -14 -73 C12 -53 21 -20 0 0Z"
        fill="currentColor"
        fillOpacity=".12"
      />
      <path
        d="M0 0 Q-9 -34 -14 -73 M-4 -20 l-15 -15 M-8 -38 l-14 -14 M-6 -25 l13 -21"
        opacity=".65"
      />
    </g>
  );
}
function Fern({ density = 1 }: { density?: number }) {
  const count = Math.round(9 * density);
  return (
    <g fill="none">
      <path d="M0 0 Q-38 -120 12 -275" />
      {sequence(count).map((i) => {
        const t = (i + 1) / (count + 1),
          y = -t * 263,
          x = -18 * Math.sin(t * Math.PI),
          spread = 68 * Math.sin(t * Math.PI) + 6;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d={`M0 0 Q${-spread * 0.65} -6 ${-spread} -42 Q${-spread * 0.3} -38 0 0 M0 0 Q${spread * 0.8} -8 ${spread} -45 Q${spread * 0.3} -37 0 0`}
              fill="currentColor"
              fillOpacity=".12"
            />
            <path d={`M0 0 L${-spread} -42 M0 0 L${spread} -45`} opacity=".6" />
          </g>
        );
      })}
    </g>
  );
}
function Lotus() {
  return (
    <g fill="currentColor" fillOpacity=".055">
      <path d="M0 0 C-70 -43 -48 -105 0 -149 C48 -105 70 -43 0 0Z" />
      <path d="M0 0 C-102 -4 -133 -67 -118 -121 C-55 -111 -14 -76 0 0Z M0 0 C102 -4 133 -67 118 -121 C55 -111 14 -76 0 0Z" />
      <path d="M0 0 C-118 27 -171 -5 -186 -55 C-110 -78 -43 -51 0 0Z M0 0 C118 27 171 -5 186 -55 C110 -78 43 -51 0 0Z" />
      <path
        d="M0 0 C-70 -9 -80 -46 -63 -88 M0 0 C70 -9 80 -46 63 -88 M0 0 Q0 -70 0 -126"
        fill="none"
        opacity=".6"
      />
    </g>
  );
}
function Cloud({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
      fill="none"
    >
      <path d="M-140 24 H113 C158 24 164 -24 135 -35 C111 -44 94 -26 104 -10 C112 1 127 -4 124 -14 M-102 24 C-144 24 -146 -17 -122 -31 C-107 -39 -90 -33 -84 -20 C-96 -83 -24 -101 1 -61 C21 -111 92 -90 95 -47 C128 -61 148 -41 146 -17" />
      <path
        d="M-71 8 H75 C101 8 104 -14 89 -22 C72 -31 61 -13 71 -5 M-72 8 C-92 8 -94 -14 -77 -22 C-64 -29 -51 -18 -56 -9 M-33 -1 C-53 -20 -31 -48 -10 -34 C-2 -29 -3 -13 -13 -13"
        opacity=".6"
      />
      <path d="M-172 42 H36 M67 42 H166 M-88 55 H106" opacity=".4" />
    </g>
  );
}
function Contour({
  x,
  y,
  count,
  scale = 1,
  phase = 0,
}: {
  x: number;
  y: number;
  count: number;
  scale?: number;
  phase?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none">
      {sequence(count).map((i) => {
        const radius = 23 + i * 15;
        const points = sequence(100).map((j) => {
          const a = (j / 100) * Math.PI * 2;
          const r =
            radius *
            (1 +
              0.13 * Math.sin(3 * a + phase) +
              0.08 * Math.cos(5 * a - phase));
          return `${Math.cos(a) * r},${Math.sin(a) * r * 0.72}`;
        });
        return (
          <path
            key={i}
            d={`M${points.join(" L")}Z`}
            opacity={0.25 + 0.045 * (i % 5)}
          />
        );
      })}
    </g>
  );
}
function Wildflower({ kind, size = 1 }: { kind: number; size?: number }) {
  return (
    <g transform={`scale(${size})`} fill="none">
      <path d="M0 0 Q-12 -79 5 -153 M-2 -40 Q-54 -59 -44 -90 Q-13 -82 -2 -40 M-3 -67 Q37 -95 36 -124 Q9 -114 -3 -67" />
      {kind % 3 === 0 ? (
        <g transform="translate(5 -153)">
          {sequence(8).map((i) => (
            <ellipse
              key={i}
              cy="-15"
              rx="6"
              ry="15"
              transform={`rotate(${i * 45})`}
              fill="currentColor"
              fillOpacity=".08"
            />
          ))}
          <circle r="7" />
        </g>
      ) : kind % 3 === 1 ? (
        <g transform="translate(5 -150)">
          <path d="M0 0 V-70" />
          {sequence(6).map((i) => (
            <path
              key={i}
              d={`M0 ${-i * 10} q-24 -11 -18 -25 M0 ${-i * 10 - 4} q24 -11 18 -25`}
            />
          ))}
        </g>
      ) : (
        <g transform="translate(5 -153)">
          <path d="M0 0 L-24 -32 M0 0 L25 -34 M0 0 V-43 M0 0 L-39 -12 M0 0 L40 -11" />
          {[
            [-24, -32],
            [25, -34],
            [0, -43],
            [-39, -12],
            [40, -11],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" />
          ))}
        </g>
      )}
    </g>
  );
}

export function landscapeFrames({
  design: d,
  id,
  w,
  h,
}: FrameContext): Layers | null {
  const { paper, ornament, detail } = d.palette,
    m = d.margin;
  const s = 0.8 + d.patternScale * 0.2,
    n = Math.round(8 * d.density);
  const bottom = d.decoration === "top" ? m + 225 : h - m - 32;
  const topAccent = d.decoration !== "bottom";
  const bottomAccent = d.decoration !== "top";
  const cornerRule = (
    <path
      d={`M${m + 105} ${m + 18} H${m + 18} V${m + 105} M${w - m - 105} ${m + 18} H${w - m - 18} V${m + 105} M${m + 18} ${h - m - 105} V${h - m - 18} H${m + 105} M${w - m - 105} ${h - m - 18} H${w - m - 18} V${h - m - 105}`}
      opacity=".45"
    />
  );
  const moon = (x: number, y: number, r = 32) => (
    <g stroke={detail}>
      <circle cx={x} cy={y} r={r} fill={detail} fillOpacity=".08" />
      <path
        d={`M${x - r - 26} ${y} h-28 M${x + r + 26} ${y} h28`}
        opacity=".5"
      />
    </g>
  );
  const dots = (
    <rect
      x={m}
      y={m}
      width={w - 2 * m}
      height={h - 2 * m}
      fill={`url(#${id}-dots)`}
      mask={`url(#${id}-border)`}
      opacity=".12"
    />
  );
  const ripple = (x: number, y: number, count = 4) => (
    <g transform={`translate(${x} ${y})`}>
      {sequence(count).map((i) => (
        <ellipse
          key={i}
          rx={52 + i * 31 * s}
          ry={5 + i * 6 * s}
          opacity={0.5 - i * 0.08}
        />
      ))}
    </g>
  );
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;
  switch (d.template) {
    case "enso": {
      const r = w / 2 - m - 70;
      frame = (
        <g
          transform={`translate(${w / 2} ${h / 2}) rotate(-18)`}
          strokeLinecap="round"
        >
          {sequence(16).map((i) => (
            <path
              key={i}
              d={`M${Math.cos(0.38) * (r + i * 0.8)} ${Math.sin(0.38) * (r + i * 0.8)} A${r + i * 0.8} ${r + i * 0.8} 0 1 1 ${Math.cos(-0.08) * (r + i * 0.8)} ${Math.sin(-0.08) * (r + i * 0.8)}`}
              strokeWidth={d.thickness * (1.3 + (i % 4) * 0.5)}
              opacity={0.13 + (i % 5) * 0.1}
            />
          ))}
          <path
            d={`M${r - 5} -30 q-4 -24 -16 -49`}
            strokeWidth={8 * d.thickness}
            opacity=".4"
          />
        </g>
      );
      pattern = dots;
      ornaments = (
        <g
          transform={`translate(${w / 2} ${d.decoration === "top" ? m + 106 : h - m - 100})`}
          stroke={detail}
        >
          <path d="M-11 -17 h23 v35 h-23Z M-5 -9 h11 M0 -12 v24 M-6 5 h13" />
          <circle cx="-37" r="1.8" fill={detail} />
          <circle cx="37" r="1.8" fill={detail} />
        </g>
      );
      break;
    }
    case "sand":
      pattern = (
        <g mask={`url(#${id}-border)`} opacity=".36">
          {sequence(Math.round(18 * d.density)).map((i) => (
            <g key={i}>
              <ellipse
                cx={m + 110}
                cy={m + 110}
                rx={85 + i * 24 * s}
                ry={58 + i * 19 * s}
              />
              <ellipse
                cx={w - m - 115}
                cy={h - m - 108}
                rx={65 + i * 25 * s}
                ry={45 + i * 20 * s}
              />
            </g>
          ))}
        </g>
      );
      frame = cornerRule;
      ornaments = (
        <g transform={`translate(${w / 2} ${bottom - 35})`} stroke={detail}>
          <path
            d="M-125 14 C-148 -6 -119 -51 -92 -43 C-58 -54 -37 -20 -49 8 C-67 27 -105 26 -125 14Z"
            fill={detail}
            fillOpacity=".18"
          />
          <path
            d="M-32 27 C-50 7 -25 -23 1 -18 C35 -34 60 4 42 24 C23 40 -16 38 -32 27Z"
            fill={detail}
            fillOpacity=".1"
          />
          <path
            d="M76 3 C46 -9 66 -65 97 -63 C128 -72 150 -18 127 3 C114 16 90 13 76 3Z"
            fill={detail}
            fillOpacity=".25"
          />
          <path
            d="M-119 2 q20 -33 49 -22 M-21 15 q27 -25 48 -6 M81 -16 q17 -31 36 -10"
            opacity=".4"
          />
        </g>
      );
      break;
    case "lotus":
      frame = (
        <>
          <path
            d={`M${m + 36} ${m + 135} V${h - m - 150} M${w - m - 36} ${m + 135} V${h - m - 150}`}
            opacity=".25"
          />
          {cornerRule}
        </>
      );
      pattern = (
        <g stroke={detail} opacity=".5">
          {ripple(w / 2, bottom - 25, 5)}
        </g>
      );
      ornaments = (
        <>
          {d.decoration === "all" && moon(w / 2, m + 105, 25)}
          <g transform={`translate(${w / 2} ${bottom - 60}) scale(${s})`}>
            <Lotus />
          </g>
          <path
            d={`M${w / 2 - 250} ${bottom - 42} q80 -7 130 0 M${w / 2 + 120} ${bottom - 42} q70 -6 130 0`}
            opacity=".45"
          />
        </>
      );
      break;
    case "herbarium":
      frame = (
        <>
          <path
            d={`M${m + 150} ${m + 26} H${w - m - 90} V${m + 150} M${m + 90} ${h - m - 26} H${w - m - 150} M${m + 26} ${m + 245} V${h - m - 90} M${w - m - 26} ${m + 90} V${h - m - 245}`}
            opacity=".5"
          />
          <path
            d={`M${m + 47} ${m + 270} V${h - m - 120} M${w - m - 47} ${m + 120} V${h - m - 270}`}
            strokeDasharray="1 8"
            opacity=".35"
          />
        </>
      );
      pattern = dots;
      ornaments = (
        <>
          {topAccent && (
            <g
              transform={`translate(${m + 80} ${m + 63}) rotate(136) scale(${s})`}
            >
              <Fern density={d.density} />
            </g>
          )}
          {bottomAccent && (
            <g
              transform={`translate(${w - m - 85} ${h - m - 65}) rotate(-35) scale(${s})`}
            >
              <Fern density={d.density} />
            </g>
          )}
          <g
            transform={`translate(${w / 2} ${d.decoration === "top" ? m + 115 : h - m - 95})`}
            stroke={detail}
          >
            <Leaf angle={-35} size={0.48} />
            <path d="M-50 10 H-14 M18 10 H52" />
          </g>
        </>
      );
      break;
    case "willow":
      frame = (
        <path
          d={`M${m + 25} ${m + 40} V${h - m - 35} H${w - m - 40}`}
          opacity=".3"
        />
      );
      pattern = (
        <g stroke={detail} opacity=".5">
          {ripple(w * 0.7, h - m - 95, 5)}
          {ripple(w * 0.25, h - m - 57, 3)}
        </g>
      );
      ornaments = (
        <g
          transform={
            d.decoration === "bottom"
              ? `translate(0 ${h - m * 2 - 360})`
              : undefined
          }
        >
          <path
            d={`M${w - m - 25} ${m + 15} Q${w - 220} ${m + 18} ${w - 380} ${m + 54}`}
            strokeWidth={3 * d.thickness}
          />
          {sequence(n + 3).map((i) => {
            const x = w - m - 45 - i * 33,
              length = 140 + 85 * Math.sin(i * 0.8);
            return (
              <g key={i} transform={`translate(${x} ${m + 30 + i * 2})`}>
                <path d={`M0 0 Q-50 ${length * 0.45} -25 ${length}`} />
                {sequence(6).map((j) => (
                  <g
                    key={j}
                    transform={`translate(${-20 * Math.sin(j * 0.4)} ${25 + (j * length) / 7})`}
                  >
                    <path
                      d="M0 0 Q-34 15 -24 49 Q-7 26 0 0 M0 5 Q22 22 10 53 Q0 31 0 5"
                      fill={ornament}
                      fillOpacity=".14"
                    />
                  </g>
                ))}
              </g>
            );
          })}
        </g>
      );
      break;
    case "meadow":
      frame = (
        <>
          <path
            d={`M${m + 30} ${m + 175} V${h - m - 28} H${w - m - 30} V${m + 175}`}
            opacity=".35"
          />
          <path
            d={`M${m + 30} ${m + 135} V${m + 30} H${m + 140} M${w - m - 140} ${m + 30} H${w - m - 30} V${m + 135}`}
            stroke={detail}
            opacity=".5"
          />
        </>
      );
      pattern = (
        <g fill={detail} stroke="none" opacity=".4">
          {sequence(n + 4).map((i) => (
            <circle
              key={i}
              cx={m + 65 + ((w - 2 * m - 130) * i) / (n + 3)}
              cy={m + 85 + Math.sin(i * 2.4) * 32}
              r={i % 3 === 0 ? 2.5 : 1.3}
            />
          ))}
        </g>
      );
      ornaments = (
        <g transform={`translate(0 ${bottom})`}>
          {sequence(n + 3).map((i) => {
            const x = m + 90 + ((w - 2 * m - 180) * i) / (n + 2),
              scale = (0.5 + 0.33 * (0.5 + 0.5 * Math.sin(i * 2.3))) * s;
            return (
              <g
                key={i}
                transform={`translate(${x} 0) rotate(${Math.sin(i) * 9})`}
                stroke={i % 3 === 0 ? detail : ornament}
              >
                <Wildflower kind={i} size={scale} />
              </g>
            );
          })}
          <path
            d={`M${m + 70} 0 Q${w / 2} -12 ${w - m - 70} 0`}
            opacity=".45"
          />
        </g>
      );
      break;
    case "river":
      frame = (
        <>
          <path
            d={`M${w - m - 37} ${m + 65} V${h - m - 65}`}
            stroke={detail}
            opacity=".35"
          />
          {cornerRule}
        </>
      );
      pattern = (
        <g opacity=".2" fill="currentColor">
          {sequence(3).map((i) => (
            <path
              key={i}
              d={`M${m + 35 + i * 15} ${m + 20} C${m + 225 + i * 8} ${h * 0.24} ${m - 125 + i * 15} ${h * 0.44} ${m + 91 + i * 11} ${h * 0.63} S${m + 23 + i * 15} ${h * 0.86} ${m + 130 + i * 12} ${h - m - 20}`}
              fill="none"
              strokeWidth={i === 1 ? 11 : 1.5}
            />
          ))}
        </g>
      );
      ornaments = (
        <>
          {topAccent && moon(w - m - 125, m + 118, 36)}
          <g
            stroke={detail}
            transform={`translate(${w * 0.58} ${bottom - 56})`}
          >
            <path
              d="M-165 17 q42 -27 76 0 t76 0 t76 0 M-90 33 h120 M-30 47 h123"
              opacity=".65"
            />
            <Leaf x={95} y={-8} angle={58} size={0.55} />
          </g>
        </>
      );
      break;
    case "balance":
      pattern = (
        <g opacity=".12">
          {sequence(Math.round(4 * d.density)).map((i) => (
            <g key={i}>
              <path
                d={`M${m + 70 + i * 12} ${m + 210} Q${m - 28 + i * 12} ${h / 2} ${m + 70 + i * 12} ${h - m - 170}`}
              />
              <path
                d={`M${w - m - 70 - i * 12} ${m + 170} Q${w - m + 28 - i * 12} ${h / 2} ${w - m - 70 - i * 12} ${h - m - 210}`}
              />
            </g>
          ))}
        </g>
      );
      frame = (
        <>
          <path
            d={`M${m + 70} ${m + 80} Q${w / 2} ${m - 10} ${w - m - 70} ${m + 80} M${m + 70} ${h - m - 80} Q${w / 2} ${h - m + 10} ${w - m - 70} ${h - m - 80}`}
            opacity=".55"
          />
          {cornerRule}
        </>
      );
      ornaments = (
        <>
          <g
            transform={`translate(${w / 2} ${d.decoration === "bottom" ? h - m - 125 : m + 125}) scale(${s})`}
          >
            <circle r="51" fill={paper} />
            <path
              d="M0 -51 A51 51 0 0 1 0 51 A25.5 25.5 0 0 0 0 0 A25.5 25.5 0 0 1 0 -51Z"
              fill={ornament}
            />
            <circle cy="-25.5" r="6" fill={ornament} />
            <circle cy="25.5" r="6" fill={paper} stroke="none" />
            <circle r="63" stroke={detail} opacity=".5" />
          </g>
          {d.decoration === "all" && (
            <g transform={`translate(${w / 2} ${h - m - 90})`} stroke={detail}>
              <path d="M-40 0 H-13 M13 0 H40" />
              <circle r="4" />
            </g>
          )}
        </>
      );
      break;
    case "clouds":
      frame = (
        <>
          <path
            d={`M${m + 37} ${m + 210} V${h - m - 210} M${w - m - 37} ${m + 210} V${h - m - 210}`}
            opacity=".3"
          />
          {cornerRule}
        </>
      );
      pattern = (
        <g opacity=".12" mask={`url(#${id}-border)`}>
          {sequence(n).map((i) => (
            <path
              key={i}
              d={`M${m} ${m + 75 + i * 13 * s} C${w * 0.3} ${m + 15 + i * 15 * s} ${w * 0.6} ${m + 120 + i * 9 * s} ${w - m} ${m + 50 + i * 15 * s} M${m} ${h - m - 75 - i * 13 * s} C${w * 0.3} ${h - m - 15 - i * 15 * s} ${w * 0.6} ${h - m - 120 - i * 9 * s} ${w - m} ${h - m - 50 - i * 15 * s}`}
            />
          ))}
        </g>
      );
      ornaments = (
        <>
          {topAccent && (
            <>
              <Cloud x={m + 190} y={m + 118} scale={s} />
              <Cloud x={w - m - 150} y={m + 87} scale={0.62 * s} flip />
            </>
          )}
          {bottomAccent && (
            <>
              <Cloud x={w - m - 190} y={h - m - 113} scale={s} flip />
              <Cloud x={m + 150} y={h - m - 80} scale={0.58 * s} />
            </>
          )}
        </>
      );
      break;
    case "alpine":
      frame = (
        <>
          <path
            d={`M${m + 23} ${m + 175} V${h - m - 23} H${w - m - 23} V${m + 175}`}
            opacity=".4"
          />
          {cornerRule}
        </>
      );
      pattern = (
        <g fill={detail} stroke={detail}>
          {sequence(n).map((i) => {
            const x = m + 100 + ((w - 2 * m - 200) * i) / (n - 1),
              y = m + 70 + Math.sin(i * 2.1) * 33;
            return (
              <path
                key={i}
                d={`M${x - 4} ${y} h8 M${x} ${y - 4} v8`}
                opacity={i % 2 ? 0.35 : 0.7}
              />
            );
          })}
        </g>
      );
      ornaments = (
        <g transform={`translate(0 ${bottom - 14})`}>
          <path
            d={`M${m + 42} 0 L${w * 0.23} -108 ${w * 0.32} -53 ${w * 0.46} -210 ${w * 0.6} -55 ${w * 0.73} -150 ${w - m - 42} 0Z`}
            fill={ornament}
            fillOpacity=".06"
          />
          <path
            d={`M${w * 0.32} -53 L${w * 0.46} -210 ${w * 0.6} -55 M${w * 0.404} -147 l${w * 0.032} 9 ${w * 0.024} -30 ${w * 0.035} 33 ${w * 0.025} -11 M${w * 0.69} -106 l${w * 0.023} 10 ${w * 0.017} -23 ${w * 0.03} 33 M${w * 0.46} -210 l-27 141 -28 -18 -30 78 M${w * 0.73} -150 l-9 101 28 18`}
            opacity=".75"
          />
          <path d={`M${m + 50} 18 H${w - m - 50}`} stroke={detail} />
          <circle
            cx={w * 0.79}
            cy="-195"
            r="25"
            stroke={detail}
            fill={detail}
            fillOpacity=".08"
          />
        </g>
      );
      break;
    case "mist":
      frame = cornerRule;
      pattern = (
        <g transform={`translate(0 ${bottom})`} stroke="none" fill={ornament}>
          <path
            d={`M${m} 0 V-96 Q${w * 0.12} -248 ${w * 0.3} -159 T${w * 0.61} -164 T${w - m} -137 V0Z`}
            opacity=".08"
          />
          <path
            d={`M${m} 0 V-78 Q${w * 0.24} -182 ${w * 0.41} -102 T${w * 0.75} -121 T${w - m} -52 V0Z`}
            opacity=".13"
          />
          <path
            d={`M${m} 0 V-28 Q${w * 0.2} -105 ${w * 0.38} -67 T${w * 0.7} -77 T${w - m} -22 V0Z`}
            opacity=".21"
          />
          <path
            d={`M${m} 0 Q${w * 0.2} -59 ${w * 0.44} -18 T${w - m} -9 V14 H${m}Z`}
            opacity=".3"
          />
        </g>
      );
      ornaments = (
        <>
          {topAccent && moon(w * 0.7, m + 118, 38)}
          <g transform={`translate(${w * 0.18} ${bottom - 26})`}>
            <path
              d="M0 0 V-69 M-24 -17 L0 -50 24 -17 M-18 -36 L0 -66 18 -36"
              strokeWidth={2 * d.thickness}
              opacity=".75"
            />
          </g>
          <path
            d={`M${m + 160} ${bottom - 84} H${w - m - 90} M${m + 70} ${bottom - 112} H${w * 0.45}`}
            stroke={paper}
            strokeWidth="7"
            opacity=".7"
          />
        </>
      );
      break;
    case "contours":
      pattern = (
        <g mask={`url(#${id}-landscape-border)`}>
          <defs>
            <mask id={`${id}-landscape-border`}>
              <rect width={w} height={h} fill="white" />
              <rect
                x={m + 160}
                y={m + 160}
                width={w - 2 * m - 320}
                height={h - 2 * m - 320}
                fill="black"
              />
            </mask>
          </defs>
          <Contour x={m + 45} y={m + 55} count={n + 4} scale={s} phase={0.8} />
          <Contour
            x={w - m - 50}
            y={h - m - 60}
            count={n + 5}
            scale={s}
            phase={2.1}
          />
        </g>
      );
      frame = (
        <>
          <rect
            x={m + 16}
            y={m + 16}
            width={w - 2 * m - 32}
            height={h - 2 * m - 32}
            opacity=".4"
          />
          <path
            d={`M${w - m - 86} ${m + 200} Q${w - m - 150} ${h * 0.4} ${w - m - 87} ${h * 0.6} T${w - m - 100} ${h - m - 190}`}
            strokeDasharray="4 11"
            stroke={detail}
            opacity=".65"
          />
        </>
      );
      ornaments = (
        <>
          <g
            transform={`translate(${d.decoration === "bottom" ? w - m - 95 : m + 95} ${d.decoration === "bottom" ? h - m - 100 : m + 100})`}
            stroke={detail}
          >
            <circle r="31" fill={paper} />
            <path d="M0 -22 L9 12 0 6 -9 12Z" fill={detail} fillOpacity=".13" />
            <path d="M0 -43 v7 M0 36 v7 M-43 0 h7 M36 0 h7" />
          </g>
          <g transform={`translate(${w / 2} ${bottom - 54})`} stroke={detail}>
            <path d="M-30 12 L0 -34 30 12Z M-13 -13 l13 7 9 -13" />
            <path d="M-68 26 H68" opacity=".5" />
          </g>
        </>
      );
      break;
    default:
      return null;
  }
  return { frame, pattern, ornaments };
}
