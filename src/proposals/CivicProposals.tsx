import {
  Fleuron,
  FourCorners,
  MirroredCorners,
  Rosette,
  seq,
  starPoly,
  type FrameLayers,
  type ProposalContext,
} from "./primitives";

export function civicProposals(ctx: ProposalContext): FrameLayers | null {
  const { d, w, h, m, cx, sw, scale, top, bottom, paper, ornament, detail } =
    ctx;
  const count = Math.max(4, Math.round(9 * d.density));

  switch (d.template) {
    // ── WAR · GUERRA Y TESTIMONIO ──────────────────────────────────────────
    case "p_sewnletter": {
      const frame = (
        <>
          <rect
            x={m + 10}
            y={m + 10}
            width={w - 2 * m - 20}
            height={h - 2 * m - 20}
            strokeWidth={sw * 1.1}
            opacity=".65"
          />
          <rect
            x={m + 22}
            y={m + 22}
            width={w - 2 * m - 44}
            height={h - 2 * m - 44}
            strokeDasharray="12 8"
            strokeWidth={sw * 1.05}
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".4">
          {seq(count).map((i) => {
            const y = m + 88 + ((h - 2 * m - 176) * i) / (count - 1);
            return (
              <g key={i}>
                <path d={`M${m + 10} ${y - 4} l12 8 m-12 0 l12 -8`} />
                <path d={`M${w - m - 22} ${y - 4} l12 8 m-12 0 l12 -8`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) rotate(-3) scale(${0.92 * scale})`}>
              {/* Stitched coat pocket & peeking letter */}
              <path
                d="M-76 -26 H64 L76 -12 V24 H-76Z"
                fill={paper}
                stroke={ornament}
                strokeWidth={sw * 1.15}
              />
              <path d="M-76 -26 L-6 6 L64 -26" opacity=".6" />
              <path
                d="M-112 6 H112 L98 30 L0 42 L-98 30Z"
                fill={ornament}
                fillOpacity=".86"
              />
              <path
                d="M-100 14 L0 32 L100 14"
                stroke={paper}
                strokeDasharray="7 5"
              />
              <path
                d="M42 -10 C54 -14 64 -4 58 6 C54 14 40 16 36 8 C32 2 34 -8 42 -10Z"
                fill={detail}
                fillOpacity=".88"
                stroke="none"
              />
              <circle cx="64" cy="14" r="3" fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 58}) scale(${scale})`}>
              <path d="M-150 0 H150" strokeWidth={sw * 1.1} opacity=".5" />
              {[-64, -32, 0, 32, 64].map((x) => (
                <path
                  key={x}
                  d={`M${x - 6} -11 L${x + 6} 11`}
                  stroke={detail}
                  strokeWidth={sw * 1.4}
                />
              ))}
              <path d="M68 8 Q106 24 144 6 T184 14" stroke={detail} opacity=".8" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_ravinerifle": {
      const frame = (
        <>
          <rect x={m + 8} y={m + 8} width={w - 2 * m - 16} height={h - 2 * m - 16} strokeWidth={sw * 2.4} />
          <FourCorners
            ctx={ctx}
            inset={8}
            render={() => (
              <path
                d="M0 0 H54 L36 18 H18 V36 L0 54Z"
                fill={ornament}
                stroke="none"
              />
            )}
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".32">
          {seq(count).map((i) => {
            const y = m + 84 + ((h - 2 * m - 168) * i) / (count - 1);
            return (
              <g key={i}>
                <path d={`M${m + 18} ${y} l14 -6`} strokeWidth={sw * 1.3} />
                <path d={`M${w - m - 18} ${y} l-14 6`} strokeWidth={sw * 1.3} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${0.92 * scale})`}>
              <circle cx="28" cy="-10" r="34" fill={detail} stroke="none" />
              <path
                d="M-220 26 L-152 -2 -106 -22 -64 -4 -22 -26 24 6 68 -14 114 4 162 -22 220 26Z"
                fill={ornament}
                stroke="none"
              />
              <path
                d="M-136 8 l22 -14 M-44 4 l24 -18 M92 10 l18 -12"
                stroke={paper}
                strokeWidth={sw * 1.1}
              />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 62}) scale(${0.92 * scale})`}>
              <path
                d="M-220 20 L-136 4 -54 16 26 2 118 14 220 4 V28 H-220Z"
                fill={detail}
                stroke="none"
              />
              {/* Woodcut agave & sunburst crest */}
              <g transform="translate(0 8)">
                {[-54, -28, 0, 28, 54].map((a) => (
                  <path
                    key={a}
                    transform={`rotate(${a})`}
                    d="M0 0 Q-10 -24 0 -54 Q10 -24 0 0Z"
                    fill={ornament}
                    stroke={paper}
                    strokeWidth="1.2"
                  />
                ))}
                <circle cy="-6" r="7" fill={paper} stroke={ornament} />
              </g>
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_tinbowl": {
      const frame = (
        <>
          <path
            d={`M${m + 18} ${m + 34} V${h - m - 34} M${w - m - 18} ${m + 34} V${h - m - 34}`}
            strokeWidth={sw * 1.3}
            opacity=".65"
          />
          <path
            d={`M${m + 32} ${m + 52} V${h - m - 52} M${w - m - 32} ${m + 52} V${h - m - 52}`}
            opacity=".24"
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".28">
          {seq(count).map((i) => {
            const y = m + 80 + ((h - 2 * m - 160) * i) / (count - 1);
            return (
              <g key={i}>
                <path d={`M${m + 18} ${y} h14`} />
                <path d={`M${w - m - 32} ${y} h14`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 74}) scale(${scale})`}>
              <path d="M-210 -10 Q-70 22 0 4 T210 -10 M-210 -4 Q-70 14 0 10 T210 -4" opacity=".82" />
              {[-130, -48, 48, 130].map((x) => (
                <path
                  key={x}
                  transform={`translate(${x} ${Math.abs(x) < 80 ? 8 : -2})`}
                  d="M-9 -12 l7 16 6 -9 7 14 M-6 9 l9 -15"
                  stroke={detail}
                />
              ))}
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${0.92 * scale})`}>
              <path
                d="M-86 -4 Q-76 32 0 36 Q76 32 86 -4Z"
                fill={ornament}
                fillOpacity=".88"
              />
              <ellipse cy="-4" rx="86" ry="15" fill={paper} stroke={ornament} />
              {/* Gentle rising warmth steam */}
              <path d="M-22 -24 Q-30 -40 -20 -54 M4 -28 Q14 -44 4 -60 M28 -22 Q22 -36 30 -48" stroke={detail} opacity=".75" />
              <path d="M-156 42 H156" opacity=".5" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_redactedfile": {
      const frame = (
        <>
          <path
            d={`M${m + 10} ${h - m - 10} V${m + 28} H${m + 42} L${m + 56} ${m + 10} H${m + 196} L${m + 214} ${m + 28} H${w - m - 10} V${h - m - 10}Z`}
            strokeWidth={sw * 1.4}
          />
          <path
            d={`M${m + 22} ${m + 114} H${w - m - 22} M${m + 22} ${h - m - 106} H${w - m - 22}`}
            opacity=".45"
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".45">
          {seq(Math.max(4, Math.round(7 * d.density))).map((i) => {
            const y = m + 148 + ((h - 2 * m - 280) * i) / Math.max(1, Math.round(7 * d.density) - 1);
            return <circle key={i} cx={m + 24} cy={y} r="4.5" fill={paper} />;
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 72}) scale(${scale})`}>
              <rect x="-150" y="-18" width="118" height="12" fill={ornament} stroke="none" />
              <rect x="-16" y="-18" width="96" height="12" fill={ornament} stroke="none" />
              <rect x="-150" y="2" width="176" height="13" fill={ornament} stroke="none" />
              <rect x="44" y="2" width="106" height="13" fill={detail} fillOpacity=".82" stroke="none" />
              <path d="M-150 26 H150" opacity=".45" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 58}) rotate(-6) scale(${scale})`}>
              <path d="M-144 -10 H16 M-144 2 H-12 M-144 14 H10" opacity=".55" />
              <g transform="translate(88 2)" stroke={detail}>
                <circle r="30" strokeWidth={sw * 2} strokeDasharray="76 8 56 12" />
                <circle r="22" strokeWidth={sw * 0.85} />
                <path d="M-18 0 H18 M-12 7 H12" />
              </g>
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── REVOLT · REVUELTA Y DERECHOS ───────────────────────────────────────
    case "p_broadside": {
      const frame = (
        <>
          <rect x={m + 8} y={m + 8} width={w - 2 * m - 16} height={h - 2 * m - 16} strokeWidth={sw * 2.6} />
          <rect
            x={m + 22}
            y={m + 22}
            width={w - 2 * m - 44}
            height={h - 2 * m - 44}
            stroke={detail}
            strokeWidth={sw * 1.1}
          />
          <FourCorners
            ctx={ctx}
            inset={8}
            render={() => (
              <g>
                <rect width="28" height="28" fill={ornament} stroke="none" />
                <rect x="7" y="7" width="14" height="14" fill={detail} stroke="none" />
              </g>
            )}
          />
        </>
      );
      const pattern = (
        <g fill={detail} stroke="none" opacity=".78">
          {top && (
            <path d={`M${m + 54} ${m + 46} H${w - m - 54} v8 H${m + 54}Z`} />
          )}
          {bottom && (
            <path d={`M${m + 54} ${h - m - 54} H${w - m - 54} v8 H${m + 54}Z`} />
          )}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 86}) scale(${scale})`}>
              <path d="M-168 0 L-44 -14 -44 14Z" fill={ornament} stroke="none" />
              <path d="M168 0 L44 -14 44 14Z" fill={ornament} stroke="none" />
              <polygon points={starPoly(0, 0, 20, 8, 5)} fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 82}) scale(${scale})`}>
              <path d="M-170 6 L110 -12 170 -6 -110 14Z" fill={ornament} stroke="none" />
              <path d="M-126 16 L124 -4 144 2 -106 20Z" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_assembly": {
      const frame = (
        <>
          <path
            d={`M${m + 14} ${m + 116} V${m + 14} H${w - m - 14} V${m + 116} M${m + 14} ${h - m - 116} V${h - m - 14} H${w - m - 14} V${h - m - 116}`}
            strokeWidth={sw * 1.5}
          />
          <path
            d={`M${m + 24} ${m + 24} H${w - m - 24} M${m + 24} ${h - m - 24} H${w - m - 24}`}
            stroke={detail}
            opacity=".6"
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".34">
          {seq(count).map((i) => {
            const y = m + 146 + ((h - 2 * m - 292) * i) / (count - 1);
            return (
              <g key={i}>
                <path d={`M${m + 18} ${y} h12`} />
                <path d={`M${w - m - 30} ${y} h12`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 72}) scale(${0.92 * scale})`}>
              <path d="M-164 32 L-170 -34 M164 32 L170 -34" strokeWidth={sw * 1.4} />
              <path
                d="M-168 -26 Q-84 -42 0 -20 T168 -26 L164 16 Q82 32 0 12 T-164 16Z"
                fill={detail}
                fillOpacity=".9"
                stroke="none"
              />
              <path d="M-148 -4 Q-80 -18 0 0 T148 2" stroke={paper} strokeWidth={sw * 1.1} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${0.92 * scale})`}>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${-152 + i * 38} ${-18 + i * 6} Q0 ${72 - i * 32} ${152 - i * 38} ${-18 + i * 6}`}
                  strokeDasharray="24 8"
                  strokeWidth={sw * 3.8}
                />
              ))}
              <circle cy="-14" r="8" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_cancionero": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.5} />
          <rect
            x={m + 24}
            y={m + 24}
            width={w - 2 * m - 48}
            height={h - 2 * m - 48}
            stroke={detail}
            strokeWidth={sw * 0.9}
          />
          <FourCorners
            ctx={ctx}
            inset={17}
            render={() => (
              <circle r="7" fill={detail} stroke={paper} strokeWidth="2" />
            )}
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".45">
          {seq(count * 2).map((i) => {
            const px = m + 56 + ((w - 2 * m - 112) * i) / (count * 2 - 1);
            const py = m + 56 + ((h - 2 * m - 112) * i) / (count * 2 - 1);
            return (
              <g key={i}>
                {top && <circle cx={px} cy={m + 17} r="2.2" fill={ornament} stroke="none" />}
                {bottom && <circle cx={px} cy={h - m - 17} r="2.2" fill={ornament} stroke="none" />}
                <circle cx={m + 17} cy={py} r="2.2" fill={ornament} stroke="none" />
                <circle cx={w - m - 17} cy={py} r="2.2" fill={ornament} stroke="none" />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 70}) scale(${scale})`} stroke={detail}>
              <path d="M-156 0 H-38 M38 0 H156" strokeWidth={sw * 1.1} />
              <path
                d="M-28 0 Q-10 -3 0 -22 Q10 -3 28 0 Q10 3 0 22 Q-10 3 -28 0Z"
                fill={detail}
              />
              <circle r="4.5" fill={paper} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`}>
              <Fleuron size={0.95} color={detail} />
              <path d="M-124 6 Q-68 -10 -30 4 M124 6 Q68 -10 30 4" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_doleances": {
      const frame = (
        <>
          <rect x={m + 16} y={m + 12} width={w - 2 * m - 32} height={h - 2 * m - 24} strokeWidth={sw * 1.2} />
          <path
            d={`M${m + 34} ${m + 12} V${h - m - 12}`}
            stroke={detail}
            strokeWidth={sw * 0.9}
            opacity=".65"
          />
          <rect
            x={m + 24}
            y={m + 20}
            width={w - 2 * m - 48}
            height={h - 2 * m - 40}
            opacity=".32"
          />
        </>
      );
      const stitches = Math.max(5, Math.round(8 * d.density));
      const pattern = (
        <g stroke={detail} strokeWidth={sw * 1.4} opacity=".78">
          {seq(stitches).map((i) => {
            const y = m + 88 + ((h - 2 * m - 176) * i) / (stitches - 1);
            return <path key={i} d={`M${m + 8} ${y} H${m + 26}`} />;
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 68}) scale(${scale})`}>
              <path d="M-140 0 H-36 M36 0 H140" opacity=".6" />
              <Fleuron size={0.9} color={ornament} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${0.92 * scale})`}>
              <path d="M-168 12 H-44 M44 12 H168" opacity=".55" />
              <path d="M-158 6 Q-130 -18 -116 4 T-76 2" stroke={ornament} opacity=".72" />
              <path d="M62 6 Q88 -14 106 4 T148 2" stroke={ornament} opacity=".72" />
              {/* Wax seal with ribbons */}
              <path d="M-12 16 L-18 40 0 32 18 40 12 16" fill={detail} fillOpacity=".28" stroke={detail} />
              <circle cy="8" r="17" fill={detail} stroke={paper} strokeWidth="2" />
              <circle cy="8" r="11" stroke={paper} opacity=".75" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── LABOR · OBREROS Y MÁQUINAS ─────────────────────────────────────────
    case "p_shift": {
      const cut = 34;
      const frame = (
        <>
          {/* Timecard chamfered top-right corner */}
          <path
            d={`M${m + 12} ${m + 12} H${w - m - 12 - cut} L${w - m - 12} ${m + 12 + cut} V${h - m - 12} H${m + 12}Z`}
            strokeWidth={sw * 1.4}
          />
          <path
            d={`M${m + 34} ${m + 12} V${h - m - 12} M${w - m - 34} ${m + 12 + cut} V${h - m - 12}`}
            opacity=".36"
          />
        </>
      );
      const holes = Math.max(6, Math.round(11 * d.density));
      const pattern = (
        <g fill={detail} stroke="none" opacity=".52">
          {seq(holes).map((i) => {
            const y = m + 76 + ((h - 2 * m - 152) * i) / (holes - 1);
            return (
              <g key={i}>
                <circle cx={m + 23} cy={y} r="3.5" />
                <circle cx={w - m - 23} cy={y} r="3.5" />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${0.92 * scale})`}>
              <circle cx="116" cy="-14" r="22" fill={detail} stroke="none" />
              <path
                d="M-168 24 V-6 L-120 -32 V-6 L-72 -32 V-6 L-24 -32 V-6 H32 L36 -44 H50 L54 -6 H168 V24Z"
                fill={ornament}
                stroke="none"
              />
              <path d="M-152 10 H12" stroke={paper} strokeWidth={sw * 3.5} strokeDasharray="10 7" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 54}) scale(${scale})`}>
              <path d="M-160 0 H160" strokeWidth={sw * 1.2} />
              {seq(13).map((i) => (
                <rect
                  key={i}
                  x={-144 + i * 24 - 5}
                  y="-12"
                  width="10"
                  height="12"
                  fill={i % 2 === 0 ? detail : ornament}
                  stroke="none"
                />
              ))}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_shuttle": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.1} opacity=".6" />
          <path
            d={`M${m + 28} ${m + 10} V${h - m - 10} M${w - m - 28} ${m + 10} V${h - m - 10}`}
            stroke={detail}
            opacity=".52"
          />
        </>
      );
      const weave = Math.max(8, Math.round(14 * d.density));
      const pattern = (
        <g stroke={ornament} opacity=".48">
          {seq(weave).map((i) => {
            const y = m + 34 + ((h - 2 * m - 68) * i) / (weave - 1);
            return (
              <g key={i}>
                <path d={`M${m + 10} ${y} h18`} strokeWidth={i % 2 === 0 ? sw * 1.8 : sw * 0.7} />
                <path d={`M${w - m - 28} ${y} h18`} strokeWidth={i % 2 === 1 ? sw * 1.8 : sw * 0.7} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 74}) scale(${0.9 * scale})`}>
              <path d="M-210 0 Q-140 -18 -70 0 T70 0 T210 0" stroke={detail} />
              <path
                d="M-112 0 Q-58 -30 0 -20 Q58 -30 112 0 Q58 28 0 20 Q-58 28 -112 0Z"
                fill={ornament}
                stroke="none"
              />
              <rect x="-42" y="-11" width="84" height="22" rx="11" fill={paper} stroke="none" />
              <path d="M-28 0 H28" stroke={detail} strokeWidth="14" strokeDasharray="4 3" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 58}) scale(${0.92 * scale})`}>
              {seq(13).map((i) => (
                <path key={i} d={`M${-144 + i * 24} -26 V26`} opacity=".65" />
              ))}
              {[-14, 0, 14].map((y, idx) => (
                <path
                  key={y}
                  d={`M-162 ${y} H162`}
                  stroke={detail}
                  strokeWidth={sw * 2.6}
                  strokeDasharray="16 8"
                  strokeDashoffset={idx * 10}
                />
              ))}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_press": {
      const frame = (
        <>
          <rect x={m + 8} y={m + 8} width={w - 2 * m - 16} height={h - 2 * m - 16} strokeWidth={sw * 1.8} />
          <rect x={m + 20} y={m + 20} width={w - 2 * m - 40} height={h - 2 * m - 40} strokeWidth={sw * 0.75} opacity=".6" />
          <FourCorners
            ctx={ctx}
            inset={8}
            render={() => (
              <g>
                <path d="M0 0 H34 V12 H12 V34 H0Z" fill={ornament} stroke="none" />
                <path d="M18 18 L34 34" stroke={detail} strokeWidth={sw * 1.1} />
              </g>
            )}
          />
        </>
      );
      const ticks = Math.max(10, Math.round(16 * d.density));
      const pattern = (
        <g stroke={ornament} opacity=".42">
          {seq(ticks).map((i) => {
            const x = m + 64 + ((w - 2 * m - 128) * i) / (ticks - 1);
            return (
              <g key={i}>
                {top && <path d={`M${x} ${m + 20} v${i % 4 === 0 ? 12 : 6}`} />}
                {bottom && <path d={`M${x} ${h - m - 20} v-${i % 4 === 0 ? 12 : 6}`} />}
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 68}) scale(${scale})`}>
              <path d="M-168 0 H-32 M32 0 H168 M-132 -6 H-38 M38 -6 H132" strokeWidth={sw * 0.9} />
              <rect x="-18" y="-12" width="36" height="24" fill={detail} stroke="none" />
              <path d="M-8 -4 H8 M-8 4 H8" stroke={paper} strokeWidth="2" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 58}) scale(${scale})`}>
              <path d="M-148 0 H-26 M26 0 H148" strokeWidth={sw * 0.9} />
              <path d="M-16 0 L0 -12 16 0 0 12Z" fill={ornament} stroke="none" />
              <circle r="4" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── LEISURE · DESCANSO Y GOZO ──────────────────────────────────────────
    case "p_hammock": {
      const frame = (
        <>
          <path
            d={`M${m + 14} ${m + 132} Q${m + 14} ${m + 14} ${m + 132} ${m + 14} H${w - m - 132} Q${w - m - 14} ${m + 14} ${w - m - 14} ${m + 132} V${h - m - 132} Q${w - m - 14} ${h - m - 14} ${w - m - 132} ${h - m - 14} H${m + 132} Q${m + 14} ${h - m - 14} ${m + 14} ${h - m - 132}Z`}
            strokeWidth={sw * 1.2}
          />
          <path
            d={`M${m + 26} ${m + 132} V${h - m - 132} M${w - m - 26} ${m + 132} V${h - m - 132}`}
            opacity=".26"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".35">
          {top &&
            seq(Math.max(4, Math.round(7 * d.density))).map((i) => {
              const a = -75 + (150 * i) / (Math.max(4, Math.round(7 * d.density)) - 1);
              return (
                <path
                  key={i}
                  transform={`translate(${cx} ${m + 68}) rotate(${a})`}
                  d="M0 -30 V-48"
                />
              );
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 72}) scale(${scale})`}>
              <circle r="22" fill={detail} fillOpacity=".86" stroke="none" />
              <path d="M-112 18 Q-56 10 0 18 T112 18 M-74 28 Q-36 22 0 28 T74 28" stroke={ornament} opacity=".7" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 72}) scale(${0.92 * scale})`}>
              <path d="M-178 -36 L-154 -24 M154 -24 L178 -36" strokeWidth={sw * 2} />
              <path
                d="M-154 -24 Q0 52 154 -24 Q4 96 -154 -24Z"
                fill={ornament}
                fillOpacity=".86"
              />
              <path d="M-136 -16 Q0 60 136 -16" stroke={paper} strokeDasharray="6 6" />
              {[-80, -40, 0, 40, 80].map((x) => (
                <path
                  key={x}
                  d={`M${x} ${30 - Math.abs(x) * 0.24} v14`}
                  stroke={detail}
                />
              ))}
              <circle cx="-154" cy="-24" r="5" fill={detail} stroke="none" />
              <circle cx="154" cy="-24" r="5" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_longtable": {
      const frame = (
        <>
          <rect x={m + 12} y={m + 12} width={w - 2 * m - 24} height={h - 2 * m - 24} strokeWidth={sw * 1.1} />
          <rect
            x={m + 22}
            y={m + 22}
            width={w - 2 * m - 44}
            height={h - 2 * m - 44}
            stroke={detail}
            strokeDasharray="6 6"
            opacity=".65"
          />
        </>
      );
      const pattern = (
        <g fill={ornament} stroke="none" opacity=".26">
          {seq(count).map((i) => {
            const y = m + 100 + ((h - 2 * m - 200) * i) / (count - 1);
            return (
              <g key={i}>
                <circle cx={m + 17} cy={y} r="2.2" />
                <circle cx={w - m - 17} cy={y} r="2.2" />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 62}) scale(${0.92 * scale})`}>
              <path d="M-210 -24 Q0 28 210 -24" />
              {[-2, -1, 0, 1, 2].map((i) => (
                <g
                  key={i}
                  transform={`translate(${i * 68} ${4 - i * i * 3.4}) rotate(${-i * 5})`}
                >
                  <path
                    d="M-24 -2 H24 V24 L12 18 0 26 -12 18 -24 24Z"
                    fill={i % 2 === 0 ? ornament : detail}
                    stroke="none"
                  />
                  <circle cy="10" r="4" fill={paper} stroke="none" />
                </g>
              ))}
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 62}) scale(${0.92 * scale})`}>
              <path d="M-168 24 H168" opacity=".45" />
              {[-1, 1].map((side) => (
                <g key={side} transform={`translate(${side * 46} 0) rotate(${side * 14})`}>
                  <path d="M-44 -12 H44 A44 44 0 0 1 -44 -12Z" fill={ornament} stroke="none" />
                  <path d="M-38 -12 H38 A38 38 0 0 1 -38 -12Z" fill={detail} stroke={paper} strokeWidth="2" />
                  {[-16, 0, 16].map((sx) => (
                    <circle key={sx} cx={sx} cy={sx === 0 ? 10 : 2} r="2.3" fill={paper} stroke="none" />
                  ))}
                </g>
              ))}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_courtyard": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.3} />
          <rect
            x={m + 22}
            y={m + 22}
            width={w - 2 * m - 44}
            height={h - 2 * m - 44}
            stroke={detail}
            strokeWidth={sw * 0.85}
          />
          <MirroredCorners
            ctx={ctx}
            inset={10}
            render={() => (
              <path
                d="M0 96 C24 96 42 78 42 54 C42 48 48 42 54 42 C78 42 96 24 96 0"
                stroke={ornament}
                strokeWidth={sw * 1.15}
              />
            )}
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".34">
          {seq(count).map((i) => {
            const x = m + 120 + ((w - 2 * m - 240) * i) / (count - 1);
            return (
              <g key={i}>
                {top && <path d={`M${x} ${m + 12} l4 4 -4 4 -4 -4Z`} fill={detail} stroke="none" />}
                {bottom && <path d={`M${x} ${h - m - 20} l4 4 -4 4 -4 -4Z`} fill={detail} stroke="none" />}
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          <FourCorners
            ctx={ctx}
            inset={38}
            render={() => (
              <g transform={`scale(${0.86 * scale})`}>
                <Rosette r={26} petals={8} fillOpacity={0.22} stroke={ornament} centerFill={paper} />
                <circle r="5" fill={detail} stroke="none" />
              </g>
            )}
          />
          {top && (
            <g transform={`translate(${cx} ${m + 64}) scale(${scale})`} stroke={detail}>
              <path d="M-86 0 H-24 M24 0 H86" />
              <polygon points={starPoly(0, 0, 14, 6, 8)} fill={detail} fillOpacity=".28" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              <path d="M-86 0 H-24 M24 0 H86" />
              <polygon points={starPoly(0, 0, 14, 6, 8)} fill={ornament} fillOpacity=".24" stroke={ornament} />
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
