import type { ReactNode } from "react";
import type { Design } from "./model";

const literary = [
  "renaissance",
  "salon",
  "encyclopedia",
  "walking",
  "fieldnotes",
  "woodland",
];
function Sprig() {
  return (
    <g>
      <path d="M0 0 Q-24 -70 0 -155" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${-10 + i * 2} ${-20 - i * 25})`}>
          <path
            d="M0 0 Q-45 -4 -40 -30 Q-12 -32 0 0 M0 -8 Q30 -44 38 -36 Q38 -13 0 -8"
            fill="currentColor"
            fillOpacity=".13"
          />
        </g>
      ))}
    </g>
  );
}
export function literaryFrames(
  d: Design,
  w: number,
  h: number,
): { frame: ReactNode; pattern: ReactNode; ornaments: ReactNode } | null {
  if (!literary.includes(d.template)) return null;
  const m = d.margin + 18,
    cx = w / 2;
  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  const scale = d.patternScale;
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;
  if (d.template === "renaissance") {
    frame = (
      <>
        {[0, 9, 36].map((n, i) => (
          <rect
            key={n}
            x={m + n}
            y={m + n}
            width={w - 2 * (m + n)}
            height={h - 2 * (m + n)}
            strokeWidth={i === 1 ? 4 * d.thickness : d.thickness}
          />
        ))}
      </>
    );
    ornaments = (
      <>
        {[...(top ? [m + 91] : []), ...(bottom ? [h - m - 91] : [])].map(
          (y) => (
            <g key={y} transform={`translate(${cx} ${y}) scale(${scale})`}>
              <path d="M-160 0 H-40 M40 0 H160 M0 -22 L22 0 0 22 -22 0Z" />
              <path d="M-28 0 Q-65 -35 -90 0 Q-65 35 -28 0 M28 0 Q65 -35 90 0 Q65 35 28 0" />
              <circle r="5" fill="currentColor" />
            </g>
          ),
        )}
      </>
    );
    pattern = (
      <>
        {Array.from({ length: Math.round(12 * d.density) }, (_, i) => (
          <path
            key={i}
            d={`M${m + 18} ${m + 60 + (i * (h - 2 * m - 120)) / (12 * d.density)} l5 7 -5 7 -5 -7Z`}
            opacity=".4"
          />
        ))}
      </>
    );
  } else if (d.template === "salon") {
    frame = (
      <>
        <path
          d={`M${m + 65} ${m} H${w - m - 65} Q${w - m - 65} ${m + 65} ${w - m} ${m + 65} V${h - m - 65} Q${w - m - 65} ${h - m - 65} ${w - m - 65} ${h - m} H${m + 65} Q${m + 65} ${h - m - 65} ${m} ${h - m - 65} V${m + 65} Q${m + 65} ${m + 65} ${m + 65} ${m}Z`}
        />
        <rect
          x={m + 20}
          y={m + 20}
          width={w - 2 * m - 40}
          height={h - 2 * m - 40}
          opacity=".35"
        />
      </>
    );
    ornaments = (
      <>
        {[...(top ? [m + 100] : []), ...(bottom ? [h - m - 100] : [])].map(
          (y, i) => (
            <g
              key={y}
              transform={`translate(${cx} ${y}) rotate(${i * 180}) scale(${scale})`}
            >
              <path d="M0 18 C-40 -45 -128 -35 -116 0 C-104 27 -65 12 -85 -4 M0 18 C40 -45 128 -35 116 0 C104 27 65 12 85 -4 M0 18 Q-24 -22 0 -46 Q24 -22 0 18 M-160 15 Q-90 32 -18 18 M160 15 Q90 32 18 18" />
              <circle cy="27" r="4" fill={d.palette.detail} />
            </g>
          ),
        )}
      </>
    );
  } else if (d.template === "encyclopedia") {
    frame = (
      <>
        <path
          d={`M${m} ${m + 45} V${m} H${w - m} V${m + 45} M${m} ${h - m - 45} V${h - m} H${w - m} V${h - m - 45}`}
        />
        <path
          d={`M${m + 12} ${m + 65} V${h - m - 65} M${w - m - 12} ${m + 65} V${h - m - 65}`}
          opacity=".4"
        />
      </>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 90}) scale(${scale})`}>
            <circle r="36" />
            <circle r="29" />
            <path d="M-20 0 H20 M0 -20 V20 M-100 0 H-50 M50 0 H100" />
            <path
              d="M0 -15 L15 0 0 15 -15 0Z"
              fill={d.palette.detail}
              fillOpacity=".3"
            />
          </g>
        )}
        {bottom && (
          <path
            d={`M${cx - 130} ${h - m - 85} H${cx + 130} M${cx - 55} ${h - m - 73} H${cx + 55}`}
          />
        )}
      </>
    );
  } else if (d.template === "walking") {
    frame = (
      <path
        d={`M${m} ${m + 70} V${m} H${m + 70} M${w - m - 70} ${h - m} H${w - m} V${h - m - 70}`}
      />
    );
    ornaments = (
      <>
        {bottom && (
          <g>
            <path
              d={`M${cx - 100} ${h - m - 25} C${cx + 300} ${h - m - 75} ${cx - 240} ${h - m - 120} ${cx + 50} ${h - m - 165}`}
              strokeWidth={2 * d.thickness}
            />
            <path
              d={`M${m + 20} ${h - m - 100} Q${w * 0.25} ${h - m - 220} ${cx} ${h - m - 145} T${w - m - 20} ${h - m - 160}`}
              opacity=".4"
            />
          </g>
        )}
        {top && (
          <g transform={`translate(${w - m - 95} ${m + 90}) scale(${scale})`}>
            <circle r="33" />
            <path d="M0 -50 V50 M-50 0 H50 M0 -27 L9 9 0 4 -9 9Z" />
          </g>
        )}
      </>
    );
  } else if (d.template === "fieldnotes") {
    frame = (
      <>
        <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
        <path
          d={`M${m + 18} ${m + 35} H${m + 125} M${m + 18} ${m + 45} H${m + 80}`}
        />
      </>
    );
    ornaments = (
      <>
        {bottom && (
          <g transform={`translate(${m + 95} ${h - m - 45}) scale(${scale})`}>
            <Sprig />
            <path d="M-35 18 H45 M-35 24 H10" />
          </g>
        )}
        {top && (
          <g
            transform={`translate(${w - m - 90} ${m + 45}) rotate(180) scale(${scale})`}
          >
            <Sprig />
          </g>
        )}
      </>
    );
    pattern = (
      <g opacity=".28">
        {Array.from({ length: Math.round(10 * d.density) }, (_, i) => (
          <path
            key={i}
            d={`M${w - m - 20} ${h - m - 30 - i * 12} h${i % 5 === 0 ? -24 : -10}`}
          />
        ))}
      </g>
    );
  } else {
    frame = (
      <rect
        x={m}
        y={m}
        width={w - 2 * m}
        height={h - 2 * m}
        strokeOpacity=".5"
      />
    );
    ornaments = (
      <>
        {top && (
          <circle
            cx={cx}
            cy={m + 85}
            r={32 * scale}
            stroke={d.palette.detail}
          />
        )}{" "}
        {bottom && (
          <g>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g
                key={i}
                transform={`translate(${m + 55 + (i * (w - 2 * m - 110)) / 6} ${h - m - 20}) scale(${0.6 + (i % 3) * 0.16})`}
              >
                <path
                  d="M0 0 V-180 M0 -190 L-35 -130 H-20 L-52 -85 H-32 L-70 -32 H70 L32 -85 H52 L20 -130 H35Z"
                  fill="currentColor"
                  fillOpacity=".16"
                />
              </g>
            ))}
          </g>
        )}
      </>
    );
  }
  return { frame, pattern, ornaments };
}
