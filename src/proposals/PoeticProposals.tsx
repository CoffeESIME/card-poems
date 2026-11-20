import {
  FourCorners,
  MirroredCorners,
  Rosette,
  notchedRectPath,
  seq,
  starPoly,
  type FrameLayers,
  type ProposalContext,
} from "./primitives";

export function poeticProposals(ctx: ProposalContext): FrameLayers | null {
  const { d, w, h, m, cx, cy, sw, scale, top, bottom, paper, ornament, detail } =
    ctx;
  const count = Math.max(3, Math.round(8 * d.density));

  switch (d.template) {
    // ── ROMANTIC ───────────────────────────────────────────────────────────
    case "p_lancet": {
      const springY = m + 185;
      const apexY = m + 16;
      const archOuter = [
        `M${m + 18} ${h - m - 18}`,
        `V${springY}`,
        `Q${m + 18} ${apexY + 46} ${cx} ${apexY}`,
        `Q${w - m - 18} ${apexY + 46} ${w - m - 18} ${springY}`,
        `V${h - m - 18}Z`,
      ].join(" ");
      const archInner = [
        `M${m + 34} ${h - m - 34}`,
        `V${springY + 6}`,
        `Q${m + 34} ${apexY + 62} ${cx} ${apexY + 18}`,
        `Q${w - m - 34} ${apexY + 62} ${w - m - 34} ${springY + 6}`,
        `V${h - m - 34}Z`,
      ].join(" ");
      const frame = (
        <>
          <path d={archOuter} strokeWidth={sw * 1.6} />
          <path d={archInner} stroke={detail} strokeWidth={sw * 0.85} opacity=".8" />
          <path
            d={`M${m + 18} ${h - m - 48} H${w - m - 18}`}
            strokeWidth={sw * 0.8}
            opacity=".5"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".45">
          {top &&
            seq(count).map((i) => {
              const x = m + 96 + ((w - 2 * m - 192) * i) / (count - 1);
              const y = m + 74 + Math.abs(i - (count - 1) / 2) * 14;
              return (
                <path
                  key={i}
                  d={`M${x - 4} ${y} h8 M${x} ${y - 4} v8`}
                  opacity={i % 2 === 0 ? 0.7 : 0.32}
                />
              );
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 96}) scale(${0.9 * scale})`}>
              {/* Gothic quatrefoil tracery */}
              <circle r="38" stroke={ornament} opacity=".5" />
              {[0, 90, 180, 270].map((a) => (
                <circle
                  key={a}
                  cx={Math.cos((a * Math.PI) / 180) * 18}
                  cy={Math.sin((a * Math.PI) / 180) * 18}
                  r="14"
                  stroke={ornament}
                  opacity=".4"
                />
              ))}
              <path
                d="M11 -22 A24 24 0 1 0 11 22 A18 22 0 0 1 11 -22Z"
                fill={detail}
                fillOpacity=".82"
                stroke={detail}
              />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              <path d="M-128 0 H-28 M28 0 H128" opacity=".7" />
              <polygon points={starPoly(0, 0, 12, 4, 4)} fill={detail} fillOpacity=".35" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_blueflower": {
      const frame = (
        <>
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            rx="22"
            strokeWidth={sw * 1.05}
            opacity=".6"
          />
          <MirroredCorners
            ctx={ctx}
            inset={14}
            render={() => (
              <path
                d="M0 78 C0 32 32 0 78 0 M0 52 C14 52 24 40 24 24 C24 14 38 6 52 0"
                stroke={detail}
                strokeWidth={sw * 1.1}
              />
            )}
          />
        </>
      );
      const pattern = (
        <g fill={detail} stroke="none" opacity=".42">
          {seq(count + 2).map((i) => {
            const x = m + 70 + ((w - 2 * m - 140) * i) / (count + 1);
            return (
              <g key={i}>
                {top && <circle cx={x} cy={m + 52 + (i % 3) * 12} r={i % 2 ? 2.2 : 1.3} />}
                {bottom && <circle cx={x} cy={h - m - 36} r="1.5" />}
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 72}) scale(${scale})`} stroke={detail}>
              <path
                d="M14 -24 A26 26 0 1 0 14 24 A20 24 0 0 1 14 -24Z"
                fill={detail}
                fillOpacity=".26"
              />
              <path d="M-92 0 H-42 M42 0 H92" opacity=".55" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 68}) scale(${0.92 * scale})`}>
              <path d="M0 32 Q-5 10 0 -10 M-2 22 Q-42 26 -50 4 Q-18 0 -2 22 M0 28 Q38 30 46 10 Q18 6 0 28" />
              {[0, 72, 144, 216, 288].map((a) => (
                <path
                  key={a}
                  transform={`translate(0 -20) rotate(${a})`}
                  d="M0 0 C-30 -12 -20 -52 0 -38 C20 -52 30 -12 0 0Z"
                  fill={ornament}
                  fillOpacity=".24"
                />
              ))}
              <circle cy="-20" r="6.5" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_ruins": {
      const colW = 36;
      const frame = (
        <>
          {/* Left & right fluted classical pilasters */}
          {[m + 14, w - m - 14 - colW].map((x, idx) => (
            <g key={idx}>
              <rect x={x} y={m + 44} width={colW} height={h - 2 * m - 88} fill={ornament} fillOpacity=".06" />
              <path
                d={`M${x + 10} ${m + 52} V${h - m - 52} M${x + 18} ${m + 52} V${h - m - 52} M${x + 26} ${m + 52} V${h - m - 52}`}
                opacity=".45"
              />
              {/* Capital & base */}
              <rect x={x - 7} y={m + 32} width={colW + 14} height="12" fill={paper} />
              <rect x={x - 7} y={h - m - 44} width={colW + 14} height="12" fill={paper} />
            </g>
          ))}
          {/* Broken cornice at top, clean plinth at bottom */}
          <path
            d={`M${m + 7} ${m + 32} H${cx - 84} l14 -10 12 8 M${cx + 58} ${m + 26} l14 -6 12 12 H${w - m - 7}`}
            strokeWidth={sw * 1.25}
          />
          <path
            d={`M${m + 7} ${h - m - 32} H${w - m - 7} M${m + 14} ${h - m - 22} H${w - m - 14}`}
            strokeWidth={sw * 1.25}
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".36">
          {top &&
            seq(count).map((i) => {
              const x = m + 82 + ((w - 2 * m - 164) * i) / (count - 1);
              return <path key={i} d={`M${x} ${m + 44} v10`} />;
            })}
        </g>
      );
      const ornaments = (
        <>
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              <path d="M-155 18 Q-76 6 0 -10 T155 14" strokeWidth={sw * 1.1} />
              {[-110, -56, 0, 56, 110].map((x, i) => (
                <path
                  key={x}
                  transform={`translate(${x} ${10 - (i % 2) * 14}) rotate(${i % 2 ? -28 : 24})`}
                  d="M0 0 Q-18 -20 0 -30 Q18 -20 0 0Z"
                  fill={detail}
                  fillOpacity=".22"
                />
              ))}
            </g>
          )}
          {top && (
            <g transform={`translate(${cx} ${m + 64}) scale(${scale})`} stroke={detail}>
              <path d="M-54 0 L0 -20 54 0" opacity=".65" />
              <circle cy="-2" r="4.5" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── MYSTIC ─────────────────────────────────────────────────────────────
    case "p_astrolabe": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.1} opacity=".6" />
          <path
            d={`M${m + 24} ${m + 96} V${m + 24} H${m + 96} M${w - m - 96} ${m + 24} H${w - m - 24} V${m + 96} M${m + 24} ${h - m - 96} V${h - m - 24} H${m + 96} M${w - m - 96} ${h - m - 24} H${w - m - 24} V${h - m - 96}`}
            stroke={detail}
            opacity=".7"
          />
        </>
      );
      const rays = Math.max(12, Math.round(24 * d.density));
      const pattern = (
        <g stroke={detail} opacity=".48">
          {top && (
            <g transform={`translate(${cx} ${m + 88}) scale(${0.86 * scale})`}>
              {seq(rays).map((i) => (
                <path
                  key={i}
                  transform={`rotate(${(i * 360) / rays})`}
                  d={`M0 -48 v-${i % 3 === 0 ? 18 : 8}`}
                />
              ))}
            </g>
          )}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 88}) scale(${0.86 * scale})`}>
              <circle r="44" stroke={detail} strokeWidth={sw * 1.1} />
              <circle r="33" opacity=".55" />
              <ellipse rx="44" ry="16" transform="rotate(-24)" opacity=".55" />
              <path
                d="M0 -33 A33 33 0 0 1 0 33 A21 33 0 0 0 0 -33Z"
                fill={detail}
                fillOpacity=".58"
                stroke="none"
              />
              <circle r="4" fill={paper} stroke={detail} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              <path d="M-116 0 H-28 M28 0 H116 M0 -24 V24" />
              <circle r="11" fill={paper} />
              <circle r="3.5" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_sanctuary": {
      const archR = Math.min(200, (w - 2 * m - 60) / 2);
      const frame = (
        <>
          {[0, 14, 28].map((off, idx) => (
            <path
              key={off}
              d={`M${m + 14 + off} ${h - m - 14 - off} V${m + 14 + archR} A${archR - off} ${archR - off} 0 0 1 ${w - m - 14 - off} ${m + 14 + archR} V${h - m - 14 - off}`}
              stroke={idx === 1 ? detail : ornament}
              strokeWidth={idx === 0 ? sw * 1.4 : sw * 0.8}
              opacity={1 - idx * 0.24}
            />
          ))}
          <path d={`M${m + 14} ${h - m - 14} H${w - m - 14}`} strokeWidth={sw * 1.3} />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".3">
          {top &&
            seq(Math.max(4, Math.round(7 * d.density))).map((i) => {
              const a = -72 + (144 * i) / (Math.max(4, Math.round(7 * d.density)) - 1);
              return (
                <path
                  key={i}
                  transform={`translate(${cx} ${m + 96}) rotate(${a})`}
                  d="M0 -28 V-58"
                />
              );
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 96}) scale(${scale})`} stroke={detail}>
              {/* Vesica Piscis */}
              <circle cx="-13" cy="0" r="22" opacity=".75" />
              <circle cx="13" cy="0" r="22" opacity=".75" />
              <path
                d="M0 -18 Q-12 0 0 18 Q12 0 0 -18Z"
                fill={detail}
                fillOpacity=".32"
              />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 46}) scale(${scale})`} stroke={detail}>
              <path d="M-126 24 H126 M-88 12 H88 M-52 0 H52 M0 -26 V0" />
              <polygon points={starPoly(0, -32, 9, 3, 4)} fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_veil": {
      const frame = (
        <>
          <rect
            x={m + 16}
            y={m + 16}
            width={w - 2 * m - 32}
            height={h - 2 * m - 32}
            opacity=".4"
          />
          <path
            d={`M${m + 16} ${m + 16} H${w - m - 16}`}
            stroke={detail}
            strokeWidth={sw * 1.6}
          />
        </>
      );
      const folds = Math.max(3, Math.round(5 * d.density));
      const pattern = (
        <g stroke={ornament} opacity=".34">
          {top &&
            [-1, 1].map((side) => (
              <g key={side}>
                {seq(folds).map((i) => (
                  <path
                    key={i}
                    d={`M${cx + side * (22 + i * 38)} ${m + 16} Q${cx + side * (110 + i * 42)} ${m + 95} ${side === -1 ? m + 16 : w - m - 16} ${m + 140 + i * 34}`}
                  />
                ))}
              </g>
            ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 84}) scale(${scale})`}>
              <polygon
                points={starPoly(0, 0, 30, 8, 8)}
                fill={detail}
                fillOpacity=".26"
                stroke={detail}
              />
              <circle r="4" fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52}) scale(${scale})`} stroke={detail}>
              <path d="M-144 -12 Q-72 22 0 4 Q72 22 144 -12" />
              <path d="M0 4 V24" />
              <circle cy="28" r="4" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── ABSENCE ────────────────────────────────────────────────────────────
    case "p_windowlight": {
      const frame = (
        <>
          <path
            d={`M${m + 16} ${m + 56} V${m + 16} H${m + 56} M${w - m - 56} ${m + 16} H${w - m - 16} V${m + 56} M${m + 16} ${h - m - 16} H${w - m - 16}`}
            opacity=".46"
          />
        </>
      );
      const pattern = (
        <g stroke="none" fill={detail} opacity=".11">
          {bottom && (
            <path
              d={`M${w * 0.24} ${h - m - 16} L${w * 0.36} ${h - m - 118} H${w * 0.78} L${w * 0.66} ${h - m - 16}Z`}
            />
          )}
        </g>
      );
      const ornaments = (
        <>
          {bottom && (
            <g stroke={ornament} opacity=".5">
              {/* Mullion shadow inside window light */}
              <path
                d={`M${w * 0.57} ${h - m - 118} L${w * 0.45} ${h - m - 16} M${w * 0.3} ${h - m - 68} H${w * 0.72}`}
                stroke={paper}
                strokeWidth="4"
                opacity=".7"
              />
              <path
                d={`M${w * 0.24} ${h - m - 16} L${w * 0.36} ${h - m - 118} H${w * 0.78} L${w * 0.66} ${h - m - 16}`}
                stroke={detail}
                opacity=".42"
              />
            </g>
          )}
          {top && (
            <path
              d={`M${cx - 32} ${m + 48} H${cx + 32}`}
              stroke={detail}
              opacity=".55"
            />
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_cadence": {
      const frame = (
        <path
          d={`M${m + 24} ${m + 16} H${cx - 90} M${cx + 90} ${m + 16} H${w - m - 24} M${m + 16} ${m + 24} V${m + 120} M${w - m - 16} ${h - m - 120} V${h - m - 24} M${m + 24} ${h - m - 16} H${cx - 110} M${cx + 110} ${h - m - 16} H${w - m - 24}`}
          opacity=".56"
        />
      );
      const pattern = (
        <g stroke={ornament}>
          {bottom &&
            seq(Math.max(3, Math.round(6 * d.density))).map((i) => (
              <path
                key={i}
                d={`M${cx - 64} ${h - m - 74 + i * 7} h${128 - i * 14}`}
                opacity={Math.max(0.06, 0.34 - i * 0.05)}
              />
            ))}
        </g>
      );
      const ornaments = (
        <g stroke={detail}>
          {top && (
            <path
              d={`M${cx - 7} ${m + 42} v${24 * scale} M${cx + 7} ${m + 42} v${24 * scale}`}
              strokeWidth={sw * 1.15}
            />
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 28})`} fill={detail} stroke="none">
              <circle cx="-24" r="3" opacity=".92" />
              <circle cx="0" r="3" opacity=".58" />
              <circle cx="24" r="3" opacity=".26" />
            </g>
          )}
        </g>
      );
      return { pattern, frame, ornaments };
    }

    case "p_wintertree": {
      const frame = (
        <>
          <path
            d={`M${m + 16} ${h - m - 20} H${w - m - 16}`}
            strokeWidth={sw * 1.1}
            opacity=".65"
          />
          <path
            d={`M${m + 16} ${m + 16} h46 M${w - m - 62} ${m + 16} h46`}
            opacity=".45"
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".28">
          {bottom &&
            seq(count).map((i) => (
              <path
                key={i}
                d={`M${m + 42 + i * 32} ${h - m - 10 + (i % 2) * 3} h${10 + (i % 3) * 5}`}
              />
            ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <circle
              cx={w - m - 96}
              cy={m + 78}
              r={18 * scale}
              stroke={detail}
              fill={detail}
              fillOpacity=".14"
            />
          )}
          {bottom && (
            <g
              transform={`translate(${m + 126} ${h - m - 20}) scale(${0.92 * scale})`}
              strokeLinecap="round"
            >
              <path
                d="M-6 0 Q4 -58 -2 -136 M0 -54 L-32 -88 -42 -118 M-1 -86 L28 -114 38 -144 M-2 -124 L-18 -150 M28 -114 L52 -124 M-24 -80 L-50 -86"
                strokeWidth={sw * 1.35}
              />
              <path d="M-42 0 Q0 -4 44 0" opacity=".45" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── DARK · VISCERAL & APOCALYPTIC ──────────────────────────────────────
    case "p_thorn": {
      const frame = (
        <>
          <path
            d={`M${m + 24} ${m + 24} Q${m + 4} ${h * 0.28} ${m + 28} ${cy} T${m + 20} ${h - m - 24} M${w - m - 24} ${m + 24} Q${w - m - 4} ${h * 0.28} ${w - m - 28} ${cy} T${w - m - 20} ${h - m - 24}`}
            strokeWidth={sw * 1.4}
          />
          <path
            d={`M${m + 38} ${m + 44} V${h - m - 44} M${w - m - 38} ${m + 44} V${h - m - 44}`}
            opacity=".24"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} fill={detail} fillOpacity=".26">
          {seq(count).map((i) => {
            const y = m + 76 + ((h - 2 * m - 152) * i) / (count - 1);
            return (
              <g key={i}>
                <path d={`M${m + 22} ${y} l24 -12 -16 20Z`} />
                <path d={`M${w - m - 22} ${y} l-24 12 16 -20Z`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${scale})`} stroke={detail}>
              <path d="M-136 0 Q-48 -10 0 0 Q48 10 136 0" strokeWidth={sw * 1.2} />
              {[-92, -46, 0, 46, 92].map((x) => (
                <path key={x} d={`M${x - 7} -14 L${x + 7} 14 M${x + 7} -14 L${x - 7} 14`} strokeWidth={sw * 0.9} />
              ))}
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              <path
                d="M0 -30 C-6 -8 -18 2 -15 16 C-12 32 12 32 15 16 C18 2 6 -8 0 -30Z"
                fill={detail}
                fillOpacity=".35"
              />
              <path d="M-112 12 H-34 M34 12 H112" stroke={ornament} opacity=".55" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_vanitas": {
      const frame = (
        <>
          <path
            d={notchedRectPath(m + 10, m + 10, w - 2 * m - 20, h - 2 * m - 20, 44)}
            strokeWidth={sw * 1.3}
          />
          <rect
            x={m + 24}
            y={m + 24}
            width={w - 2 * m - 48}
            height={h - 2 * m - 48}
            opacity=".32"
          />
          {/* Deliberate hairline fissure across upper right corner */}
          <path
            d={`M${w - m - 140} ${m + 10} l16 26 -14 18 22 24 -8 16`}
            stroke={detail}
            strokeWidth={sw * 1.1}
          />
        </>
      );
      const pattern = (
        <MirroredCorners
          ctx={ctx}
          inset={20}
          render={() => (
            <path
              d="M36 0 C18 0 0 18 0 36 M48 6 C26 12 12 26 6 48"
              stroke={ornament}
              opacity=".42"
            />
          )}
        />
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${0.9 * scale})`}>
              {[-1, 1].map((side) => (
                <path
                  key={side}
                  transform={`scale(${side} 1)`}
                  d="M8 22 C42 -22 104 18 124 -8 C134 -32 92 -42 82 -20 C76 -4 102 4 102 -12 M22 10 Q24 -36 52 -32"
                />
              ))}
              <path d="M-4 -24 L4 -8 -4 8 4 24" stroke={detail} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${0.9 * scale})`}>
              <path d="M-12 26 V-18 Q0 -12 12 -18 V26 M-48 32 H48 M-28 26 H28 M0 -18 V-30" />
              <path
                d="M0 -32 C-10 -44 -2 -58 6 -72 C12 -58 6 -44 0 -32Z"
                stroke={detail}
                fill={detail}
                fillOpacity=".32"
              />
              <path d="M6 -76 Q-12 -92 8 -106" stroke={detail} opacity=".45" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_anatomy": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.15} opacity=".72" />
          <rect x={m + 18} y={m + 18} width={w - 2 * m - 36} height={h - 2 * m - 36} strokeWidth={sw * 0.65} opacity=".4" />
        </>
      );
      const ticks = Math.max(8, Math.round(14 * d.density));
      const pattern = (
        <g opacity=".4" stroke={ornament}>
          {seq(ticks).map((i) => {
            const y = m + 64 + ((h - 2 * m - 128) * i) / (ticks - 1);
            return (
              <g key={i}>
                <path d={`M${m + 18} ${y} h${i % 4 === 0 ? 22 : 10}`} />
                <path d={`M${w - m - 18} ${y} h-${i % 4 === 0 ? 22 : 10}`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 86}) scale(${0.84 * scale})`}>
              <path d="M0 -52 V46 M-10 -48 Q0 -58 10 -48" strokeWidth={sw * 1.2} />
              {[-1, 1].map((side) => (
                <g key={side} transform={`scale(${side} 1)`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path
                      key={i}
                      d={`M5 ${-36 + i * 15} C${66 - i * 5} ${-66 + i * 18} ${104 - i * 12} ${-4 + i * 14} ${22 - i * 3} ${-2 + i * 12}`}
                    />
                  ))}
                </g>
              ))}
              <path d="M-128 8 H-90 M90 8 H128" stroke={detail} strokeDasharray="3 4" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 62}) scale(${scale})`} stroke={detail}>
              <path d="M-120 0 H-32 M32 0 H120" opacity=".55" />
              <circle r="14" fill={paper} />
              <path d="M-24 22 L0 -14 24 22 M-14 8 H14" stroke={ornament} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_eclipse": {
      const frame = (
        <>
          <path
            d={`M${m + 14} ${m + 112} V${m + 14} H${cx - 132} M${cx + 132} ${m + 14} H${w - m - 14} V${m + 112} M${m + 14} ${h - m - 104} V${h - m - 14} H${w - m - 14} V${h - m - 104}`}
            strokeWidth={sw * 1.3}
            opacity=".65"
          />
        </>
      );
      const rays = Math.max(16, Math.round(28 * d.density));
      const pattern = (
        <g stroke={detail} opacity=".62">
          {top && (
            <g transform={`translate(${cx} ${m + 92}) scale(${0.86 * scale})`}>
              {seq(rays).map((i) => (
                <path
                  key={i}
                  transform={`rotate(${(i * 360) / rays})`}
                  d={i % 2 === 0 ? "M0 -50 v-26" : "M0 -52 v-12"}
                />
              ))}
            </g>
          )}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 92}) scale(${0.86 * scale})`}>
              <circle r="46" fill={detail} fillOpacity=".24" stroke={detail} strokeWidth={sw * 1.2} />
              <circle cx="-6" cy="0" r="39" fill={paper} stroke="none" />
              <circle r="54" stroke={ornament} strokeDasharray="2 7" opacity=".5" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(0 ${h - m - 14})`}>
              <path
                d={`M${m + 20} -68 L${w * 0.28} -48 ${cx - 34} -66 ${cx - 12} -40 ${cx - 28} -18 ${cx + 6} 0 M${cx + 28} -62 L${w * 0.74} -76 ${w - m - 20} -52`}
                stroke={detail}
                strokeWidth={sw * 1.2}
              />
              <path
                d={`M${m + 34} -26 H${cx - 86} M${cx + 82} -24 H${w - m - 34}`}
                opacity=".38"
              />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── SATIRE ─────────────────────────────────────────────────────────────
    case "p_epitaph": {
      const shoulderY = m + 124;
      const steleOuter = [
        `M${m + 18} ${h - m - 18}`,
        `V${shoulderY}`,
        `H${m + 52}`,
        `Q${m + 52} ${m + 14} ${cx} ${m + 14}`,
        `Q${w - m - 52} ${m + 14} ${w - m - 52} ${shoulderY}`,
        `H${w - m - 18}`,
        `V${h - m - 18}Z`,
      ].join(" ");
      const steleInner = [
        `M${m + 32} ${h - m - 32}`,
        `V${shoulderY + 12}`,
        `H${m + 64}`,
        `Q${m + 64} ${m + 28} ${cx} ${m + 28}`,
        `Q${w - m - 64} ${m + 28} ${w - m - 64} ${shoulderY + 12}`,
        `H${w - m - 32}`,
        `V${h - m - 32}Z`,
      ].join(" ");
      const frame = (
        <>
          <path d={steleOuter} strokeWidth={sw * 1.8} />
          <path d={steleInner} strokeWidth={sw * 0.8} opacity=".55" />
          <path d={`M${m + 10} ${h - m - 10} H${w - m - 10}`} strokeWidth={sw * 2} />
        </>
      );
      const pattern = (
        <g opacity=".45" stroke={ornament}>
          {top && (
            <path d={`M${cx + 124} ${m + 38} l-16 22 14 14 -22 26 m22 -26 l18 10`} />
          )}
          {bottom &&
            seq(count).map((i) => (
              <path
                key={i}
                d={`M${m + 66 + ((w - 2 * m - 132) * i) / (count - 1)} ${h - m - 42} l7 -6`}
              />
            ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 84}) scale(${scale})`}>
              <path d="M-74 0 H-24 M24 0 H74 M0 -20 V20 M-12 -5 H12" strokeWidth={sw * 1.1} />
              <circle r="28" stroke={detail} strokeDasharray="3 5" opacity=".5" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 72}) scale(${scale})`} stroke={detail}>
              <path d="M-64 26 Q-14 16 12 -14 Q28 -30 44 -10 M-20 14 Q-46 -12 -58 -4 Q-48 16 -20 14" />
              <g transform="translate(44 -10)">
                <Rosette r={14} petals={8} fillOpacity={0.25} stroke={detail} centerFill={paper} />
              </g>
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_obituary": {
      const frame = (
        <>
          <rect
            x={m + 6}
            y={m + 6}
            width={w - 2 * m - 12}
            height={h - 2 * m - 12}
            strokeWidth={sw * 5.8}
          />
          <path
            d={notchedRectPath(m + 28, m + 28, w - 2 * m - 56, h - 2 * m - 56, 30)}
            strokeWidth={sw * 1.05}
          />
          <FourCorners
            ctx={ctx}
            inset={32}
            render={() => (
              <circle r="6" fill={detail} stroke="none" opacity=".72" />
            )}
          />
        </>
      );
      const pattern = (
        <g opacity=".34" stroke={ornament}>
          {seq(count * 2).map((i) => {
            const x = m + 68 + ((w - 2 * m - 136) * i) / (count * 2 - 1);
            return (
              <g key={i}>
                {top && <path d={`M${x} ${m + 36} v6`} />}
                {bottom && <path d={`M${x} ${h - m - 36} v-6`} />}
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 84}) scale(${scale})`} fill={ornament}>
              <path
                d="M0 0 C-56 -38 -66 24 0 0 C56 -38 66 24 0 0Z"
                fillOpacity=".88"
              />
              <path
                d="M-6 2 L-24 44 -8 34 0 46 6 8 M6 2 L24 44 8 34 0 46 -6 8"
                fillOpacity=".88"
              />
              <circle r="6" fill={paper} stroke={ornament} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 70}) scale(${scale})`}>
              <path d="M-132 0 H-28 M28 0 H132 M-84 9 H-34 M34 9 H84" />
              <path d="M0 -11 L16 0 0 11 -16 0Z" fill={detail} fillOpacity=".35" stroke={detail} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_dossier": {
      const frame = (
        <>
          <path
            d={`M${m + 10} ${h - m - 10} V${m + 34} H${m + 42} L${m + 58} ${m + 10} H${m + 240} L${m + 262} ${m + 34} H${w - m - 10} V${h - m - 10}Z`}
            strokeWidth={sw * 1.4}
          />
          <path
            d={`M${m + 28} ${m + 124} H${w - m - 28} M${m + 28} ${h - m - 110} H${w - m - 28}`}
            opacity=".48"
          />
          {/* Left punch holes */}
          {[h * 0.34, cy, h * 0.66].map((y, i) => (
            <circle key={i} cx={m + 30} cy={y} r="7" fill={paper} stroke={ornament} opacity=".6" />
          ))}
        </>
      );
      const pattern = (
        <g opacity=".4" stroke={ornament}>
          {top &&
            seq(Math.max(4, Math.round(6 * d.density))).map((i) => {
              const x = m + 56 + i * 28;
              return <rect key={i} x={x} y={m + 58} width="14" height="14" />;
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w - m - 170} ${m + 78})`}>
              <path d="M0 0 H92 M0 12 H64" opacity=".6" />
              <rect x="108" y="-8" width="24" height="24" stroke={detail} />
              <path d="M113 4 l5 6 11 -13" stroke={detail} strokeWidth={sw * 1.4} />
            </g>
          )}
          {bottom && (
            <g
              transform={`translate(${w - m - 142} ${h - m - 62}) rotate(-10) scale(${0.9 * scale})`}
              stroke={detail}
            >
              <rect x="-84" y="-28" width="168" height="56" rx="4" strokeWidth={sw * 2} />
              <rect x="-76" y="-20" width="152" height="40" rx="2" strokeWidth={sw * 0.85} />
              <path d="M-54 0 H54 M-36 -9 H36 M-36 9 H36" strokeDasharray="10 6" />
              <polygon points={starPoly(-64, 0, 5, 2, 5)} fill={detail} stroke="none" />
              <polygon points={starPoly(64, 0, 5, 2, 5)} fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_proscenium": {
      const swags = Math.max(4, Math.round(6 * d.density));
      const swagW = (w - 2 * m - 32) / swags;
      const frame = (
        <>
          <path
            d={`M${m + 16} ${h - m - 26} V${m + 14} H${w - m - 16} V${h - m - 26}`}
            strokeWidth={sw * 1.4}
          />
          <path
            d={`M${m + 4} ${h - m - 26} H${w - m - 4} M${m + 16} ${h - m - 14} H${w - m - 16}`}
            strokeWidth={sw * 2}
          />
        </>
      );
      const pattern = (
        <g opacity=".3" stroke={ornament}>
          {top &&
            seq(swags).map((i) => {
              const x = m + 16 + i * swagW;
              return (
                <path
                  key={i}
                  d={`M${x} ${m + 14} Q${x + swagW / 2} ${m + 68} ${x + swagW} ${m + 14}`}
                  fill={ornament}
                  fillOpacity=".14"
                />
              );
            })}
          {bottom &&
            seq(count).map((i) => {
              const x = m + 64 + ((w - 2 * m - 128) * i) / (count - 1);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={h - m - 36}
                  r="4"
                  fill={detail}
                  stroke={detail}
                />
              );
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g>
              {/* Draped side curtains */}
              <path
                d={`M${m + 16} ${m + 14} Q${m + 116} ${m + 96} ${m + 34} ${m + 186} V${m + 14}Z`}
                fill={ornament}
                fillOpacity=".16"
              />
              <path
                d={`M${w - m - 16} ${m + 14} Q${w - m - 116} ${m + 96} ${w - m - 34} ${m + 186} V${m + 14}Z`}
                fill={ornament}
                fillOpacity=".16"
              />
              <path
                d={`M${m + 20} ${m + 150} l36 8 M${w - m - 20} ${m + 150} l-36 8`}
                stroke={detail}
                strokeWidth={sw * 1.4}
              />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 82}) scale(${0.86 * scale})`}>
              {[-1, 1].map((side) => (
                <g
                  key={side}
                  transform={`translate(${side * 38} 0) rotate(${side * 12})`}
                >
                  <path
                    d="M-28 -30 Q0 -38 28 -30 V0 Q22 36 0 42 Q-22 36 -28 0Z"
                    fill={paper}
                    stroke={ornament}
                    strokeWidth={sw * 1.1}
                  />
                  <path d="M-16 -7 q5 -5 10 0 M6 -7 q5 -5 10 0" />
                  <path
                    d={side === -1 ? "M-12 12 Q0 28 12 12" : "M-12 24 Q0 8 12 24"}
                    stroke={detail}
                    strokeWidth={sw * 1.15}
                  />
                </g>
              ))}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    default:
      return null;
  }
}
