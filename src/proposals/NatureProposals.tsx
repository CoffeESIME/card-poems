import {
  BorderMask,
  FourCorners,
  seq,
  starPoly,
  type FrameLayers,
  type ProposalContext,
} from "./primitives";

function GinkgoLeaf({ size = 1, color }: { size?: number; color?: string }) {
  return (
    <g transform={`scale(${size})`} stroke={color}>
      <path
        d="M0 32 C-42 6 -58 -24 -46 -46 C-26 -58 -8 -44 0 -30 C8 -44 26 -58 46 -46 C58 -24 42 6 0 32Z"
        fill={color ?? "currentColor"}
        fillOpacity=".13"
      />
      {[-34, -18, 0, 18, 34].map((x) => (
        <path key={x} d={`M0 32 Q${x * 0.55} -4 ${x} -42`} opacity=".6" />
      ))}
      <path d="M0 32 Q-3 48 -8 62" />
    </g>
  );
}

function RuyiCloud({ scale = 1, flip = false }: { scale?: number; flip?: boolean }) {
  return (
    <g transform={`scale(${flip ? -scale : scale} ${scale})`}>
      <path
        d="M-112 20 H88 C122 20 128 -16 104 -25 C86 -32 72 -18 80 -6 C86 2 98 -2 95 -10 M-82 20 C-116 20 -118 -14 -96 -25 C-84 -32 -70 -26 -66 -14 C-74 -64 -16 -78 4 -46 C22 -86 76 -68 78 -34 C104 -46 120 -30 118 -10"
        fill="none"
      />
      <path
        d="M-58 6 H58 C80 6 82 -12 68 -18 C54 -24 46 -10 54 -3 M-58 6 C-74 6 -76 -12 -62 -18"
        opacity=".55"
      />
      <path d="M-132 34 H32 M56 34 H128" opacity=".38" />
    </g>
  );
}

function TopoRing({
  x,
  y,
  count,
  scale,
  phase,
}: {
  x: number;
  y: number;
  count: number;
  scale: number;
  phase: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none">
      {seq(count).map((i) => {
        const rad = 24 + i * 16;
        const pts = seq(72).map((j) => {
          const a = (j / 72) * Math.PI * 2;
          const r =
            rad *
            (1 + 0.14 * Math.sin(3 * a + phase) + 0.08 * Math.cos(5 * a - phase));
          return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r * 0.74).toFixed(1)}`;
        });
        return (
          <path
            key={i}
            d={`M${pts.join(" L")}Z`}
            opacity={i % 4 === 0 ? 0.52 : 0.24}
          />
        );
      })}
    </g>
  );
}

export function natureProposals(ctx: ProposalContext): FrameLayers | null {
  const { d, id, w, h, m, cx, cy, sw, scale, top, bottom, paper, ornament, detail } =
    ctx;
  const count = Math.max(3, Math.round(8 * d.density));

  switch (d.template) {
    // ── NATURE ─────────────────────────────────────────────────────────────
    case "p_botanical": {
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.2} />
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            stroke={detail}
            strokeWidth={sw * 0.75}
            opacity=".7"
          />
          <FourCorners
            ctx={ctx}
            inset={0}
            render={() => (
              <path d="M0 0 L14 14 M0 32 H14 M32 0 V14" stroke={detail} strokeWidth={sw * 0.8} />
            )}
          />
        </>
      );
      const pattern = (
        <g opacity=".36" stroke={ornament}>
          {seq(count * 2).map((i) => {
            const y = m + 80 + ((h - 2 * m - 160) * i) / (count * 2 - 1);
            return (
              <g key={i}>
                <path d={`M${m + 14} ${y} h${i % 4 === 0 ? 12 : 6}`} />
                <path d={`M${w - m - 14} ${y} h-${i % 4 === 0 ? 12 : 6}`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${m + 88} ${m + 88}) rotate(132) scale(${0.88 * scale})`}>
              <GinkgoLeaf size={1.15} color={ornament} />
              <g transform="translate(46 28) rotate(32)">
                <GinkgoLeaf size={0.7} color={detail} />
              </g>
            </g>
          )}
          {bottom && (
            <g transform={`translate(${w - m - 88} ${h - m - 88}) rotate(-48) scale(${0.88 * scale})`}>
              <GinkgoLeaf size={1.15} color={ornament} />
              <g transform="translate(-44 26) rotate(-28)">
                <GinkgoLeaf size={0.7} color={detail} />
              </g>
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52})`} stroke={detail}>
              <path d="M-92 0 H-18 M18 0 H92" />
              <path d="M0 -8 L8 0 0 8 -8 0Z" fill={detail} fillOpacity=".28" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_willow": {
      const frame = (
        <>
          <path
            d={`M${m + 18} ${m + 18} V${h - m - 18} H${w - m - 18}`}
            opacity=".38"
          />
          <path
            d={`M${m + 18} ${m + 18} H${w - m - 18} V${m + 120}`}
            stroke={detail}
            opacity=".45"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".45">
          {bottom &&
            seq(4).map((i) => (
              <ellipse
                key={i}
                cx={w * 0.65}
                cy={h - m - 56}
                rx={44 + i * 38 * scale}
                ry={5 + i * 5 * scale}
                opacity={0.55 - i * 0.1}
              />
            ))}
          {bottom &&
            seq(3).map((i) => (
              <ellipse
                key={`l-${i}`}
                cx={w * 0.28}
                cy={h - m - 42}
                rx={28 + i * 24 * scale}
                ry={4 + i * 4 * scale}
                opacity={0.42 - i * 0.1}
              />
            ))}
        </g>
      );
      const strands = Math.max(4, Math.round(7 * d.density));
      const ornaments = (
        <>
          {top && (
            <g>
              <path
                d={`M${w - m - 22} ${m + 20} Q${w * 0.68} ${m + 24} ${w * 0.44} ${m + 54}`}
                strokeWidth={sw * 1.8}
              />
              {seq(strands).map((i) => {
                const x = w - m - 46 - i * ((w * 0.44) / strands);
                const len = (108 + 54 * Math.sin(i * 1.15)) * Math.min(1.25, scale);
                return (
                  <g key={i} transform={`translate(${x} ${m + 28 + i * 3})`}>
                    <path d={`M0 0 Q-22 ${len * 0.5} -10 ${len}`} strokeWidth={sw * 0.85} />
                    {seq(5).map((j) => {
                      const ly = 18 + (j * (len - 22)) / 5;
                      const lx = -12 * Math.sin((j / 5) * Math.PI);
                      return (
                        <path
                          key={j}
                          transform={`translate(${lx} ${ly})`}
                          d="M0 0 Q-18 10 -12 30 Q-2 16 0 0 M0 4 Q14 14 6 32 Q0 18 0 4"
                          fill={ornament}
                          fillOpacity=".24"
                        />
                      );
                    })}
                  </g>
                );
              })}
            </g>
          )}
          {bottom && (
            <g transform={`translate(${w * 0.64} ${h - m - 58}) rotate(14) scale(${scale})`} stroke={detail}>
              <path d="M-24 0 Q0 -12 28 0 Q0 12 -24 0Z" fill={detail} fillOpacity=".22" />
              <path d="M-24 0 H28" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_meadow": {
      const frame = (
        <>
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            opacity=".36"
          />
          <path
            d={`M${m + 14} ${m + 96} V${m + 14} H${m + 96} M${w - m - 96} ${m + 14} H${w - m - 14} V${m + 96}`}
            stroke={detail}
            strokeWidth={sw * 1.1}
          />
        </>
      );
      const pattern = (
        <g fill={detail} stroke="none" opacity=".48">
          {top &&
            seq(count + 5).map((i) => (
              <circle
                key={i}
                cx={m + 72 + ((w - 2 * m - 144) * i) / (count + 4)}
                cy={m + 56 + Math.sin(i * 2.1) * 20}
                r={i % 3 === 0 ? 3 : 1.5}
              />
            ))}
        </g>
      );
      const stalks = Math.max(7, Math.round(11 * d.density));
      const ornaments = (
        <>
          {bottom && (
            <g transform={`translate(0 ${h - m - 22})`}>
              <path d={`M${m + 34} 0 Q${cx} -8 ${w - m - 34} 0`} opacity=".55" />
              {seq(stalks).map((i) => {
                const x = m + 64 + ((w - 2 * m - 128) * i) / (stalks - 1);
                const tall = (76 + 44 * (0.5 + 0.5 * Math.sin(i * 2.4))) * Math.min(1.18, scale);
                const lean = Math.sin(i * 1.7) * 14;
                const col = i % 3 === 0 ? detail : ornament;
                return (
                  <g key={i} transform={`translate(${x} 0)`} stroke={col}>
                    <path d={`M0 0 Q${lean * 0.4} ${-tall * 0.5} ${lean} ${-tall}`} />
                    {i % 3 === 0 ? (
                      <g transform={`translate(${lean} ${-tall})`}>
                        {seq(6).map((p) => (
                          <ellipse
                            key={p}
                            cy="-9"
                            rx="3.5"
                            ry="9"
                            transform={`rotate(${p * 60})`}
                            fill={col}
                            fillOpacity=".22"
                          />
                        ))}
                        <circle r="3.5" fill={paper} />
                      </g>
                    ) : i % 3 === 1 ? (
                      <g transform={`translate(${lean} ${-tall})`}>
                        {seq(4).map((g) => (
                          <path
                            key={g}
                            d={`M0 ${g * 9} q-11 -6 -9 -14 M0 ${g * 9 + 3} q11 -6 9 -14`}
                          />
                        ))}
                      </g>
                    ) : (
                      <g transform={`translate(${lean} ${-tall})`}>
                        <path d="M0 0 L-12 -14 M0 0 L12 -14 M0 0 V-18" />
                        <circle cx="-12" cy="-14" r="2.5" fill={col} stroke="none" />
                        <circle cx="12" cy="-14" r="2.5" fill={col} stroke="none" />
                        <circle cx="0" cy="-18" r="2.5" fill={col} stroke="none" />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── TAO ────────────────────────────────────────────────────────────────
    case "p_watercourse": {
      const frame = (
        <path
          d={`M${m + 78} ${m + 16} H${m + 16} V${m + 78} M${w - m - 78} ${m + 16} H${w - m - 16} V${m + 78} M${m + 16} ${h - m - 78} V${h - m - 16} H${m + 78} M${w - m - 78} ${h - m - 16} H${w - m - 16} V${h - m - 78}`}
          opacity=".48"
        />
      );
      const ribbons = Math.max(2, Math.round(3 * d.density));
      const pattern = (
        <g opacity=".3" stroke={ornament}>
          {seq(ribbons).map((i) => {
            const dx = i * 11;
            return (
              <g key={i}>
                <path
                  d={`M${m + 34 + dx} ${m + 36} C${m + 96 + dx} ${h * 0.25} ${m + 8 + dx} ${h * 0.55} ${m + 68 + dx} ${h - m - 36}`}
                  strokeWidth={i === 0 ? sw * 1.4 : sw * 0.75}
                />
                <path
                  d={`M${w - m - 34 - dx} ${m + 36} C${w - m - 96 - dx} ${h * 0.3} ${w - m - 8 - dx} ${h * 0.6} ${w - m - 68 - dx} ${h - m - 36}`}
                  strokeWidth={i === 0 ? sw * 1.1 : sw * 0.65}
                  opacity=".55"
                />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w - m - 102} ${m + 82}) scale(${scale})`} stroke={detail}>
              <circle r="28" fill={detail} fillOpacity=".12" />
              <path d="M-56 0 H-36 M36 0 H56" opacity=".5" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52}) scale(${scale})`} stroke={detail}>
              <path d="M-150 0 Q-112 -16 -74 0 T2 0 T78 0 T150 0" />
              <path d="M-92 14 H92" opacity=".55" />
              <path d="M84 -12 Q104 -20 120 -6 Q100 0 84 -12Z" fill={detail} fillOpacity=".24" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_harmony": {
      const frame = (
        <>
          <path
            d={`M${m + 52} ${m + 68} Q${cx} ${m + 4} ${w - m - 52} ${m + 68} M${m + 52} ${h - m - 68} Q${cx} ${h - m - 4} ${w - m - 52} ${h - m - 68}`}
            strokeWidth={sw * 1.1}
            opacity=".65"
          />
          <path
            d={`M${m + 24} ${m + 145} V${h - m - 145} M${w - m - 24} ${m + 145} V${h - m - 145}`}
            opacity=".32"
          />
        </>
      );
      const pattern = (
        <g opacity=".2" stroke={ornament}>
          {seq(Math.max(2, Math.round(4 * d.density))).map((i) => (
            <g key={i}>
              <path
                d={`M${m + 42 + i * 10} ${m + 160} Q${m + 4 + i * 10} ${cy} ${m + 42 + i * 10} ${h - m - 160}`}
              />
              <path
                d={`M${w - m - 42 - i * 10} ${m + 160} Q${w - m - 4 - i * 10} ${cy} ${w - m - 42 - i * 10} ${h - m - 160}`}
              />
            </g>
          ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 82}) scale(${0.86 * scale})`}>
              <circle r="44" fill={paper} stroke={ornament} strokeWidth={sw * 1.1} />
              <path
                d="M0 -44 A44 44 0 0 1 0 44 A22 22 0 0 0 0 0 A22 22 0 0 1 0 -44Z"
                fill={ornament}
                stroke="none"
              />
              <circle cy="-22" r="5.5" fill={ornament} stroke="none" />
              <circle cy="22" r="5.5" fill={paper} stroke="none" />
              <circle r="56" stroke={detail} strokeDasharray="4 6" opacity=".68" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 58}) scale(${scale})`} stroke={detail}>
              <path d="M-84 0 H-18 M18 0 H84" />
              <circle r="6" fill={paper} />
              <circle r="2.2" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_ruyi": {
      const frame = (
        <>
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            opacity=".36"
          />
          <FourCorners
            ctx={ctx}
            inset={14}
            render={() => (
              <path
                d="M0 44 V0 H44 M0 16 H28 V28 H16 V16"
                stroke={detail}
                strokeWidth={sw * 0.95}
              />
            )}
          />
        </>
      );
      const pattern = (
        <g opacity=".18" stroke={ornament}>
          {seq(count).map((i) => (
            <g key={i}>
              {top && (
                <path
                  d={`M${m + 34} ${m + 42 + i * 10} C${w * 0.35} ${m + 20 + i * 10} ${w * 0.65} ${m + 64 + i * 8} ${w - m - 34} ${m + 36 + i * 10}`}
                />
              )}
              {bottom && (
                <path
                  d={`M${m + 34} ${h - m - 42 - i * 10} C${w * 0.35} ${h - m - 64 - i * 8} ${w * 0.65} ${h - m - 20 - i * 10} ${w - m - 34} ${h - m - 36 - i * 10}`}
                />
              )}
            </g>
          ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <>
              <g transform={`translate(${m + 156} ${m + 88})`}>
                <RuyiCloud scale={0.78 * scale} />
              </g>
              <g transform={`translate(${w - m - 134} ${m + 66})`} stroke={detail}>
                <RuyiCloud scale={0.54 * scale} flip />
              </g>
            </>
          )}
          {bottom && (
            <>
              <g transform={`translate(${w - m - 156} ${h - m - 76})`}>
                <RuyiCloud scale={0.78 * scale} flip />
              </g>
              <g transform={`translate(${m + 134} ${h - m - 62})`} stroke={detail}>
                <RuyiCloud scale={0.54 * scale} />
              </g>
            </>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── MOUNTAIN ───────────────────────────────────────────────────────────
    case "p_topography": {
      const maskId = `${id}-p-topo-mask`;
      const rings = Math.max(5, Math.round(9 * d.density));
      const pattern = (
        <g mask={`url(#${maskId})`}>
          <defs>
            <BorderMask maskId={maskId} w={w} h={h} x={m + 136} y={m + 136} />
          </defs>
          <TopoRing x={m + 34} y={m + 44} count={rings} scale={scale} phase={0.7} />
          <TopoRing x={w - m - 38} y={h - m - 46} count={rings} scale={scale} phase={2.2} />
        </g>
      );
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 1.1} opacity=".6" />
          <path
            d={`M${w - m - 66} ${m + 148} Q${w - m - 112} ${h * 0.42} ${w - m - 64} ${h * 0.62} T${w - m - 74} ${h - m - 154}`}
            stroke={detail}
            strokeDasharray="5 9"
            opacity=".72"
          />
          {seq(count).map((i) => {
            const x = m + 64 + ((w - 2 * m - 128) * i) / (count - 1);
            return (
              <g key={i} opacity=".45">
                {top && <path d={`M${x} ${m + 10} v10`} />}
                {bottom && <path d={`M${x} ${h - m - 10} v-10`} />}
              </g>
            );
          })}
        </>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w - m - 74} ${m + 74}) scale(${scale})`} stroke={detail}>
              <circle r="26" fill={paper} />
              <path d="M0 -18 L8 10 0 4 -8 10Z" fill={detail} fillOpacity=".24" />
              <path d="M0 -34 v6 M0 28 v6 M-34 0 h6 M28 0 h6" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52}) scale(${scale})`} stroke={detail}>
              <path d="M-24 12 L0 -26 24 12Z" fill={paper} />
              <circle cy="0" r="2.5" fill={detail} stroke="none" />
              <path d="M-86 12 H-34 M34 12 H86" opacity=".6" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_shanshui": {
      const base = h - m - 24;
      const frame = (
        <>
          <rect
            x={m + 12}
            y={m + 12}
            width={w - 2 * m - 24}
            height={h - 2 * m - 24}
            opacity=".38"
          />
          <path
            d={`M${m + 12} ${m + 90} V${m + 12} H${m + 90} M${w - m - 90} ${m + 12} H${w - m - 12} V${m + 90}`}
            stroke={detail}
            opacity=".58"
          />
        </>
      );
      const pattern = (
        <g transform={`translate(0 ${base})`} stroke="none" fill={ornament}>
          {bottom && (
            <>
              <path
                d={`M${m + 12} 0 V-86 Q${w * 0.16} -205 ${w * 0.34} -132 T${w * 0.64} -144 T${w - m - 12} -106 V0Z`}
                opacity=".08"
              />
              <path
                d={`M${m + 12} 0 V-66 Q${w * 0.25} -156 ${w * 0.44} -92 T${w * 0.78} -108 T${w - m - 12} -48 V0Z`}
                opacity=".14"
              />
              <path
                d={`M${m + 12} 0 V-30 Q${w * 0.22} -96 ${w * 0.42} -56 T${w * 0.72} -66 T${w - m - 12} -24 V0Z`}
                opacity=".23"
              />
              <path
                d={`M${m + 12} 0 Q${w * 0.24} -44 ${w * 0.48} -16 T${w - m - 12} -8 V10 H${m + 12}Z`}
                opacity=".32"
              />
            </>
          )}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w * 0.72} ${m + 84}) scale(${scale})`} stroke={detail}>
              <circle r="32" fill={detail} fillOpacity=".13" />
              <path d="M-76 0 H-42 M42 0 H76" opacity=".4" />
            </g>
          )}
          {bottom && (
            <>
              <path
                d={`M${m + 130} ${base - 72} H${w - m - 90} M${m + 60} ${base - 96} H${w * 0.46}`}
                stroke={paper}
                strokeWidth="7"
                strokeLinecap="round"
                opacity=".72"
              />
              <g transform={`translate(${w * 0.18} ${base - 22}) scale(${scale})`}>
                <path
                  d="M0 0 V-62 M-22 -14 L0 -42 22 -14 M-16 -32 L0 -58 16 -32 M-10 -48 L0 -66 10 -48"
                  strokeWidth={sw * 1.15}
                />
              </g>
            </>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_glacier": {
      const base = h - m - 26;
      const frame = (
        <>
          <path
            d={`M${m + 16} ${m + 110} V${m + 16} H${m + 110} M${w - m - 110} ${m + 16} H${w - m - 16} V${m + 110} M${m + 16} ${h - m - 110} V${h - m - 16} H${w - m - 16} V${h - m - 110}`}
            opacity=".55"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".45">
          {top &&
            seq(count).map((i) => {
              const x = m + 110 + ((w - 2 * m - 220) * i) / (count - 1);
              const y = m + 58 + Math.sin(i * 2.2) * 20;
              return <path key={i} d={`M${x - 4} ${y} h8 M${x} ${y - 4} v8`} />;
            })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${0.86 * scale})`} stroke={detail}>
              {[0, 60, 120].map((a) => (
                <path
                  key={a}
                  transform={`rotate(${a})`}
                  d="M0 -34 V34 M-8 -22 L0 -14 8 -22 M-8 22 L0 14 8 22"
                />
              ))}
              <circle r="6" fill={paper} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(0 ${base})`}>
              <path
                d={`M${m + 36} 0 L${w * 0.24} -94 ${w * 0.35} -44 ${w * 0.5} -162 ${w * 0.64} -48 ${w * 0.77} -118 ${w - m - 36} 0Z`}
                fill={ornament}
                fillOpacity=".09"
              />
              {/* Shaded facets */}
              <path
                d={`M${w * 0.5} -162 L${w * 0.54} 0 L${w * 0.64} -48Z M${w * 0.77} -118 L${w * 0.8} 0 L${w - m - 36} 0Z M${w * 0.24} -94 L${w * 0.28} 0 L${w * 0.35} -44Z`}
                fill={ornament}
                fillOpacity=".16"
                stroke="none"
              />
              <path
                d={`M${w * 0.24} -94 L${w * 0.28} 0 M${w * 0.5} -162 L${w * 0.54} 0 M${w * 0.77} -118 L${w * 0.8} 0`}
                opacity=".7"
              />
              <path d={`M${m + 36} 0 H${w - m - 36}`} stroke={detail} strokeWidth={sw * 1.1} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── WANDERER ───────────────────────────────────────────────────────────
    case "p_cartography": {
      const segsX = Math.max(8, Math.round(12 * d.density));
      const segsY = Math.max(8, Math.round((segsX * h) / w));
      const bw = w - 2 * m - 24;
      const bh = h - 2 * m - 24;
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.1} />
          <rect
            x={m + 12}
            y={m + 12}
            width={bw}
            height={bh}
            strokeWidth={sw * 0.9}
          />
          {seq(segsX).map(
            (i) =>
              i % 2 === 0 && (
                <g key={`x-${i}`} fill={ornament} stroke="none" opacity=".68">
                  <rect x={m + 12 + (bw * i) / segsX} y={m} width={bw / segsX} height={12} />
                  <rect
                    x={m + 12 + (bw * i) / segsX}
                    y={h - m - 12}
                    width={bw / segsX}
                    height={12}
                  />
                </g>
              ),
          )}
          {seq(segsY).map(
            (i) =>
              i % 2 === 0 && (
                <g key={`y-${i}`} fill={ornament} stroke="none" opacity=".68">
                  <rect x={m} y={m + 12 + (bh * i) / segsY} width={12} height={bh / segsY} />
                  <rect
                    x={w - m - 12}
                    y={m + 12 + (bh * i) / segsY}
                    width={12}
                    height={bh / segsY}
                  />
                </g>
              ),
          )}
        </>
      );
      const pattern = (
        <FourCorners
          ctx={ctx}
          inset={12}
          render={() => (
            <g stroke={ornament} opacity=".22">
              {[18, 36, 54, 72].map((a) => (
                <path
                  key={a}
                  d={`M0 0 L${(Math.cos((a * Math.PI) / 180) * 110).toFixed(1)} ${(Math.sin((a * Math.PI) / 180) * 110).toFixed(1)}`}
                />
              ))}
            </g>
          )}
        />
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 74}) scale(${0.86 * scale})`} stroke={detail}>
              <circle r="30" fill={paper} />
              <polygon points={starPoly(0, 0, 36, 9, 4)} fill={paper} stroke={ornament} />
              <path d="M0 -36 L9 -9 0 0Z M0 36 L-9 9 0 0Z" fill={detail} stroke="none" />
              <path d="M-112 0 H-46 M46 0 H112" opacity=".55" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 56}) scale(${scale})`}>
              <path
                d="M-160 12 C-90 -24 -25 26 42 -6 S124 -16 160 4"
                stroke={detail}
                strokeDasharray="6 7"
                strokeWidth={sw * 1.1}
              />
              <circle cx="-160" cy="12" r="4.5" fill={ornament} stroke="none" />
              <path d="M154 -2 l12 12 m0 -12 l-12 12" stroke={detail} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_naturalist": {
      const frame = (
        <>
          <rect x={m + 10} y={m + 10} width={w - 2 * m - 20} height={h - 2 * m - 20} strokeWidth={sw * 0.9} opacity=".6" />
          <FourCorners
            ctx={ctx}
            inset={20}
            render={() => (
              <path
                d="M0 32 L32 0 H0Z"
                fill={detail}
                fillOpacity=".22"
                stroke={detail}
              />
            )}
          />
        </>
      );
      const ticks = Math.max(10, Math.round(18 * d.density));
      const pattern = (
        <g opacity=".45" stroke={ornament}>
          {seq(ticks).map((i) => {
            const y = m + 88 + ((h - 2 * m - 176) * i) / (ticks - 1);
            return (
              <path
                key={i}
                d={`M${w - m - 10} ${y} h-${i % 5 === 0 ? 22 : 10}`}
              />
            );
          })}
        </g>
      );
      const sprig = (
        <g>
          <path d="M0 0 Q-18 -56 4 -120" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${-8 + i * 3} ${-18 - i * 24})`}>
              <path
                d="M0 0 Q-34 -4 -30 -24 Q-10 -24 0 0 M0 -6 Q24 -32 30 -26 Q28 -10 0 -6"
                fill={ornament}
                fillOpacity=".18"
              />
            </g>
          ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w - m - 74} ${m + 34}) rotate(165) scale(${0.8 * scale})`}>
              {sprig}
            </g>
          )}
          {bottom && (
            <>
              <g transform={`translate(${m + 78} ${h - m - 34}) rotate(12) scale(${0.82 * scale})`}>
                {sprig}
              </g>
              <g transform={`translate(${cx + 28} ${h - m - 48})`} stroke={detail}>
                <rect x="-86" y="-14" width="172" height="28" fill={paper} opacity=".9" />
                <path d="M-70 -2 H40 M-70 6 H12" opacity=".6" />
              </g>
            </>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_canopy": {
      const frame = (
        <>
          <rect
            x={m + 12}
            y={m + 12}
            width={w - 2 * m - 24}
            height={h - 2 * m - 24}
            strokeOpacity=".45"
          />
          <path
            d={`M${m + 34} ${m + 52} V${h - m - 52} M${w - m - 34} ${m + 52} V${h - m - 52}`}
            opacity=".24"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".32">
          {top &&
            seq(Math.max(5, Math.round(9 * d.density))).map((i) => {
              const a = -64 + (128 * i) / (Math.max(5, Math.round(9 * d.density)) - 1);
              return (
                <path
                  key={i}
                  transform={`translate(${cx} ${m + 68}) rotate(${a})`}
                  d="M0 36 V88"
                />
              );
            })}
        </g>
      );
      const trees = [
        { x: 0.14, h: 122, s: 0.9 },
        { x: 0.26, h: 92, s: 0.72 },
        { x: 0.39, h: 108, s: 0.8 },
        { x: 0.52, h: 78, s: 0.65 },
        { x: 0.65, h: 114, s: 0.85 },
        { x: 0.78, h: 96, s: 0.74 },
        { x: 0.88, h: 128, s: 0.92 },
      ];
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 72}) scale(${scale})`} stroke={detail}>
              <circle r="28" fill={detail} fillOpacity=".2" />
              <circle r="40" opacity=".32" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(0 ${h - m - 18})`}>
              {trees.map((t, i) => (
                <g
                  key={i}
                  transform={`translate(${m + 20 + (w - 2 * m - 40) * t.x} 0) scale(${t.s * Math.min(1.15, scale)})`}
                >
                  <path d={`M0 0 V${-t.h * 0.82}`} strokeWidth={sw * 1.2} />
                  <path
                    d={`M0 ${-t.h} C-26 ${-t.h * 0.72} -36 ${-t.h * 0.44} -14 ${-t.h * 0.48} C-38 ${-t.h * 0.32} -46 ${-t.h * 0.14} 0 ${-t.h * 0.16} C46 ${-t.h * 0.14} 38 ${-t.h * 0.32} 14 ${-t.h * 0.48} C36 ${-t.h * 0.44} 26 ${-t.h * 0.72} 0 ${-t.h}Z`}
                    fill={ornament}
                    fillOpacity={0.14 + (i % 3) * 0.06}
                  />
                </g>
              ))}
              <path d={`M${m + 26} 0 H${w - m - 26}`} stroke={detail} opacity=".6" />
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
