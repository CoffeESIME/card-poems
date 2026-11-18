import type { ReactNode } from "react";
import type { Design } from "./model";
import { darkTemplates } from "./darkTemplates";

export function darkFrames(d: Design, w: number, h: number) {
  if (!darkTemplates.some((t) => t.id === d.template)) return null;
  const m = d.margin + 18,
    cx = w / 2;
  const top = d.decoration !== "bottom",
    bottom = d.decoration !== "top";
  const scale = 0.7 + d.patternScale * 0.2;
  const count = Math.max(3, Math.round(9 * d.density));
  const detail = d.palette.detail;
  let frame: ReactNode = null,
    pattern: ReactNode = null,
    ornaments: ReactNode = null;
  if (d.template === "fleshandthorn") {
    frame = (
      <>
        <path
          d={`M${m + 12} ${m + 20} Q${m - 10} ${h * 0.3} ${m + 20} ${h * 0.5} T${m + 8} ${h - m - 20} M${w - m - 12} ${m + 20} Q${w - m + 10} ${h * 0.3} ${w - m - 20} ${h * 0.5} T${w - m - 8} ${h - m - 20}`}
        />
        <path
          d={`M${m + 22} ${m + 60} V${h - m - 60} M${w - m - 22} ${m + 60} V${h - m - 60}`}
          opacity=".2"
        />
      </>
    );
    pattern = (
      <g stroke={detail}>
        {Array.from({ length: count }, (_, i) => {
          const y = m + 65 + (i * (h - 2 * m - 130)) / (count - 1);
          return (
            <g key={i} opacity=".65">
              {(y < h / 2 ? top : bottom) && (
                <>
                  <path
                    d={`M${m + 14} ${y} l30 -17 -22 27 M${w - m - 14} ${y} l-30 17 22 -27`}
                  />
                </>
              )}
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
            stroke={detail}
          >
            <path
              d="M-140 -8 Q-50 10 0 -3 Q55 -15 140 4 L70 10 0 5 -70 13Z"
              fill={detail}
              fillOpacity=".3"
            />
              {[-90, -45, 0, 45, 90].map((x) => (
              <path
                key={x}
                d={`M${x - 5} -17 q18 15 10 37`}
                strokeWidth={2 * d.thickness}
              />
            ))}
          </g>
        )}
        {bottom && (
          <g
            transform={`translate(${cx} ${h - m - 75}) scale(${scale})`}
            stroke={detail}
          >
            <path
              d="M0 -38 C-5 -8 -22 3 -18 20 C-13 43 18 43 18 20 C18 3 5 -8 0 -38Z"
              fill={detail}
              fillOpacity=".35"
            />
            <path d="M-100 25 h50 M50 25 h100" opacity=".45" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "excess") {
    frame = (
      <>
        <path
          d={`M${m + 60} ${m} H${cx - 140} M${cx + 140} ${m} H${w - m - 60} Q${w - m} ${m} ${w - m} ${m + 60} V${h * 0.52 - 20} m0 40 V${h - m - 60} Q${w - m} ${h - m} ${w - m - 60} ${h - m} H${cx + 110} M${cx - 110} ${h - m} H${m + 60} Q${m} ${h - m} ${m} ${h - m - 60} V${m + 60} Q${m} ${m} ${m + 60} ${m}`}
        />
        <path
          d={`M${m + 12} ${m + 100} V${h - m - 90} M${w - m - 12} ${m + 100} V${h - m - 90}`}
          opacity=".35"
        />
      </>
    );
    pattern = (
      <g opacity=".35">
        {Array.from({ length: count }, (_, i) => (
          <g key={i}>
            {top && <path d={`M${m + 35 + i * 8} ${m + 45} q-15 20 0 35`} />}
            {bottom && (
              <path d={`M${w - m - 35 - i * 8} ${h - m - 45} q15 -20 0 -35`} />
            )}
          </g>
        ))}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 80}) scale(${scale})`}>
            {[-1, 1].map((side) => (
              <g key={side} transform={`scale(${side} 1)`}>
                <path d="M10 38 C65 -25 130 35 150 -8 C165 -45 110 -60 95 -30 C85 -5 125 5 125 -20 M30 20 Q20 -55 60 -50 Q80 -45 65 -20 M10 38 L-2 18 10 3 -4 -15" />
              </g>
            ))}
            <path d="M-4 -15 l10 -12 -7 -14" stroke={detail} />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 80}) scale(${scale})`}>
            <path d="M-16 30 V-25 Q0 -16 16 -25 V30 M-16 -22 Q-5 -20 -8 -2 Q0 9 4 -17 M-55 38 H55 M-35 30 H35 M0 -25 V-40" />
            <path
              d="M0 -43 Q-25 -60 8 -82 Q-6 -60 0 -43Z"
              stroke={detail}
              fill={detail}
              fillOpacity=".3"
            />
          </g>
        )}
      </>
    );
  }
  if (d.template === "anatomy") {
    frame = (
      <path
        d={`M${m + 45} ${m} H${m} V${h - m} H${m + 45} M${w - m - 45} ${m} H${w - m} V${h - m} H${w - m - 45}`}
        opacity=".45"
      />
    );
    pattern = (
      <g opacity=".35">
        {Array.from({ length: count }, (_, i) => {
          const y = m + 35 + (i * (h - 2 * m - 70)) / (count - 1);
          return (
            (y < h / 2 ? top : bottom) && (
              <path
                key={i}
                d={`M${m + 8} ${y} h${i % 3 === 0 ? 24 : 10} M${w - m - 8} ${y} h-${i % 3 === 0 ? 24 : 10}`}
              />
            )
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 100}) scale(${scale})`}>
            <path d="M0 -65 V55 M-13 -63 Q0 -74 13 -63" />
            {[-1, 1].map((side) => (
              <g key={side} transform={`scale(${side} 1)`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M5 ${-45 + i * 17} C${80 - i * 6} ${-85 + i * 21} ${130 - i * 14} ${-5 + i * 16} ${25 - i * 3} ${-2 + i * 14}`}
                  />
                ))}
              </g>
            ))}
            <path d="M-140 25 h35 M105 25 h35" stroke={detail} />
          </g>
        )}
        {bottom && (
          <g transform={`translate(${cx} ${h - m - 80}) scale(${scale})`}>
            <path d="M-110 10 Q-125 -15 -100 -18 Q-85 -20 -80 -5 H65 L82 -12 94 -3 82 10 H-80 Q-105 33 -110 10 M105 -13 l-10 8 9 10 -6 10" />
            <path d="M-55 25 H45" stroke={detail} strokeDasharray="3 6" />
          </g>
        )}
      </>
    );
  }
  if (d.template === "lastsun") {
    frame = (
      <path
        d={`M${m} ${m + 110} V${m} H${cx - 150} M${cx + 150} ${m} H${w - m} V${m + 110} M${m} ${h - m - 100} V${h - m} H${w - m} V${h - m - 100}`}
        opacity=".5"
      />
    );
    pattern = (
      <g stroke={detail} opacity=".6">
        {top && (
          <g transform={`translate(${cx} ${m + 100}) scale(${scale})`}>
            {Array.from({ length: count * 3 }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${(i * 360) / (count * 3)})`}
                d={i % 3 === 0 ? "M0 -65 v-8 m0 -7 v-14" : "M0 -67 v-15"}
              />
            ))}
          </g>
        )}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 100}) scale(${scale})`}>
            <circle r="51" fill={detail} fillOpacity=".15" stroke={detail} />
            <path
              d="M10 -50 A51 51 0 0 1 10 50 A39 51 0 0 0 10 -50Z"
              fill={detail}
              stroke="none"
            />
          </g>
        )}
        {bottom && (
          <g transform={`translate(0 ${h - m})`}>
            <path
              d={`M${m + 15} -80 L${w * 0.25} -60 ${cx - 28} -80 ${cx - 8} -58 ${cx - 30} -38 ${cx + 10} -15 ${cx - 5} 0 M${cx + 35} -75 L${w * 0.75} -90 ${w - m - 15} -65 M${cx + 20} -55 l-10 18 35 25 -15 12`}
              stroke={detail}
            />
            <path
              d={`M${m + 30} -40 H${cx - 110} M${cx + 100} -30 H${w - m - 30}`}
              opacity=".3"
            />
          </g>
        )}
      </>
    );
  }
  if (d.template === "ashcity") {
    frame = (
      <path
        d={`M${m} ${m + 65} V${m} H${m + 100} M${w - m - 100} ${m} H${w - m} V${m + 65} M${m} ${h - m} H${w - m}`}
      />
    );
    pattern = (
      <g fill="currentColor" stroke="none">
        {Array.from({ length: count * 2 }, (_, i) => {
          const x = m + 30 + (i * (w - 2 * m - 60)) / (count * 2 - 1);
          return (
            <g key={i} opacity={0.15 + (i % 4) * 0.08}>
              {top && (
                <path d={`M${x} ${m + 25 + (i % 5) * 17} l4 -2 2 5 -4 2Z`} />
              )}
              {bottom && (
                <circle cx={x} cy={h - m - 160 - (i % 3) * 10} r="1.8" />
              )}
            </g>
          );
        })}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g stroke={detail} opacity=".5">
            <path
              d={`M${m + 40} ${m + 115} Q${w * 0.3} ${m + 55} ${cx} ${m + 95} T${w - m - 40} ${m + 65} M${cx - 90} ${m + 60} Q${cx + 50} ${m + 20} ${w - m - 70} ${m + 40}`}
            />
          </g>
        )}
        {bottom && (
          <g transform={`translate(0 ${h - m})`}>
            {Array.from({ length: 9 }, (_, i) => {
              const bw = (w - 2 * m - 40) / 9,
                x = m + 20 + i * bw,
                bh = 55 + ((i * 31) % 90);
              return (
                <g key={i}>
                  <path
                    d={`M${x} 0 v-${bh} l${bw * 0.25} 5 ${bw * 0.2} -12 ${bw * 0.2} 18 ${bw * 0.23} -4 V0Z`}
                    fill="currentColor"
                    fillOpacity=".16"
                  />
                  {[0, 1, 2].map((j) => (
                    <path
                      key={j}
                      d={`M${x + 12 + j * bw * 0.22} ${-bh + 25} v10 m0 12 v10`}
                      opacity=".6"
                    />
                  ))}
                </g>
              );
            })}
          </g>
        )}
      </>
    );
  }
  if (d.template === "judgment") {
    frame = (
      <>
        <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
        <path
          d={`M${m + 12} ${m + 130} V${m + 12} H${cx - 150} M${cx + 150} ${m + 12} H${w - m - 12} V${m + 130} M${m + 12} ${h - m - 130} V${h - m - 12} H${cx - 70} M${cx + 70} ${h - m - 12} H${w - m - 12} V${h - m - 130}`}
          opacity=".4"
        />
      </>
    );
    pattern = (
      <g opacity=".35">
        {Array.from({ length: count }, (_, i) => (
          <g key={i}>
            {top && <path d={`M${m + 28} ${m + 40 + i * 5} h${65 + i * 4}`} />}
            {bottom && (
              <path
                d={`M${w - m - 28} ${h - m - 40 - i * 5} h-${65 + i * 4}`}
              />
            )}
          </g>
        ))}
      </g>
    );
    ornaments = (
      <>
        {top && (
          <g transform={`translate(${cx} ${m + 95}) scale(${scale})`}>
            <path d="M0 -60 V60 M-40 60 H40 M-100 -50 L100 0 M-82 -46 L-110 15 h55Z M80 -5 L55 50 h55Z" />
            <path
              d="M-110 15 Q-83 50 -55 15 M55 50 Q83 80 110 50"
              fill="currentColor"
              fillOpacity=".13"
            />
            <circle cy="-25" r="6" fill={detail} stroke={detail} />
          </g>
        )}
        {bottom && (
          <g
            transform={`translate(${cx} ${h - m - 85}) scale(${scale})`}
            stroke={detail}
          >
            <path
              d="M-5 -48 A48 48 0 0 0 -5 48 L-15 23 3 10 -13 -7 5 -22Z M15 -45 A48 48 0 0 1 15 45 L5 24 23 10 7 -9 24 -25Z"
              fill={detail}
              fillOpacity=".15"
            />
            <path d="M-100 10 h30 M70 10 h30" />
          </g>
        )}
      </>
    );
  }
  return { frame, pattern, ornaments };
}
