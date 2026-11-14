import type { ReactNode } from "react";
import type { Design } from "./model";

const ids = [
  "epitaph",
  "obituary",
  "bureaucracy",
  "classified",
  "littlefarce",
  "falseglory",
];

export function satiricalFrames(d: Design, w: number, h: number) {
  if (!ids.includes(d.template)) return null;
  const m = d.margin + 18,
    cx = w / 2;
  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  const scale = 0.7 + d.patternScale * 0.2;
  const count = Math.max(2, Math.round(8 * d.density));
  const detail = d.palette.detail;
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;
  if (d.template === "epitaph") {
    frame = (
      <>
        <path
          d={`M${m + 20} ${h - m - 20} V${m + 135} Q${m + 20} ${m} ${cx} ${m} Q${w - m - 20} ${m} ${w - m - 20} ${m + 135} V${h - m - 20}Z`}
          strokeWidth={3 * d.thickness}
        />
        <path
          d={`M${m + 35} ${h - m - 35} V${m + 140} Q${m + 35} ${m + 17} ${cx} ${m + 17} Q${w - m - 35} ${m + 17} ${w - m - 35} ${m + 140} V${h - m - 35}Z`}
          opacity=".4"
        />
      </>
    );
    pattern = (
      <g opacity=".35">
        {top && (
          <path
            d={`M${cx + 145} ${m + 25} l-14 23 18 15 -26 32 m26 -32 20 8`}
          />
        )}
        {bottom &&
          Array.from({ length: count }, (_, i) => (
            <path
              key={i}
              d={`M${m + 65 + (i * (w - 2 * m - 130)) / (count - 1)} ${h - m - 48} l9 -7`}
            />
          ))}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 100}) scale(${scale})`}>
            <path d="M-60 0 H-18 M18 0 H60 M0 -20 V20 M-12 -5 H12" />
            <circle r="33" opacity=".25" />
          </g>
        )}
        {bottom && (
          <g
            transform={`translate(${cx} ${h - m - 100}) scale(${scale})`}
            stroke={detail}
          >
            <path d="M-70 35 Q-15 20 10 -20 Q28 -40 48 -16 M-25 19 Q-55 -18 -70 -8 Q-60 20 -25 19 M0 -1 Q25 5 38 -8" />
            <path
              d="M48 -16 Q20 -12 32 8 L48 2 60 12 Q76 -6 48 -16Z"
              fill={detail}
              fillOpacity=".18"
            />
          </g>
        )}
      </>
    );
  }
  if (d.template === "obituary") {
    frame = (
      <>
        <rect
          x={m}
          y={m}
          width={w - 2 * m}
          height={h - 2 * m}
          strokeWidth={12 * d.thickness}
        />
        <rect
          x={m + 22}
          y={m + 22}
          width={w - 2 * m - 44}
          height={h - 2 * m - 44}
        />
      </>
    );
    pattern = (
      <g opacity=".3">
        {Array.from({ length: count }, (_, i) => {
          const x = m + 48 + (i * (w - 2 * m - 96)) / (count - 1);
          return (
            <g key={i}>
              {top && <path d={`M${x} ${m + 35} v8`} />}
              {bottom && <path d={`M${x} ${h - m - 35} v-8`} />}
            </g>
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g
            transform={`translate(${cx} ${m + 90}) scale(${scale})`}
            fill="currentColor"
          >
            <path d="M0 0 C-70 -55 -85 30 0 0 C70 -55 85 30 0 0 M-8 0 L-32 52 -9 42 0 54 9 12 M8 0 L32 52 9 42 0 54 -9 12" />
            <circle r="7" />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 85}) scale(${scale})`}>
            <path d="M-110 0 H-30 M30 0 H110 M0 -12 L12 0 0 12 -12 0Z" />
            <path d="M-80 10 H-40 M40 10 H80" opacity=".45" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "bureaucracy") {
    frame = (
      <>
        <path
          d={`M${m} ${h - m} V${m + 28} H${m + 38} V${m} H${m + 215} l28 28 H${w - m} V${h - m}Z`}
        />
        <path
          d={`M${m + 20} ${m + 155} H${w - m - 20} M${m + 20} ${h - m - 135} H${w - m - 20}`}
          opacity=".4"
        />
      </>
    );
    pattern = (
      <g opacity=".35">
        {Array.from({ length: count }, (_, i) => {
          const x = m + 35 + (i * (w - 2 * m - 90)) / (count - 1);
          return (
            <g key={i}>
              {top && <path d={`M${x} ${m + 65} h15 v15 h-15Z`} />}
              {bottom && <path d={`M${x} ${h - m - 35} v-8`} />}
            </g>
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${m + 80} ${m + 116})`}>
            <path d="M0 0 H110 M0 12 H65" />
            <path d="M135 -8 h28 v28 h-28Z m5 14 6 6 13 -16" stroke={detail} />
          </g>
        )}
        {bottom && (
          <g
            transform={`translate(${w - m - 130} ${h - m - 83}) rotate(-12) scale(${scale})`}
            stroke={detail}
          >
            <rect
              x="-80"
              y="-32"
              width="160"
              height="64"
              strokeWidth={3 * d.thickness}
            />
            <rect x="-72" y="-24" width="144" height="48" />
            <path
              d="M-48 0 H48 M-30 -10 H30 M-30 10 H30"
              strokeDasharray="9 6"
            />
          </g>
        )}
      </>
    );
  }
  if (d.template === "classified") {
    frame = (
      <>
        <rect
          x={m}
          y={m}
          width={w - 2 * m}
          height={h - 2 * m}
          strokeDasharray="8 7"
        />
        <path
          d={`M${m + 20} ${m + 140} H${w - m - 20} M${m + 20} ${m + 148} H${w - m - 20} M${m + 20} ${h - m - 112} H${w - m - 20}`}
        />
      </>
    );
    pattern = (
      <g opacity=".45">
        {Array.from({ length: count }, (_, i) => {
          const x = m + 30 + (i * (w - 2 * m - 60)) / (count - 1);
          return (
            <g key={i}>
              {bottom && <path d={`M${x} ${h - m - 112} V${h - m - 18}`} />}
              {top && <path d={`M${x} ${m + 24} h6`} />}
            </g>
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g
            transform={`translate(${cx} ${m + 85}) scale(${scale})`}
            stroke={detail}
          >
            <path d="M-100 0 H-40 M40 0 H100" />
            <path d="M0 -35 L30 25 H-30Z" />
            <path d="M0 -15 V5" strokeWidth={4 * d.thickness} />
            <circle cy="15" r="2" fill={detail} />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${m + 65} ${h - m - 65}) scale(${scale})`}>
            <circle cx="-12" cy="-12" r="9" />
            <circle cx="-12" cy="12" r="9" />
            <path d="M-5 -5 L30 20 M-5 5 L30 -20" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "littlefarce") {
    frame = (
      <>
        <path
          d={`M${m + 15} ${h - m - 25} V${m} H${w - m - 15} V${h - m - 25}`}
        />
        <path
          d={`M${m} ${h - m - 12} H${w - m} M${m + 25} ${h - m} H${w - m - 25}`}
          strokeWidth={3 * d.thickness}
        />
      </>
    );
    pattern = (
      <g opacity=".25">
        {top &&
          Array.from({ length: count }, (_, i) => {
            const x = m + 35 + (i * (w - 2 * m - 70)) / (count - 1);
            return <path key={i} d={`M${x} ${m + 12} q-10 25 0 42`} />;
          })}
        {bottom && <path d={`M${m + 30} ${h - m - 35} H${w - m - 30}`} />}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <>
            <path
              d={`M${m + 18} ${m + 18} Q${cx} ${m + 165} ${w - m - 18} ${m + 18} M${m + 18} ${m + 18} Q${m + 100} ${m + 95} ${m + 32} ${m + 175} M${w - m - 18} ${m + 18} Q${w - m - 100} ${m + 95} ${w - m - 32} ${m + 175}`}
              fill="currentColor"
              fillOpacity=".12"
            />
            <path
              d={`M${m + 25} ${m + 158} l42 8 M${w - m - 25} ${m + 158} l-42 8`}
              stroke={detail}
            />
          </>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 105}) scale(${scale})`}>
            {[-1, 1].map((side) => (
              <g
                key={side}
                transform={`translate(${side * 42} 0) rotate(${side * 12})`}
              >
                <path
                  d="M-32 -35 Q0 -45 32 -35 V0 Q25 43 0 50 Q-25 43 -32 0Z"
                  fill={d.palette.paper}
                />
                <path d="M-20 -8 h10 M10 -8 h10" />
                <path
                  d={side === -1 ? "M-15 14 Q0 35 15 14" : "M-15 28 Q0 7 15 28"}
                  stroke={detail}
                />
              </g>
            ))}
          </g>
        )}
      </>
    );
  }
  if (d.template === "falseglory") {
    frame = (
      <>
        <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
        <path
          d={`M${m + 12} ${m + 100} V${m + 12} H${cx - 150} M${cx + 150} ${m + 12} H${w - m - 12} V${m + 100} M${m + 12} ${h - m - 100} V${h - m - 12} H${cx - 70} M${cx + 70} ${h - m - 12} H${w - m - 12} V${h - m - 100}`}
          opacity=".45"
        />
      </>
    );
    pattern = (
      <g stroke={detail} opacity=".4">
        {Array.from({ length: count }, (_, i) => {
          const x = m + 45 + (i * (w - 2 * m - 90)) / (count - 1);
          return (
            <g key={i}>
              {top && <path d={`M${x} ${m + 30} l4 4 -4 4 -4 -4Z`} />}
              {bottom && <path d={`M${x} ${h - m - 30} l4 -4 -4 -4 -4 4Z`} />}
            </g>
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g
            transform={`translate(${cx} ${m + 100}) rotate(-9) scale(${scale})`}
          >
            <path
              d="M-55 25 L-70 -25 -25 0 0 -45 25 0 70 -25 55 25Z M-55 35 H55"
              fill={detail}
              fillOpacity=".15"
            />
            {[-70, 0, 70].map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={i === 1 ? -48 : -28}
                r="5"
                stroke={detail}
              />
            ))}
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 100}) scale(${scale})`}>
            {[-1, 1].map((side) => (
              <g key={side} transform={`scale(${side} 1)`}>
                <path d="M0 35 Q90 35 100 -60" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    transform={`translate(${35 + i * 13} ${25 - i * 17}) rotate(${-25 - i * 10})`}
                    d="M0 0 Q-5 -35 15 -35 Q25 -10 0 0 M0 0 Q25 15 38 -5 Q20 -18 0 0"
                    fill="currentColor"
                    fillOpacity=".16"
                  />
                ))}
              </g>
            ))}
            <path d="M-20 40 L-30 60 0 52 30 60 20 40" stroke={detail} />
          </g>
        )}
      </>
    );
  }
  return { frame, pattern, ornaments };
}
