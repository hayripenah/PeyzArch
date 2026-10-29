import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
import type { ProvinceEnvironment } from '../../types/environment';
import { colors, fonts } from '../../theme/colors';

const DIRS = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB'] as const;

type Props = {
  env: ProvinceEnvironment;
  size?: number;
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function wedgePath(
  cx: number,
  cy: number,
  r0: number,
  r1: number,
  a0: number,
  a1: number
) {
  const p0 = polar(cx, cy, r0, a0);
  const p1 = polar(cx, cy, r1, a0);
  const p2 = polar(cx, cy, r1, a1);
  const p3 = polar(cx, cy, r0, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} A ${r1} ${r1} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r0} ${r0} 0 ${large} 0 ${p0.x} ${p0.y} Z`;
}

export function WindRose({ env, size = 200 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const target = env.wind.dominantWeekDeg ?? env.wind.directionNowDeg ?? 0;
  const speed = env.wind.speedNowKmh ?? 0;
  const [angle, setAngle] = useState(target);

  useEffect(() => {
    let raf = 0;
    let current = angle;
    const start = performance.now();
    const from = angle;
    const delta = ((target - from + 540) % 360) - 180;
    const dur = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) * (1 - t);
      current = from + delta * eased;
      setAngle(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const strengths = DIRS.map((_, i) => {
    const center = i * 45;
    let d = Math.abs(((target - center + 540) % 360) - 180);
    d = Math.min(d, 360 - d);
    const w = Math.max(0, 1 - d / 100);
    return 0.2 + w * 0.8;
  });

  const tip = polar(cx, cy, maxR * 0.92, angle);

  return (
    <View style={{ alignItems: 'center', paddingTop: 8 }}>
      <Svg width={size} height={size}>
        {[0.35, 0.6, 0.85, 1].map((t) => (
          <Circle
            key={t}
            cx={cx}
            cy={cy}
            r={maxR * t}
            stroke={colors.border}
            strokeWidth={1}
            strokeDasharray="3 4"
            fill="none"
          />
        ))}
        {DIRS.map((label, i) => {
          const a0 = i * 45 - 22.5;
          const a1 = i * 45 + 22.5;
          const s = strengths[i];
          const fill =
            s > 0.7 ? colors.accent : s > 0.45 ? '#6B9A74' : colors.accentSoft;
          const lab = polar(cx, cy, maxR + 14, i * 45);
          return (
            <G key={label}>
              <Path
                d={wedgePath(cx, cy, maxR * 0.18, maxR * s, a0, a1)}
                fill={fill}
                opacity={0.88}
              />
              <SvgText
                x={lab.x}
                y={lab.y + 4}
                fill={colors.textMuted}
                fontSize="10"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            </G>
          );
        })}
        <Line
          x1={cx}
          y1={cy}
          x2={tip.x}
          y2={tip.y}
          stroke={colors.text}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <Circle cx={cx} cy={cy} r={5} fill={colors.accent} />
      </Svg>
      <Text
        style={{
          fontFamily: fonts.bodySemi,
          fontSize: 14,
          color: colors.text,
          marginTop: 4,
        }}
      >
        {env.wind.directionNowLabel ?? env.wind.dominantWeekLabel ?? '—'} ·{' '}
        {speed ? `${speed.toFixed(1)} km/h` : '—'}
      </Text>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.textMuted,
        }}
      >
        Baskın {env.wind.dominantWeekLabel ?? '—'} · max{' '}
        {env.wind.maxWeekKmh != null ? `${env.wind.maxWeekKmh} km/h` : '—'}
      </Text>
    </View>
  );
}
