import {
  BorderMask,
  Fleuron,
  FourCorners,
  HankoSeal,
  MirroredCorners,
  Rosette,
  chamferedRectPath,
  notchedRectPath,
  seq,
  starPoly,
  type FrameLayers,
  type ProposalContext,
} from "./primitives";

export function classicalProposals(ctx: ProposalContext): FrameLayers | null {
  const { d, id, w, h, m, cx, cy, sw, scale, top, bottom, paper, ornament, detail } =
    ctx;
  const count = Math.max(3, Math.round(9 * d.density));
  const unit = Math.max(24, (74 * d.patternScale) / Math.max(0.5, d.density * 0.75));

  switch (d.template) {
    // ── FRENCH · MÁXIMAS ───────────────────────────────────────────────────
    case "p_aldine": {
      const mIn = m + 36;
      const frame = (
        <>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            strokeWidth={sw * 2.1}
          />
          <rect
            x={m + 10}
            y={m + 10}
            width={w - 2 * m - 20}
            height={h - 2 * m - 20}
            strokeWidth={sw * 0.75}
            opacity=".7"
          />
          <rect
            x={mIn}
            y={mIn}
            width={w - 2 * mIn}
            height={h - 2 * mIn}
            stroke={detail}
            strokeWidth={sw * 0.9}
          />
          <FourCorners
            ctx={ctx}
            inset={0}
            render={() => (
              <g>
                <rect
                  x="0"
                  y="0"
                  width="36"
                  height="36"
                  fill={paper}
                  stroke={ornament}
                  strokeWidth={sw * 0.9}
                />
                <path
                  d="M7 7 H29 V29 H7Z M18 9 L27 18 18 27 9 18Z"
                  stroke={detail}
                  strokeWidth={sw * 0.8}
                />
                <circle cx="18" cy="18" r="3" fill={ornament} stroke="none" />
              </g>
            )}
          />
        </>
      );
      const pattern = (
        <g opacity=".45" stroke={detail}>
          {seq(count * 2).map((i) => {
            const t = (i + 0.5) / (count * 2);
            const px = m + 52 + t * (w - 2 * m - 104);
            const py = m + 52 + t * (h - 2 * m - 104);
            return (
              <g key={i}>
                {top && (
                  <path d={`M${px} ${m + 17} l4 6 -4 6 -4 -6Z`} fill={detail} fillOpacity=".22" />
                )}
                {bottom && (
                  <path d={`M${px} ${h - m - 29} l4 6 -4 6 -4 -6Z`} fill={detail} fillOpacity=".22" />
                )}
                <path d={`M${m + 23} ${py - 4} l5 4 -5 4 -5 -4Z`} />
                <path d={`M${w - m - 23} ${py - 4} l5 4 -5 4 -5 -4Z`} />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${scale})`}>
              <path
                d="M-190 0 H-46 M46 0 H190 M-145 -8 Q-95 -20 -46 -4 M145 -8 Q95 -20 46 -4 M-145 8 Q-95 20 -46 4 M145 8 Q95 20 46 4"
                strokeWidth={sw * 0.85}
              />
              <Fleuron size={1.05} color={detail} />
              <circle cx="-196" cy="0" r="3" fill={detail} stroke="none" />
              <circle cx="196" cy="0" r="3" fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 74}) scale(${scale})`}>
              <path d="M-140 0 H-32 M32 0 H140" strokeWidth={sw * 0.85} />
              <path
                d="M0 -18 L24 0 0 18 -24 0Z"
                fill={paper}
                stroke={detail}
                strokeWidth={sw * 1.1}
              />
              <path d="M0 -10 L13 0 0 10 -13 0Z" fill={detail} fillOpacity=".3" stroke="none" />
              <circle r="3" fill={ornament} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_salon": {
      const frame = (
        <>
          <path
            d={notchedRectPath(m, m, w - 2 * m, h - 2 * m, 52)}
            strokeWidth={sw * 1.5}
          />
          <path
            d={notchedRectPath(m + 12, m + 12, w - 2 * m - 24, h - 2 * m - 24, 42)}
            stroke={detail}
            strokeWidth={sw * 0.75}
            opacity=".85"
          />
          <rect
            x={m + 24}
            y={m + 24}
            width={w - 2 * m - 48}
            height={h - 2 * m - 48}
            strokeWidth={sw * 0.65}
            opacity=".32"
          />
        </>
      );
      const pattern = (
        <MirroredCorners
          ctx={ctx}
          inset={14}
          render={() => (
            <g stroke={detail} opacity=".62">
              <path d="M40 4 C24 4 20 20 4 40" strokeDasharray="3 5" />
              <path d="M48 10 C32 18 18 32 10 48" strokeWidth={sw * 0.7} />
              <circle cx="17" cy="17" r="4" fill={detail} fillOpacity=".28" />
            </g>
          )}
        />
      );
      const ornaments = (
        <>
          <MirroredCorners
            ctx={ctx}
            inset={28}
            render={() => (
              <g transform={`scale(${0.85 * scale})`}>
                <path d="M0 44 C4 18 18 4 44 0 M6 32 C12 18 18 12 32 6 M18 0 C18 10 10 18 0 18" />
                <path
                  d="M28 0 C40 -8 56 -2 52 10 C48 18 36 16 38 8 M0 28 C-8 40 -2 56 10 52 C18 48 16 36 8 38"
                  stroke={detail}
                />
              </g>
            )}
          />
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${scale})`}>
              <ellipse rx="46" ry="20" fill={paper} stroke={detail} strokeWidth={sw * 1.1} />
              <ellipse rx="36" ry="13" strokeWidth={sw * 0.7} opacity=".6" />
              <path d="M-160 0 C-118 -20 -82 14 -46 0 M160 0 C118 -20 82 14 46 0" />
              <path d="M-112 -9 C-98 -22 -76 -16 -74 -3 M112 -9 C98 -22 76 -16 74 -3" stroke={detail} />
              <path d="M0 -8 L8 0 0 8 -8 0Z" fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 72}) scale(${scale})`}>
              <path d="M-135 0 C-88 18 -46 -12 0 6 C46 -12 88 18 135 0" />
              <path d="M-86 12 C-52 24 -22 10 0 18 C22 10 52 24 86 12" stroke={detail} opacity=".75" />
              <circle cy="6" r="4" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_enlightenment": {
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.4} />
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            strokeWidth={sw * 0.7}
            opacity=".65"
          />
          <FourCorners
            ctx={ctx}
            inset={14}
            render={() => (
              <g>
                <circle r="18" fill={paper} stroke={ornament} strokeWidth={sw * 0.9} />
                <circle r="11" stroke={detail} strokeWidth={sw * 0.75} />
                <path d="M-7 0 H7 M0 -7 V7" stroke={detail} strokeWidth={sw * 0.7} />
              </g>
            )}
          />
        </>
      );
      const pattern = (
        <g opacity=".36" stroke={ornament}>
          {seq(count * 2).map((i) => {
            const x = m + 56 + ((w - 2 * m - 112) * i) / (count * 2 - 1);
            return (
              <g key={i}>
                {top && <path d={`M${x} ${m} v${i % 2 === 0 ? 14 : 7}`} />}
                {bottom && <path d={`M${x} ${h - m} v-${i % 2 === 0 ? 14 : 7}`} />}
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 74}) scale(${scale})`}>
              <path d="M-195 0 H-52 M52 0 H195 M-165 -6 H-58 M58 -6 H165" strokeWidth={sw * 0.8} opacity=".7" />
              <circle r="34" fill={paper} stroke={ornament} strokeWidth={sw * 1.15} />
              <circle r="26" stroke={detail} strokeDasharray="3 4" />
              <polygon
                points={starPoly(0, 0, 20, 7, 8)}
                fill={detail}
                fillOpacity=".22"
                stroke={detail}
              />
              <circle r="4" fill={ornament} stroke="none" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 68}) scale(${scale})`}>
              <path d="M-170 0 H170 M-95 10 H95" strokeWidth={sw * 0.85} />
              <path d="M0 -9 L14 0 0 9 -14 0Z" fill={paper} stroke={detail} />
              <circle r="3" fill={detail} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── PERSIAN ────────────────────────────────────────────────────────────
    case "p_girih": {
      const band = 72;
      const patId = `${id}-p-girih-tile`;
      const maskId = `${id}-p-girih-mask`;
      const pattern = (
        <>
          <defs>
            <pattern
              id={patId}
              width={unit}
              height={unit}
              patternUnits="userSpaceOnUse"
            >
              <g stroke={ornament} strokeWidth={sw * 0.6} fill="none">
                <polygon
                  points={starPoly(unit / 2, unit / 2, unit * 0.48, unit * 0.24, 8)}
                />
                <polygon
                  points={starPoly(0, 0, unit * 0.34, unit * 0.16, 4)}
                  stroke={detail}
                />
                <polygon
                  points={starPoly(unit, 0, unit * 0.34, unit * 0.16, 4)}
                  stroke={detail}
                />
                <polygon
                  points={starPoly(0, unit, unit * 0.34, unit * 0.16, 4)}
                  stroke={detail}
                />
                <polygon
                  points={starPoly(unit, unit, unit * 0.34, unit * 0.16, 4)}
                  stroke={detail}
                />
                <circle cx={unit / 2} cy={unit / 2} r={unit * 0.1} fill={detail} fillOpacity=".28" />
              </g>
            </pattern>
            <BorderMask maskId={maskId} w={w} h={h} x={m + band} y={m + band} />
          </defs>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            fill={`url(#${patId})`}
            mask={`url(#${maskId})`}
            opacity=".68"
          />
        </>
      );
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.4} />
          <rect
            x={m + 8}
            y={m + 8}
            width={w - 2 * m - 16}
            height={h - 2 * m - 16}
            stroke={detail}
            strokeWidth={sw * 0.7}
            opacity=".7"
          />
          <rect
            x={m + band}
            y={m + band}
            width={w - 2 * (m + band)}
            height={h - 2 * (m + band)}
            strokeWidth={sw * 1.3}
          />
          <rect
            x={m + band + 8}
            y={m + band + 8}
            width={w - 2 * (m + band + 8)}
            height={h - 2 * (m + band + 8)}
            stroke={detail}
            strokeWidth={sw * 0.65}
            opacity=".65"
          />
        </>
      );
      const ornaments = (
        <>
          <FourCorners
            ctx={ctx}
            inset={band / 2}
            render={() => (
              <g transform={`scale(${0.86 * scale})`}>
                <rect
                  x="-34"
                  y="-34"
                  width="68"
                  height="68"
                  transform="rotate(45)"
                  fill={paper}
                  stroke={ornament}
                  strokeWidth={sw * 1.1}
                />
                <Rosette r={36} petals={12} fillOpacity={0.22} stroke={detail} centerFill={paper} />
              </g>
            )}
          />
          {top && (
            <g transform={`translate(${cx} ${m + band + 10}) scale(${scale})`}>
              <path
                d="M-68 0 Q-32 -2 0 -30 Q32 -2 68 0 Q32 4 0 28 Q-32 4 -68 0Z"
                fill={paper}
                stroke={detail}
              />
              <polygon points={starPoly(0, 0, 14, 6, 8)} fill={ornament} fillOpacity=".35" stroke={ornament} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - band - 10}) scale(${scale})`}>
              <path
                d="M-56 0 Q-26 -2 0 -22 Q26 -2 56 0 Q26 4 0 22 Q-26 4 -56 0Z"
                fill={paper}
                stroke={detail}
              />
              <polygon points={starPoly(0, 0, 11, 5, 8)} fill={detail} fillOpacity=".4" stroke={ornament} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_ispahan": {
      const archTop = m + 38;
      const archSpring = m + 150;
      const archPath = [
        `M${m + 42} ${h - m - 42}`,
        `V${archSpring}`,
        `C${m + 42} ${archTop + 56} ${cx - 110} ${archTop + 52} ${cx} ${archTop}`,
        `C${cx + 110} ${archTop + 52} ${w - m - 42} ${archTop + 56} ${w - m - 42} ${archSpring}`,
        `V${h - m - 42} Z`,
      ].join(" ");
      const innerArchPath = [
        `M${m + 54} ${h - m - 54}`,
        `V${archSpring + 4}`,
        `C${m + 54} ${archTop + 68} ${cx - 104} ${archTop + 64} ${cx} ${archTop + 14}`,
        `C${cx + 104} ${archTop + 64} ${w - m - 54} ${archTop + 68} ${w - m - 54} ${archSpring + 4}`,
        `V${h - m - 54} Z`,
      ].join(" ");
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.3} />
          <rect
            x={m + 11}
            y={m + 11}
            width={w - 2 * m - 22}
            height={h - 2 * m - 22}
            stroke={detail}
            strokeWidth={sw * 0.7}
            opacity=".7"
          />
          <path d={archPath} strokeWidth={sw * 1.4} />
          <path d={innerArchPath} stroke={detail} strokeWidth={sw * 0.8} opacity=".75" />
        </>
      );
      const pattern = (
        <g opacity=".36" stroke={detail}>
          {top &&
            [-1, 1].map((side) => (
              <g
                key={side}
                transform={`translate(${side === -1 ? m + 28 : w - m - 28} ${m + 28}) scale(${side} 1)`}
              >
                <path d="M0 0 C55 0 92 22 118 58 M16 8 C28 38 66 48 92 70 M6 28 C14 66 36 86 44 106" />
                <circle cx="34" cy="24" r="6" fill={detail} fillOpacity=".2" />
                <circle cx="64" cy="40" r="4" fill={ornament} fillOpacity=".22" />
              </g>
            ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${archTop + 50}) scale(${0.86 * scale})`}>
              <Rosette r={30} petals={10} fillOpacity={0.18} stroke={detail} centerFill={paper} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 66}) scale(${scale})`}>
              {[-140, 140].map((x) => (
                <g key={x} transform={`translate(${x} 0)`}>
                  <path
                    d="M0 -42 C-18 -14 -16 14 0 22 C16 14 18 -14 0 -42Z"
                    fill={ornament}
                    fillOpacity=".18"
                  />
                  <path d="M0 -34 V26" stroke={detail} />
                </g>
              ))}
              <path d="M-104 14 H-34 M34 14 H104" stroke={detail} />
              <path d="M0 -10 Q-16 6 0 20 Q16 6 0 -10Z" fill={detail} fillOpacity=".26" stroke={detail} />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_lacquer": {
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.4} />
          <path
            d={chamferedRectPath(m + 22, m + 22, w - 2 * m - 44, h - 2 * m - 44, 46)}
            stroke={detail}
            strokeWidth={sw * 1.1}
          />
          <path
            d={chamferedRectPath(m + 34, m + 34, w - 2 * m - 68, h - 2 * m - 68, 40)}
            strokeWidth={sw * 0.7}
            opacity=".55"
          />
        </>
      );
      const pattern = (
        <g stroke={ornament} opacity=".55">
          {seq(count * 2).map((i) => {
            const px = m + 72 + ((w - 2 * m - 144) * i) / (count * 2 - 1);
            const py = m + 72 + ((h - 2 * m - 144) * i) / (count * 2 - 1);
            return (
              <g key={i}>
                {top && <ellipse cx={px} cy={m + 11} rx="12" ry="4" />}
                {bottom && <ellipse cx={px} cy={h - m - 11} rx="12" ry="4" />}
                <ellipse cx={m + 11} cy={py} rx="4" ry="12" />
                <ellipse cx={w - m - 11} cy={py} rx="4" ry="12" />
              </g>
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          <MirroredCorners
            ctx={ctx}
            inset={24}
            render={() => (
              <g stroke={detail}>
                <path
                  d="M0 48 L48 0 H88 C62 12 44 26 26 44 C18 52 12 68 0 88Z"
                  fill={ornament}
                  fillOpacity=".15"
                />
                <circle cx="24" cy="24" r="6" fill={detail} fillOpacity=".35" />
              </g>
            )}
          />
          {top && (
            <g transform={`translate(${cx} ${m + 70}) scale(${scale})`}>
              <path
                d="M-78 0 C-42 -4 -22 -24 0 -32 C22 -24 42 -4 78 0 C42 4 22 24 0 32 C-22 24 -42 4 -78 0Z"
                fill={paper}
                stroke={detail}
                strokeWidth={sw * 1.15}
              />
              <polygon points={starPoly(0, 0, 16, 7, 10)} fill={ornament} fillOpacity=".28" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 70}) scale(${scale})`}>
              <path
                d="M-64 0 C-34 -3 -18 -18 0 -26 C18 -18 34 -3 64 0 C34 3 18 18 0 26 C-18 18 -34 3 -64 0Z"
                fill={paper}
                stroke={detail}
                strokeWidth={sw * 1.15}
              />
              <circle r="7" fill={detail} fillOpacity=".4" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── JAPANESE ───────────────────────────────────────────────────────────
    case "p_seigaiha": {
      const waveU = Math.max(28, 66 * d.patternScale);
      const patId = `${id}-p-seigaiha`;
      const bandH = 88;
      const pattern = (
        <>
          <defs>
            <pattern
              id={patId}
              width={waveU}
              height={waveU / 2}
              patternUnits="userSpaceOnUse"
            >
              <rect width={waveU} height={waveU / 2} fill={ornament} fillOpacity=".1" />
              <g stroke={ornament} strokeWidth={sw * 0.72} fill="none">
                {[-1, 0, 1, 2].map((col) => (
                  <g key={col} transform={`translate(${col * waveU} 0)`}>
                    {[0.16, 0.28, 0.4, 0.5].map((r) => (
                      <path
                        key={r}
                        d={`M${waveU * (0.5 - r)} ${waveU / 2} a${waveU * r} ${waveU * r} 0 0 1 ${waveU * r * 2} 0 M${-waveU * r} 0 a${waveU * r} ${waveU * r} 0 0 1 ${waveU * r * 2} 0`}
                      />
                    ))}
                  </g>
                ))}
              </g>
            </pattern>
          </defs>
          {top && (
            <rect
              x={m + 14}
              y={m + 14}
              width={w - 2 * m - 28}
              height={bandH}
              fill={`url(#${patId})`}
              opacity=".85"
            />
          )}
          {bottom && (
            <rect
              x={m + 14}
              y={h - m - 14 - bandH}
              width={w - 2 * m - 28}
              height={bandH}
              fill={`url(#${patId})`}
              opacity=".85"
            />
          )}
        </>
      );
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.25} />
          <rect
            x={m + 14}
            y={m + 14}
            width={w - 2 * m - 28}
            height={h - 2 * m - 28}
            strokeWidth={sw * 0.75}
            opacity=".7"
          />
          {top && (
            <path
              d={`M${m + 14} ${m + 14 + bandH} H${w - m - 14}`}
              strokeWidth={sw * 1.1}
            />
          )}
          {bottom && (
            <path
              d={`M${m + 14} ${h - m - 14 - bandH} H${w - m - 14}`}
              strokeWidth={sw * 1.1}
            />
          )}
        </>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 14 + bandH}) scale(${scale})`}>
              <circle r="24" fill={paper} stroke={ornament} strokeWidth={sw * 0.9} />
              <circle r="13" fill={detail} stroke="none" />
            </g>
          )}
          {bottom && (
            <HankoSeal
              x={w - m - 58}
              y={h - m - 58}
              size={38 * Math.min(1.2, scale)}
              color={detail}
              paper={paper}
            />
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_byobu": {
      const frame = (
        <>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            strokeWidth={sw * 0.9}
            opacity=".55"
          />
          <path
            d={`M${m + 12} ${m + 12} H${w - m - 12} M${m + 12} ${h - m - 12} H${w - m - 12}`}
            stroke={detail}
            strokeWidth={sw * 0.8}
            opacity=".65"
          />
        </>
      );
      const pattern = (
        <g fill={detail} stroke="none">
          {top && (
            <g opacity=".18">
              <path
                d={`M${m + 12} ${m + 26} H${w * 0.56} a16 16 0 0 1 0 32 H${w * 0.34} a12 12 0 0 0 0 24 H${w * 0.48} a14 14 0 0 1 0 28 H${m + 12}Z`}
              />
            </g>
          )}
          {bottom && (
            <g opacity=".18">
              <path
                d={`M${w - m - 12} ${h - m - 26} H${w * 0.44} a16 16 0 0 1 0 -32 H${w * 0.66} a12 12 0 0 0 0 -24 H${w * 0.52} a14 14 0 0 1 0 -28 H${w - m - 12}Z`}
              />
            </g>
          )}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${w - m - 132} ${m + 92}) scale(${scale})`}>
              <circle r="44" fill={detail} fillOpacity=".82" stroke="none" />
              <g transform="translate(-84 6)" stroke={ornament} strokeWidth={sw * 1.15}>
                <path
                  d="M-64 -20 C-36 -24 -14 -8 0 6 C22 -18 52 -30 88 -26 C56 -12 32 4 12 16 C-8 22 -30 14 -64 -20Z"
                  fill={paper}
                />
                <path d="M12 16 L44 20 M-6 14 L-34 32" />
              </g>
            </g>
          )}
          {bottom && (
            <g transform={`translate(${m + 168} ${h - m - 74}) scale(${0.86 * scale})`}>
              <path
                d="M-76 -12 C-42 -20 -16 -6 0 8 C28 -16 62 -24 94 -16 C64 -4 34 10 10 18 C-14 22 -42 12 -76 -12Z"
                fill={ornament}
                fillOpacity=".15"
              />
              <path d="M10 18 L46 24 M-8 14 L-36 30" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_bamboo": {
      const culmX = m + 56;
      const nodes = Math.max(4, Math.round(6 * d.density));
      const frame = (
        <>
          <path
            d={`M${m + 18} ${m + 18} V${h - m - 18} H${w - m - 18}`}
            strokeWidth={sw * 0.85}
            opacity=".36"
          />
          <path
            d={`M${w - m - 18} ${m + 18} h-74 M${w - m - 18} ${m + 18} v74`}
            stroke={detail}
            strokeWidth={sw * 1.1}
            opacity=".7"
          />
        </>
      );
      const pattern = (
        <g opacity=".38">
          <path
            d={`M${culmX - 18} ${h - m - 26} V${m + 48}`}
            strokeWidth={sw * 2.2}
          />
          {seq(nodes).map((i) => {
            const y = m + 92 + ((h - 2 * m - 160) * i) / Math.max(1, nodes - 1);
            return (
              <path
                key={i}
                d={`M${culmX - 24} ${y} h12`}
                strokeWidth={sw * 1.6}
              />
            );
          })}
        </g>
      );
      const ornaments = (
        <>
          <g>
            <path
              d={`M${culmX} ${h - m - 24} Q${culmX + 8} ${cy} ${culmX - 4} ${m + 44}`}
              strokeWidth={sw * 3.2}
              strokeLinecap="round"
            />
            {seq(nodes).map((i) => {
              const y = m + 88 + ((h - 2 * m - 150) * i) / Math.max(1, nodes - 1);
              return (
                <path
                  key={i}
                  d={`M${culmX - 8} ${y} h16`}
                  stroke={paper}
                  strokeWidth={sw * 1.2}
                />
              );
            })}
            {top && (
              <g transform={`translate(${culmX + 2} ${m + 110}) scale(${scale})`}>
                {[
                  [0, 0, -28],
                  [16, -24, 12],
                  [28, -4, 46],
                  [-8, -42, -55],
                  [52, -32, 24],
                ].map(([lx, ly, rot], i) => (
                  <path
                    key={i}
                    transform={`translate(${lx} ${ly}) rotate(${rot})`}
                    d="M0 0 Q38 -14 82 -4 Q38 12 0 0Z"
                    fill={ornament}
                    fillOpacity=".82"
                    stroke="none"
                  />
                ))}
              </g>
            )}
          </g>
          {top && (
            <circle
              cx={w - m - 108}
              cy={m + 104}
              r={34 * scale}
              fill={detail}
              fillOpacity=".18"
              stroke={detail}
              strokeWidth={sw * 0.8}
            />
          )}
          {bottom && (
            <HankoSeal
              x={w - m - 62}
              y={h - m - 62}
              size={34 * Math.min(1.2, scale)}
              color={detail}
              paper={paper}
            />
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── MEXICAN ────────────────────────────────────────────────────────────
    case "p_cempasuchil": {
      const frame = (
        <>
          <rect
            x={m + 12}
            y={m + 12}
            width={w - 2 * m - 24}
            height={h - 2 * m - 24}
            stroke={detail}
            strokeWidth={sw * 1.3}
          />
          <rect
            x={m + 24}
            y={m + 24}
            width={w - 2 * m - 48}
            height={h - 2 * m - 48}
            stroke={ornament}
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".52">
          {seq(count).map((i) => {
            const px = m + 135 + ((w - 2 * m - 270) * (i + 0.5)) / count;
            const py = m + 135 + ((h - 2 * m - 270) * (i + 0.5)) / count;
            return (
              <g key={i}>
                {top && (
                  <path d={`M${px - 16} ${m + 12} Q${px} ${m + 2} ${px + 16} ${m + 12} Q${px} ${m + 22} ${px - 16} ${m + 12}Z`} fill={detail} fillOpacity=".2" />
                )}
                {bottom && (
                  <path d={`M${px - 16} ${h - m - 12} Q${px} ${h - m - 22} ${px + 16} ${h - m - 12} Q${px} ${h - m - 2} ${px - 16} ${h - m - 12}Z`} fill={detail} fillOpacity=".2" />
                )}
                <circle cx={m + 12} cy={py} r="4" fill={ornament} stroke="none" />
                <circle cx={w - m - 12} cy={py} r="4" fill={ornament} stroke="none" />
              </g>
            );
          })}
        </g>
      );
      const marigold = (r: number) => (
        <g>
          <circle r={r * 1.06} fill={paper} stroke="none" />
          <Rosette r={r} petals={16} fillOpacity={0.28} stroke={ornament} centerFill={paper} />
          <Rosette r={r * 0.58} petals={10} fillOpacity={0.42} stroke={ornament} />
          <circle r={r * 0.16} fill={detail} stroke="none" />
        </g>
      );
      const ornaments = (
        <>
          <FourCorners
            ctx={ctx}
            inset={42}
            render={() => (
              <g transform={`scale(${0.9 * scale})`}>
                {marigold(42)}
                <g transform="translate(56 -6)">{marigold(19)}</g>
                <g transform="translate(-6 56)">{marigold(19)}</g>
              </g>
            )}
          />
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52}) scale(${scale})`}>
              {marigold(24)}
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_papelpicado": {
      const band = 72;
      const patId = `${id}-p-papel`;
      const maskId = `${id}-p-papel-mask`;
      const tile = Math.max(26, 46 * d.patternScale);
      const pattern = (
        <>
          <defs>
            <pattern id={patId} width={tile} height={tile} patternUnits="userSpaceOnUse">
              <rect width={tile} height={tile} fill={ornament} />
              <g transform={`translate(${tile / 2} ${tile / 2})`} fill={paper} stroke="none">
                <path
                  d={`M0 ${-tile * 0.36} L${tile * 0.12} ${-tile * 0.12} ${tile * 0.36} 0 ${tile * 0.12} ${tile * 0.12} 0 ${tile * 0.36} ${-tile * 0.12} ${tile * 0.12} ${-tile * 0.36} 0 ${-tile * 0.12} ${-tile * 0.12}Z`}
                />
                <circle cx={-tile / 2} cy={-tile / 2} r={tile * 0.12} />
                <circle cx={tile / 2} cy={-tile / 2} r={tile * 0.12} />
                <circle cx={-tile / 2} cy={tile / 2} r={tile * 0.12} />
                <circle cx={tile / 2} cy={tile / 2} r={tile * 0.12} />
              </g>
            </pattern>
            <BorderMask maskId={maskId} w={w} h={h} x={m + band} y={m + band} />
          </defs>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            fill={`url(#${patId})`}
            mask={`url(#${maskId})`}
          />
        </>
      );
      const scallopsX = Math.max(8, Math.round(14 * d.density));
      const stepX = (w - 2 * (m + band)) / scallopsX;
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 1.4} />
          <rect
            x={m + band}
            y={m + band}
            width={w - 2 * (m + band)}
            height={h - 2 * (m + band)}
            stroke={detail}
            strokeWidth={sw * 1.1}
          />
          {seq(scallopsX).map((i) => {
            const x = m + band + i * stepX;
            return (
              <g key={i} fill={detail} stroke="none" opacity=".88">
                {top && (
                  <path
                    d={`M${x} ${m + band} Q${x + stepX / 2} ${m + band + 20} ${x + stepX} ${m + band}Z`}
                  />
                )}
                {bottom && (
                  <path
                    d={`M${x} ${h - m - band} Q${x + stepX / 2} ${h - m - band - 20} ${x + stepX} ${h - m - band}Z`}
                  />
                )}
              </g>
            );
          })}
        </>
      );
      const ornaments = (
        <FourCorners
          ctx={ctx}
          inset={band / 2}
          render={() => (
            <g transform={`scale(${0.86 * scale})`}>
              <circle r="36" fill={detail} stroke={paper} strokeWidth="3" />
              <Rosette r={26} petals={8} fillOpacity={0.95} stroke={paper} centerFill={detail} />
            </g>
          )}
        />
      );
      return { pattern, frame, ornaments };
    }

    case "p_xilografia": {
      const band = 56;
      const patId = `${id}-p-xilo`;
      const maskId = `${id}-p-xilo-mask`;
      const hatch = Math.max(8, 12 * d.patternScale);
      const pattern = (
        <>
          <defs>
            <pattern id={patId} width={hatch} height={hatch} patternUnits="userSpaceOnUse">
              <path
                d={`M0 ${hatch} L${hatch} 0 M${-hatch / 4} ${hatch / 4} L${hatch / 4} ${-hatch / 4} M${hatch * 0.75} ${hatch * 1.25} L${hatch * 1.25} ${hatch * 0.75}`}
                stroke={ornament}
                strokeWidth={sw * 0.9}
              />
            </pattern>
            <BorderMask maskId={maskId} w={w} h={h} x={m + band} y={m + band} />
          </defs>
          <rect
            x={m}
            y={m}
            width={w - 2 * m}
            height={h - 2 * m}
            fill={`url(#${patId})`}
            mask={`url(#${maskId})`}
            opacity=".6"
          />
        </>
      );
      const frame = (
        <>
          <rect x={m} y={m} width={w - 2 * m} height={h - 2 * m} strokeWidth={sw * 2.8} />
          <rect
            x={m + band}
            y={m + band}
            width={w - 2 * (m + band)}
            height={h - 2 * (m + band)}
            strokeWidth={sw * 1.8}
          />
          <rect
            x={m + band + 9}
            y={m + band + 9}
            width={w - 2 * (m + band + 9)}
            height={h - 2 * (m + band + 9)}
            stroke={detail}
            strokeWidth={sw * 0.9}
          />
        </>
      );
      const ornaments = (
        <>
          <FourCorners
            ctx={ctx}
            inset={band / 2}
            render={() => (
              <g transform={`scale(${0.9 * scale})`}>
                <rect x="-28" y="-28" width="56" height="56" fill={paper} stroke={ornament} strokeWidth={sw * 1.5} />
                <polygon points={starPoly(0, 0, 22, 9, 8)} fill={detail} stroke="none" />
                <circle r="6" fill={paper} stroke="none" />
              </g>
            )}
          />
          {top && (
            <g transform={`translate(${cx} ${m + band + 34}) scale(${scale})`}>
              <circle r="18" fill={detail} stroke="none" />
              {seq(12).map((i) => (
                <path
                  key={i}
                  transform={`rotate(${i * 30})`}
                  d="M0 -22 L3 -34 -3 -34Z"
                  fill={ornament}
                  stroke="none"
                />
              ))}
              <path d="M-128 0 H-46 M46 0 H128" strokeWidth={sw * 1.4} />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - band - 28}) scale(${scale})`}>
              <path d="M-110 0 H-26 M26 0 H110" strokeWidth={sw * 1.4} />
              <path d="M-20 0 L0 -14 20 0 0 14Z" fill={ornament} stroke="none" />
              <circle r="4" fill={paper} stroke="none" />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    // ── ZEN ────────────────────────────────────────────────────────────────
    case "p_enso": {
      const r = Math.min(w, h) / 2 - m - 64;
      const frame = (
        <g transform={`translate(${cx} ${cy}) rotate(-26)`} strokeLinecap="round">
          {seq(18).map((i) => {
            const rad = r + (i - 9) * 1.15;
            const startA = 0.24 + (i % 5) * 0.03;
            const endA = Math.PI * 2 - 0.14 - (i % 4) * 0.04;
            const sx = Math.cos(startA) * rad;
            const sy = Math.sin(startA) * rad;
            const ex = Math.cos(endA) * rad;
            const ey = Math.sin(endA) * rad;
            return (
              <path
                key={i}
                d={`M${sx.toFixed(1)} ${sy.toFixed(1)} A${rad.toFixed(1)} ${rad.toFixed(1)} 0 1 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`}
                strokeWidth={sw * (0.9 + (i % 4) * 0.65)}
                opacity={0.08 + (i % 6) * 0.075}
              />
            );
          })}
        </g>
      );
      const pattern = (
        <g opacity=".3" stroke={ornament}>
          <path
            d={`M${m + 18} ${m + 58} V${m + 18} H${m + 58} M${w - m - 58} ${h - m - 18} H${w - m - 18} V${h - m - 58}`}
          />
        </g>
      );
      const ornaments = (
        <g>
          {bottom && (
            <HankoSeal
              x={cx}
              y={h - m - 52}
              size={30 * Math.min(1.2, scale)}
              color={detail}
              paper={paper}
            />
          )}
          {top && (
            <g transform={`translate(${cx} ${m + 48})`} stroke={detail} opacity=".6">
              <circle r="3" fill={detail} stroke="none" />
              <path d="M-38 0 H-12 M12 0 H38" />
            </g>
          )}
        </g>
      );
      return { pattern, frame, ornaments };
    }

    case "p_karesansui": {
      const grooves = Math.max(5, Math.round(9 * d.density));
      const frame = (
        <path
          d={`M${m + 78} ${m + 14} H${m + 14} V${m + 78} M${w - m - 78} ${m + 14} H${w - m - 14} V${m + 78} M${m + 14} ${h - m - 78} V${h - m - 14} H${m + 78} M${w - m - 78} ${h - m - 14} H${w - m - 14} V${h - m - 78}`}
          opacity=".48"
        />
      );
      const pattern = (
        <g opacity=".35" stroke={ornament}>
          {top &&
            seq(grooves).map((i) => {
              const y = m + 30 + i * (10 * d.patternScale);
              return (
                <path
                  key={`t-${i}`}
                  d={`M${m + 24} ${y} Q${cx} ${y + Math.sin(i * 0.5) * 14} ${w - m - 24} ${y}`}
                />
              );
            })}
          {bottom &&
            seq(grooves).map((i) => {
              const y = h - m - 28 - i * (10 * d.patternScale);
              return (
                <path
                  key={`b-${i}`}
                  d={`M${m + 24} ${y} C${w * 0.34} ${y - 14} ${w * 0.66} ${y + 14} ${w - m - 24} ${y}`}
                />
              );
            })}
        </g>
      );
      const ornaments = (
        <>
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 64}) scale(${scale})`} stroke={detail}>
              {[
                { rx: 148, ry: 34, op: 0.28 },
                { rx: 122, ry: 26, op: 0.42 },
              ].map((ring, idx) => (
                <ellipse key={idx} cy="10" rx={ring.rx} ry={ring.ry} opacity={ring.op} />
              ))}
              <path
                d="M-92 14 C-108 -6 -82 -34 -54 -28 C-28 -36 -14 -8 -24 12 C-42 24 -76 24 -92 14Z"
                fill={detail}
                fillOpacity=".24"
              />
              <path
                d="M-6 20 C-22 4 -4 -22 22 -16 C48 -28 68 2 52 18 C34 30 6 30 -6 20Z"
                fill={detail}
                fillOpacity=".15"
              />
              <path
                d="M66 6 C46 -8 62 -44 90 -40 C114 -44 126 -10 108 8 C96 18 78 16 66 6Z"
                fill={detail}
                fillOpacity=".32"
              />
            </g>
          )}
        </>
      );
      return { pattern, frame, ornaments };
    }

    case "p_lotus": {
      const frame = (
        <>
          <rect
            x={m + 12}
            y={m + 12}
            width={w - 2 * m - 24}
            height={h - 2 * m - 24}
            strokeWidth={sw * 0.85}
            opacity=".42"
          />
          <path
            d={`M${m + 24} ${m + 120} V${h - m - 140} M${w - m - 24} ${m + 120} V${h - m - 140}`}
            stroke={detail}
            opacity=".36"
          />
        </>
      );
      const pattern = (
        <g stroke={detail} opacity=".42">
          {bottom &&
            seq(Math.max(3, Math.round(5 * d.density))).map((i) => (
              <ellipse
                key={i}
                cx={cx}
                cy={h - m - 46}
                rx={64 + i * 38 * scale}
                ry={6 + i * 5 * scale}
                opacity={0.55 - i * 0.08}
              />
            ))}
        </g>
      );
      const ornaments = (
        <>
          {top && (
            <g transform={`translate(${cx} ${m + 78}) scale(${scale})`} stroke={detail}>
              <circle r="24" fill={detail} fillOpacity=".12" />
              <circle r="34" strokeDasharray="2 7" opacity=".55" />
              <path d="M-110 0 H-46 M46 0 H110" opacity=".48" />
            </g>
          )}
          {bottom && (
            <g transform={`translate(${cx} ${h - m - 52}) scale(${0.85 * scale})`}>
              <path
                d="M0 0 C-48 -28 -36 -82 0 -116 C36 -82 48 -28 0 0Z"
                fill={ornament}
                fillOpacity=".14"
              />
              <path
                d="M0 0 C-74 -8 -98 -54 -84 -96 C-38 -84 -10 -56 0 0Z M0 0 C74 -8 98 -54 84 -96 C38 -84 10 -56 0 0Z"
                fill={ornament}
                fillOpacity=".1"
              />
              <path
                d="M0 0 C-94 18 -134 -8 -144 -44 C-86 -58 -34 -36 0 0Z M0 0 C94 18 134 -8 144 -44 C86 -58 34 -36 0 0Z"
                fill={ornament}
                fillOpacity=".07"
              />
              <path d="M0 0 V-98 M0 0 C-48 -14 -58 -46 -44 -76 M0 0 C48 -14 58 -46 44 -76" opacity=".55" />
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
