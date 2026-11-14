import type { ReactNode } from "react";
import type { Design } from "./model";

const poetic = [
  "blueflower",
  "homeland",
  "threshold",
  "innernight",
  "waiting",
  "lastvoice",
];

export function poeticFrames(
  d: Design,
  w: number,
  h: number,
): { frame: ReactNode; pattern: ReactNode; ornaments: ReactNode } | null {
  if (!poetic.includes(d.template)) return null;
  const m = d.margin + 18,
    cx = w / 2;
  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  // Keep motifs inside the reserved margins, even at maximum scale.
  const scale = 0.65 + d.patternScale * 0.25;
  const count = Math.max(2, Math.round(7 * d.density));
  const detail = d.palette.detail;
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;

  if (d.template === "blueflower") {
    frame = (
      <path
        d={`M${m} ${m + 100} V${h - m} H${w - m} V${m + 100} M${m} ${m + 25} V${m} H${cx - 100} M${cx + 100} ${m} H${w - m} V${m + 25}`}
        opacity=".55"
      />
    );
    pattern = (
      <>
        {Array.from({ length: count }, (_, i) => (
          <g key={i} opacity={0.18 + (i % 3) * 0.13}>
            {top && (
              <path
                d={`M${m + 40 + (i * (w - 2 * m - 80)) / (count - 1)} ${m + 50 + (i % 3) * 18} v8 m-4 -4 h8`}
              />
            )}
            {bottom && (
              <circle
                cx={m + 25 + (i * (w - 2 * m - 50)) / (count - 1)}
                cy={h - m - 28}
                r="1.8"
                fill="currentColor"
              />
            )}
          </g>
        ))}
      </>
    );
    ornaments = (
      <>
        {top && (
          <g
            transform={`translate(${cx} ${m + 45}) scale(${scale})`}
            stroke={detail}
          >
            <path
              d="M18 -30 A34 34 0 1 0 18 30 A28 28 0 0 1 18 -30Z"
              fill={detail}
              fillOpacity=".16"
            />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 72}) scale(${scale})`}>
            <path d="M0 35 Q-6 9 0 -9 M-2 26 Q-48 30 -55 4 Q-20 0 -2 26 M0 34 Q40 35 49 15 Q20 8 0 34" />
            {[0, 72, 144, 216, 288].map((a) => (
              <path
                key={a}
                transform={`translate(0 -24) rotate(${a})`}
                d="M0 0 C-48 -20 -26 -70 0 -49 C26 -70 48 -20 0 0Z"
                fill="currentColor"
                fillOpacity=".14"
              />
            ))}
            <circle cy="-24" r="7" fill={detail} stroke="none" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "homeland") {
    frame = (
      <path
        d={`M${m} ${m + 100} V${m} H${w - m} V${m + 100} M${m} ${h - m - 140} V${h - m} H${w - m} V${h - m - 140}`}
        opacity=".5"
      />
    );
    pattern = (
      <>
        {Array.from({ length: count }, (_, i) => (
          <g key={i} opacity=".18">
            {top && (
              <path d={`M${m + 35} ${m + 24 + i * 5} H${cx - 100 - i * 8}`} />
            )}
            {bottom && (
              <path
                d={`M${cx + 90 + i * 5} ${h - m - 35 - i * 7} H${w - m - 30}`}
              />
            )}
          </g>
        ))}
      </>
    );
    ornaments = (
      <>
        {top && (
          <circle
            cx={cx}
            cy={m + 65}
            r={29 * scale}
            stroke={detail}
            fill={detail}
            fillOpacity=".16"
          />
        )}
        {bottom && (
          <g transform={`translate(0 ${h - m})`}>
            <path
              d={`M${m + 12} -45 Q${w * 0.23} -170 ${cx} -80 Q${w * 0.75} -155 ${w - m - 12} -70 V-12 H${m + 12}Z`}
              fill="currentColor"
              fillOpacity=".09"
            />
            <path
              d={`M${m + 15} -22 Q${w * 0.28} -102 ${cx} -70 M${cx + 10} -72 Q${w * 0.76} -120 ${w - m - 15} -32`}
            />
            <path
              d={`M${cx} -78 C${cx - 100} -55 ${cx + 120} -38 ${cx - 50} -6 M${cx + 9} -76 C${cx - 60} -55 ${cx + 180} -35 ${cx + 25} -6`}
              stroke={detail}
              strokeWidth={2 * d.thickness}
            />
          </g>
        )}
      </>
    );
  }
  if (d.template === "threshold") {
    frame = (
      <>
        <path
          d={`M${m} ${h - m} V${m + 115} Q${m} ${m} ${m + 115} ${m} H${w - m - 115} Q${w - m} ${m} ${w - m} ${m + 115} V${h - m}`}
        />
        <path
          d={`M${m + 14} ${h - m - 25} V${m + 115} Q${m + 14} ${m + 14} ${m + 115} ${m + 14} H${w - m - 115} Q${w - m - 14} ${m + 14} ${w - m - 14} ${m + 115} V${h - m - 25}`}
          opacity=".35"
        />
      </>
    );
    pattern = (
      <>
        {top &&
          Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={`M${cx - 75 - i * 7} ${m + 127} v-20 a${75 + i * 7} ${75 + i * 7} 0 0 1 ${150 + i * 14} 0 v20`}
              opacity={0.26 - i * 0.009}
            />
          ))}
      </>
    );
    ornaments = (
      <g stroke={detail}>
        {top && (
          <path
            d={`M${cx} ${m + 75} l9 16 -9 16 -9 -16Z`}
            fill={detail}
            fillOpacity=".35"
          />
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 55}) scale(${scale})`}>
            <path d="M-110 30 H110 M-75 16 H75 M-40 2 H40 M0 -25 V-6" />
            <circle cy="-40" r="4" fill={detail} />
          </g>
        )}
      </g>
    );
  }
  if (d.template === "innernight") {
    frame = (
      <path
        d={`M${m + 35} ${m} H${m} V${h - m} H${m + 35} M${w - m - 35} ${m} H${w - m} V${h - m} H${w - m - 35}`}
        opacity=".5"
      />
    );
    pattern = (
      <>
        {top && (
          <g
            transform={`translate(${cx} ${m + 85}) scale(${scale})`}
            stroke={detail}
            opacity=".45"
          >
            {Array.from({ length: count * 4 }, (_, i) => (
              <path
                key={i}
                d={`M0 -65 v-${i % 3 === 0 ? 20 : 9}`}
                transform={`rotate(${(i * 360) / (count * 4)})`}
              />
            ))}
          </g>
        )}
      </>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 85}) scale(${scale})`}>
            <circle r="48" stroke={detail} />
            <path
              d="M0 -48 A48 48 0 0 1 0 48 A33 48 0 0 0 0 -48"
              fill={detail}
              fillOpacity=".5"
              stroke="none"
            />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 60})`} stroke={detail}>
            <path d="M-90 0 H-22 M22 0 H90 M0 -16 V16" />
            <circle r="7" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "waiting") {
    frame = (
      <path
        d={`M${m} ${h - m} H${w - m} M${m} ${m} h30 M${w - m} ${m} h-30`}
        opacity=".5"
      />
    );
    pattern = (
      <>
        {bottom &&
          Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={`M${m + 35 + i * 21} ${h - m - 14 + (i % 2) * 4} h${8 + (i % 4)}`}
              opacity=".25"
            />
          ))}
      </>
    );
    ornaments = (
      <>
        {top && (
          <circle cx={w - m - 90} cy={m + 70} r={17 * scale} stroke={detail} />
        )}
        {bottom && (
          <g transform={`translate(${m + 115} ${h - m - 10}) scale(${scale})`}>
            <path
              d="M-9 0 Q5 -65 -3 -142 M0 -65 L-28 -100 -33 -128 M-1 -96 L25 -122 31 -155 M-3 -142 L-14 -164 M25 -122 L47 -132"
              strokeWidth={2.4 * d.thickness}
            />
            <path d="M-35 0 Q0 -5 38 0" opacity=".4" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "lastvoice") {
    frame = (
      <path
        d={`M${m + 30} ${m} H${cx - 65} M${cx + 90} ${m} H${w - m - 30} M${m} ${m + 30} V${m + 95} M${w - m} ${h - m - 95} V${h - m - 30}`}
        opacity=".5"
      />
    );
    pattern = (
      <>
        {bottom &&
          Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={`M${cx - 45} ${h - m - 80 + i * 4} h${90 - i * 4}`}
              opacity={0.35 / (i + 1)}
            />
          ))}
      </>
    );
    ornaments = (
      <g stroke={detail}>
        {top && (
          <path
            d={`M${cx - 6} ${m + 55} v${27 * scale} m12 -27 v${27 * scale}`}
          />
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 32})`}>
            <circle cx="-14" r="2" fill={detail} />
            <circle r="2" fill={detail} opacity=".6" />
            <circle cx="14" r="2" fill={detail} opacity=".25" />
          </g>
        )}
      </g>
    );
  }
  return { frame, pattern, ornaments };
}
