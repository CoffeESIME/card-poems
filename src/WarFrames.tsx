import type { ReactNode } from "react";
import type { Design } from "./model";

// A dry edge, a run of ink and a few separate drops, cut like a printing block.
function Bloodstain({ color }: { color: string }) {
  return (
    <g fill={color} stroke="none">
      <path d="M-49 -7 l14 3 6 -8 10 5 6 -9 8 9 19 -5 -3 8 26 -3 -10 6 17 2 -24 5 -8 -3 -5 6 -1 26 q-3 7 -4 -1 l-2 -23 -8 -4 -9 8 -4 -6 -18 2 8 -7Z" />
      <ellipse cx="-53" cy="-12" rx="4" ry="2" />
      <circle cx="47" cy="-5" r="4" />
      <circle cx="55" cy="-12" r="2" />
      <ellipse cx="3" cy="48" rx="2.3" ry="3.5" />
    </g>
  );
}

export function warFrames(d: Design, w: number, h: number) {
  const m = d.margin + 12,
    right = w - m,
    base = h - m;
  const { paper, detail, ornament } = d.palette;
  const scale = 0.7 + d.patternScale * 0.3;
  let frame: ReactNode, grain: ReactNode, upper: ReactNode, lower: ReactNode;

  switch (d.template) {
    case "sewnletter":
      frame = (
        <g>
          <path
            d={`M${m + 11} ${m} l-11 51 V${base - 104} l10 9 -8 26 6 60 M${right} ${m + 16} V${base - 17}`}
          />
          <path
            d={`M${m + 13} ${m + 51} V${base - 117} m1 54 v54 M${right - 10} ${m + 24} V${base - 21}`}
            strokeDasharray="10 7"
          />
        </g>
      );
      grain = <path d="M0 2 l12 -8 m-6 13 l13 -9" />;
      upper = (
        <g transform="scale(1.22) rotate(-6)">
          <path
            d="M-130 24 l17 -46 40 4 -4 33Z"
            fill={ornament}
            fillOpacity=".22"
          />
          <path d="M-84 16 l4 -56 112 8 6 58Z" fill={paper} />
          <path d="M-80 -40 l51 37 61 -29 M-65 -36 l40 26" />
          <path d="M-121 9 l196 4 -13 28 -96 18 -84 -24Z" fill={ornament} />
          <path
            d="M-113 19 l79 30 89 -16 10 -12"
            stroke={paper}
            strokeDasharray="6 4"
          />
          <g transform="translate(38 14) rotate(7)">
            <Bloodstain color={detail} />
          </g>
        </g>
      );
      lower = (
        <g>
          <path
            d="M-164 1 q58 -17 98 -2 l24 -7 20 9 18 -8 14 8 16 -7 18 6 q45 -13 120 3 l-113 1 -25 9 -26 -6 -20 9 -43 -9Z"
            fill={ornament}
          />
          {[-48, -25, -2, 21, 44].map((x, i) => (
            <path
              key={x}
              d={`M${x - 5} -12 q-3 13 13 ${19 + (i % 2) * 4}`}
              stroke={detail}
              strokeWidth={3 * d.thickness}
            />
          ))}
          <path d="M51 10 q18 30 51 14 t53 2" stroke={detail} />
        </g>
      );
      break;
    case "ravinerifle":
      frame = (
        <g>
          <path
            d={`M${m + 138} ${m} H${m} v97 l4 -13 2 -76Z M${right - 138} ${base} H${right} v-97 l-4 14 -3 75Z`}
            fill={ornament}
          />
          <path
            d={`M${right - 116} ${m + 3} h115 v72 M${m + 2} ${base - 75} v73 h116`}
          />
        </g>
      );
      grain = (
        <path
          d="M0 5 l20 -10 -10 9 15 -5 -21 13Z"
          fill={ornament}
          stroke="none"
        />
      );
      upper = (
        <g>
          <circle cx="44" cy="-4" r="43" fill={detail} stroke="none" />
          <path
            d="M-245 29 l68 -19 39 -21 25 10 42 -20 46 32 40 -11 27 8 48 -26 33 19 37 -8 79 36 -85 -13 -64 6 -66 -4 -37 8 -67 -12 -49 6Z"
            fill={ornament}
          />
          <path
            d="M-154 13 l16 -11 -5 8 m38 -5 29 -14 -12 12 M105 9 l14 -11 10 6"
            stroke={paper}
          />
        </g>
      );
      lower = (
        <g>
          <path
            d="M-298 43 l76 -5 41 3 64 -12 73 6 75 -6 42 4 79 -13 74 7 59 -2 -71 18 -96 2 -82 8 -103 -5 -53 5Z"
            fill={detail}
          />
          <g transform="translate(-70 -13) scale(1.28) rotate(-9)">
            <path
              d="M-161 5 l51 -9 34 5 40 -8 91 -1 2 -4 91 -1 v6 l-89 4 -5 5 -113 12 -18 -1 -17 10 -52 13Z"
              fill={ornament}
            />
            <path d="M-71 8 q10 29 34 -4 M-142 18 l24 -6" />
            <path d="M-101 0 l18 5 -24 5Z" fill={paper} stroke="none" />
          </g>
          <g transform="translate(139 -1) scale(1.29) rotate(17)">
            <path
              d="M-36 -4 C-44 -29 -31 -54 -3 -56 C26 -59 45 -41 40 -15 L32 -2 30 10 21 14 18 32 6 38 -16 33 -21 17 -32 10Z"
              fill={paper}
              strokeWidth={3 * d.thickness}
            />
            <path
              d="M-27 -15 q9 -6 21 3 q1 18 -12 15 -9 -3 -9 -18Z M7 -12 q10 -11 23 -7 q1 18 -12 21 -11 2 -11 -14Z M0 -3 l6 13 -12 -1Z"
              fill={ornament}
            />
            <path
              d="M-18 17 l8 5 7 -4 4 4 4 -5 11 -4 -4 9 -7 3 -5 -2 -6 3 -8 -3Z"
              fill={ornament}
            />
            <path d="M4 -52 l-6 12 8 7 -7 7 M-35 -26 l9 -11 m-7 17 9 -10 m44 33 7 -10" />
          </g>
          <g transform="translate(-111 30) scale(.64)">
            <Bloodstain color={detail} />
          </g>
        </g>
      );
      break;
    case "tinbowl":
      frame = (
        <path
          d={`M${m} ${m + 82} v${h * 0.31} m0 38 V${base - 50} M${right} ${m + 50} V${base - 82}`}
          opacity=".55"
        />
      );
      grain = <path d="M0 0 l15 -3 m-11 9 6 -1" opacity=".65" />;
      upper = (
        <g>
          <path d="M-240 -14 Q-86 28 0 6 T240 -14 M-240 -7 Q-102 17 0 13 T240 -7" />
          {[
            [-158, 4],
            [-73, 14],
            [26, 4],
            [140, -12],
          ].map(([x, y]) => (
            <path
              key={x}
              transform={`translate(${x} ${y})`}
              d="M-11 -14 l8 18 7 -10 8 15 M-6 10 4 -7"
            />
          ))}
          <path
            d="M25 6 q-1 9 -5 15 q-5 10 3 10 q10 -1 4 -14Z"
            fill={detail}
            stroke="none"
          />
        </g>
      );
      lower = (
        <g>
          <path
            d="M-103 -6 Q-93 28 -69 36 l13 -3 7 7 Q-17 53 43 43 Q75 42 103 -6Z"
            fill={ornament}
          />
          <ellipse cy="-6" rx="103" ry="18" fill={paper} />
          <path
            d="M-78 6 Q-43 17 -6 15 M-89 5 l18 20 14 -4 11 13"
            stroke={paper}
          />
          <g transform="translate(65 -16) rotate(-21)">
            <ellipse cx="-24" cy="-2" rx="22" ry="9" fill={ornament} />
            <path d="M-8 -2 l102 -3 q8 3 0 7 L-8 1Z" fill={ornament} />
          </g>
          <path d="M-140 49 l82 -3 m-19 7 162 -3 27 -4" opacity=".6" />
        </g>
      );
      break;
    case "redactedfile":
      frame = (
        <g>
          <path
            d={`M${m} ${base} V${m + 22} h28 l13 -18 h128 l16 18 H${right} V${base}Z`}
          />
          <path
            d={`M${m + 11} ${m + 37} H${right - 12} M${m + 11} ${base - 11} H${right - 12}`}
            opacity=".55"
          />
        </g>
      );
      grain = (
        <g>
          <circle r="4" fill={ornament} />
          <path d="M9 0 h11" opacity=".55" />
        </g>
      );
      upper = (
        <g transform="scale(1.17) rotate(-3)">
          <path
            d="M-130 -18 h109 v11 h-109Z M-8 -18 h91 v11 H-8Z M-130 1 H24 v13 h-154Z"
            fill={ornament}
            stroke="none"
          />
          <path d="M-129 24 h173 m-174 7 h115" opacity=".6" />
          <g
            transform="translate(115 -1) rotate(12)"
            fill={detail}
            stroke="none"
          >
            <path d="M-26 4 q2 -13 13 -13 l26 -2 q16 2 15 15 l-6 21 -6 4 -1 24 q-3 4 -4 -1 l-2 -17 -12 2 -4 -5 -12 -1 -18 -20 q-5 -12 3 -10Z" />
            {[
              [-22, -33, 5, 17, -15],
              [-8, -41, 5, 20, -5],
              [7, -43, 5, 22, 3],
              [21, -36, 5, 15, 13],
            ].map(([x, y, rx, ry, a]) => (
              <ellipse
                key={x}
                transform={`translate(${x} ${y}) rotate(${a})`}
                rx={rx}
                ry={ry}
              />
            ))}
            <path
              d="M-12 8 q12 1 23 -8 M-7 14 l11 4"
              fill="none"
              stroke={paper}
            />
          </g>
        </g>
      );
      lower = (
        <g transform="rotate(-7)">
          <path d="M-103 -12 h120 m-120 11 h91 m-91 11 h116" opacity=".6" />
          <circle
            cx="57"
            r="33"
            stroke={detail}
            strokeWidth={4 * d.thickness}
            strokeDasharray="103 10 72 23"
          />
          <circle cx="57" r="26" stroke={detail} />
          <path d="M36 0 h42 m-34 7 h26" stroke={detail} />
        </g>
      );
      break;
    default:
      return null;
  }

  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  const count = Math.max(3, Math.round(10 * d.density));
  const pattern = Array.from({ length: count }, (_, i) => {
    const offset = m + 106 + (i * (h / 2 - m - 142)) / count;
    return (
      <g key={i} opacity=".53">
        {top && (
          <g transform={`translate(${m + 18} ${offset}) scale(${scale})`}>
            {grain}
          </g>
        )}
        {bottom && (
          <g
            transform={`translate(${right - 18} ${h - offset}) rotate(180) scale(${scale})`}
          >
            {grain}
          </g>
        )}
      </g>
    );
  });
  const ornaments = (
    <>
      {top && (
        <g transform={`translate(${w / 2} ${m + 81}) scale(${scale})`}>
          {upper}
        </g>
      )}
      {bottom && (
        <g transform={`translate(${w / 2} ${base - 88}) scale(${scale})`}>
          {lower}
        </g>
      )}
    </>
  );
  return { frame, pattern, ornaments };
}
