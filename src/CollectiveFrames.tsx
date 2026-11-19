import type { ReactNode } from "react";
import { collectiveTemplates } from "./collectiveTemplates";
import type { Design } from "./model";

export function collectiveFrames(d: Design, w: number, h: number) {
  const template = collectiveTemplates.find((item) => item.id === d.template);
  if (!template) return null;

  const { ornament, detail, paper } = d.palette;
  const m = d.margin + 10;
  const edge = w - m;
  const foot = h - m;
  const scale = 0.72 + d.patternScale * 0.28;
  const count = Math.max(3, Math.round(10 * d.density));
  const top = d.decoration !== "bottom";
  const bottom = d.decoration !== "top";
  let header: ReactNode, footer: ReactNode, frame: ReactNode, tick: ReactNode;

  switch (template.tradition) {
    case "revolt":
      frame = (
        <g>
          <path
            d={`M${m} ${m + 128} V${m} h218 M${edge - 218} ${m} H${edge} v128 M${m} ${foot - 128} V${foot} h218 M${edge - 218} ${foot} H${edge} v-128`}
            strokeWidth={4 * d.thickness}
          />
          <path
            d={`M${m + 8} ${m + 9} h89 M${edge - 97} ${foot - 9} h89`}
            stroke={detail}
          />
        </g>
      );
      tick = <path d="M0 0 l13 -7 -2 4 -11 6Z" fill={detail} stroke="none" />;
      break;
    case "labor":
      frame = (
        <g>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} />
          {[m, edge - 18].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path d={`M9 ${m} V${foot}`} opacity=".45" />
              {[m + 18, foot - 18].map((y) => (
                <circle key={y} cx="9" cy={y} r="4" fill={detail} />
              ))}
            </g>
          ))}
        </g>
      );
      tick = <path d="M0 0 h16 M0 5 h6" />;
      break;
    case "leisure":
      frame = (
        <path
          d={`M${m} ${m + 170} Q${m} ${m} ${m + 155} ${m} M${edge - 155} ${m} Q${edge} ${m} ${edge} ${m + 170} M${m} ${foot - 170} Q${m} ${foot} ${m + 155} ${foot} M${edge - 155} ${foot} Q${edge} ${foot} ${edge} ${foot - 170}`}
        />
      );
      tick = (
        <ellipse
          rx="4"
          ry="8"
          transform="rotate(32)"
          fill={ornament}
          stroke="none"
        />
      );
      break;
  }

  switch (template.id) {
    case "broadside":
      header = (
        <g>
          {[-1, 0, 1].map((i) => (
            <g
              key={i}
              transform={`translate(${i * 51} ${i * 3}) rotate(${i * 16 - 7})`}
            >
              <path d="M-38 -47 h76 v94 h-76Z" fill={paper} />
              <path
                d="M-29 -35 h57 v11 h-57Z M-29 -16 h41 v5 h-41Z"
                fill={detail}
                stroke="none"
              />
              <path d="M-28 0 h56 m-56 8 h51 m-51 8 h55 m-55 8 h39" />
            </g>
          ))}
        </g>
      );
      footer = (
        <g fill={ornament} stroke="none">
          <path d="M-175 18 l243 -33 106 6 -243 35Z" />
          <path d="M-131 29 l229 -27 44 5 -228 28Z" fill={detail} />
        </g>
      );
      break;
    case "assembly":
      header = (
        <g>
          <path d="M-162 44 l-8 -90 M161 44 l10 -90" />
          <path
            d="M-169 -38 Q-87 -53 0 -27 T170 -38 l-5 51 Q80 37 0 15 T-164 16Z"
            fill={detail}
            stroke="none"
          />
          <path d="M-150 4 Q-87 -13 -13 5 T148 12" stroke={paper} />
        </g>
      );
      footer = (
        <g>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${-156 + 42 * i} ${-32 + i * 3} Q0 ${112 - i * 48} ${156 - 42 * i} ${-32 + i * 3}`}
              strokeDasharray="32 9"
              strokeWidth={9 * d.thickness}
            />
          ))}
          <circle cy="-21" r="8" fill={detail} stroke="none" />
        </g>
      );
      break;
    case "petition":
      header = (
        <g transform="rotate(-5)">
          <path d="M-51 -40 h80 l23 23 v61 H-51Z M29 -40 v23 h23" />
          <path d="M-37 -19 h43 m-43 11 h34 M-37 8 h72 m-72 9 h67 m-67 9 h53" />
          <circle cx="39" cy="30" r="15" fill={detail} stroke={paper} />
          <circle cx="39" cy="30" r="10" stroke={paper} />
        </g>
      );
      footer = (
        <g>
          <path d="M-180 22 h101 m25 0 h102 m27 0 h105" opacity=".5" />
          <g
            stroke={detail}
            strokeWidth={2.5 * d.thickness}
            strokeLinecap="round"
          >
            <path d="M-177 17 q46 -73 33 -36 t-16 33 q26 -34 18 -8 t24 -7 q3 15 33 8" />
            <path d="M-51 16 q34 -74 26 -33 l-9 37 q46 -60 24 -18 t22 -2 q-1 14 33 3" />
            <path d="M77 17 q12 -12 29 -46 q9 -16 0 22 t10 2 q5 -14 7 4 t52 -2" />
          </g>
        </g>
      );
      break;
    case "shift":
      header = (
        <g transform="rotate(-6)">
          <path d="M-72 -41 h127 l17 17 v67 H-72Z" fill={paper} />
          <path d="M-72 -21 H72 M-57 0 h111 M-57 15 h111 M-57 30 h111 M-15 -21 v64 M28 -21 v64" />
          {[-44, 6, 47].map((x) => (
            <circle key={x} cx={x} cy="8" r="5" fill={detail} stroke="none" />
          ))}
        </g>
      );
      footer = (
        <g>
          <circle cx="118" cy="-18" r="25" fill={detail} stroke="none" />
          <path
            d="M-179 33 v-33 l51 -30 v30 l54 -30 v30 l55 -30 v30 h58 l5 -50 h17 l4 50 h33 v33Z"
            fill={ornament}
          />
          <path
            d="M-162 15 h127"
            stroke={paper}
            strokeWidth={7 * d.thickness}
            strokeDasharray="12 8"
          />
          <path d="M-204 39 h406" />
        </g>
      );
      break;
    case "shuttle":
      header = (
        <g>
          <path
            d="M-248 9 Q-180 -27 -132 0 T0 0 T170 0 T248 -6"
            stroke={detail}
          />
          <path
            d="M-126 0 Q-69 -34 0 -24 Q77 -30 126 0 Q63 27 0 23 Q-71 30 -126 0Z"
            fill={ornament}
          />
          <rect x="-47" y="-13" width="94" height="26" rx="13" fill={paper} />
          <path
            d="M-32 0 h66"
            stroke={detail}
            strokeDasharray="4 3"
            strokeWidth="18"
          />
        </g>
      );
      footer = (
        <g>
          {Array.from({ length: count + 6 }, (_, i) => {
            const x = -150 + (300 * i) / (count + 5);
            return <path key={i} d={`M${x} -36 v70`} />;
          })}
          {[-18, -6, 6, 18].map((y, i) => (
            <path
              key={y}
              d={`M-167 ${y} h334`}
              stroke={detail}
              strokeWidth={5 * d.thickness}
              strokeDasharray="13 5"
              strokeDashoffset={i * 9}
            />
          ))}
        </g>
      );
      break;
    case "hammock":
      header = (
        <g>
          <circle cy="-5" r="25" fill={detail} stroke="none" />
          <path
            d="M-84 14 q40 -6 80 0 t80 0 M-55 24 q33 -4 64 0 t47 0"
            stroke={ornament}
          />
        </g>
      );
      footer = (
        <g>
          <path d="M-156 -37 Q0 66 156 -37 Q6 125 -156 -37Z" fill={ornament} />
          <path
            d="M-142 -28 Q0 76 143 -28"
            stroke={paper}
            strokeDasharray="5 6"
          />
          <path
            d="M-178 -49 l24 14 M154 -35 l24 -14"
            strokeWidth={4 * d.thickness}
          />
          {[-155, 155].map((x) => (
            <circle key={x} cx={x} cy="-36" r="5" fill={detail} />
          ))}
        </g>
      );
      break;
    case "longtable":
      header = (
        <g>
          <path d="M-220 -29 Q0 32 220 -29" />
          {[-2, -1, 0, 1, 2].map((i) => (
            <g
              key={i}
              transform={`translate(${i * 70} ${1 - i * i * 3.1}) rotate(${-i * 4.8})`}
            >
              <path
                d="M-25 -2 h50 v24 q-6 16 -12 3 q-6 16 -13 3 q-7 13 -13 -3 q-7 13 -12 -3Z"
                fill={i % 2 ? detail : ornament}
                stroke="none"
              />
              <path d="M-5 11 l5 -6 5 6 -5 6Z" fill={paper} stroke="none" />
            </g>
          ))}
        </g>
      );
      footer = (
        <g>
          {[-1, 1].map((i) => (
            <g key={i} transform={`translate(${i * 47} 0) rotate(${i * 17})`}>
              <path d="M-48 -17 h96 A49 49 0 0 1 -48 -17Z" fill={ornament} />
              <path
                d="M-43 -17 h86 A44 44 0 0 1 -43 -17Z"
                fill={detail}
                stroke={paper}
              />
              {[-20, 0, 20].map((x) => (
                <ellipse
                  key={x}
                  cx={x}
                  cy={x ? -2 : 8}
                  rx="2.1"
                  ry="4"
                  fill={paper}
                  stroke="none"
                />
              ))}
            </g>
          ))}
        </g>
      );
      break;
  }
  const pattern = Array.from({ length: count }, (_, i) => {
    const y = m + 86 + (i * (h / 2 - m - 130)) / count;
    return (
      <g key={i} opacity=".55">
        {top && (
          <g transform={`translate(${m + 21} ${y}) scale(${scale})`}>{tick}</g>
        )}
        {bottom && (
          <g
            transform={`translate(${edge - 21} ${h - y}) rotate(180) scale(${scale})`}
          >
            {tick}
          </g>
        )}
      </g>
    );
  });
  const ornaments = (
    <>
      {top && (
        <g transform={`translate(${w / 2} ${m + 66}) scale(${scale})`}>
          {header}
        </g>
      )}
      {bottom && (
        <g transform={`translate(${w / 2} ${foot - 66}) scale(${scale})`}>
          {footer}
        </g>
      )}
    </>
  );
  return { pattern, frame, ornaments };
}
