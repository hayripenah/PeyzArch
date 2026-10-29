import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import { colors, fonts } from '../../theme/colors';

type Props = {
  /** Cihaz / yedek heading (0 = Kuzey) */
  headingDeg: number;
  size?: number;
  label?: string;
};

const LABELS = ['K', 'KD', 'D', 'GD', 'G', 'GB', 'B', 'KB'] as const;

export function headingLabel(deg: number): string {
  const i = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return LABELS[i];
}

export function SurveyCompass({ headingDeg, size = 96, label }: Props) {
  const [smooth, setSmooth] = useState(headingDeg);
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;

  useEffect(() => {
    let raf = 0;
    const from = smooth;
    const delta = ((headingDeg - from + 540) % 360) - 180;
    const start = performance.now();
    const dur = 400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setSmooth(from + delta * t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headingDeg]);

  const rad = ((smooth - 90) * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 999,
          borderWidth: 1.5,
          borderColor: '#FFFFFF',
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#2A2A28',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <Svg width={size} height={size}>
          <Circle
            cx={cx}
            cy={cy}
            r={r + 6}
            stroke={colors.border}
            strokeWidth={1}
            fill={colors.bg}
          />
          <Line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke={colors.accent}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Polygon
            points={`${nx},${ny} ${nx - 5},${ny + 10} ${nx + 5},${ny + 10}`}
            fill={colors.accent}
            transform={`rotate(${smooth}, ${nx}, ${ny})`}
          />
          <Circle cx={cx} cy={cy} r={4} fill={colors.text} />
          <Line
            x1={cx}
            y1={cy - r - 2}
            x2={cx}
            y2={cy - r + 6}
            stroke={colors.textMuted}
            strokeWidth={2}
          />
        </Svg>
      </View>
      <Text
        style={{
          fontFamily: fonts.bodySemi,
          fontSize: 13,
          color: colors.text,
          marginTop: 6,
        }}
      >
        {headingLabel(smooth)} · {Math.round(((smooth % 360) + 360) % 360)}°
      </Text>
      {label ? (
        <Text
          style={{
            fontFamily: fonts.body,
            fontSize: 10,
            color: colors.textMuted,
          }}
        >
          {label}
          {Platform.OS === 'web' ? '' : ''}
        </Text>
      ) : null}
    </View>
  );
}
