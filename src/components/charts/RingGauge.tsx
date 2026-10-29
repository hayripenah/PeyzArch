import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { colors, fonts } from '../../theme/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number; // 0–1
  size?: number;
  stroke?: number;
  label: string;
  valueText: string;
  color?: string;
};

export function RingGauge({
  progress,
  size = 88,
  stroke = 8,
  label,
  valueText,
  color = colors.accent,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withTiming(Math.max(0, Math.min(1, progress)), { duration: 900 });
  }, [progress, t]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - t.value),
  }));

  return (
    <View style={{ alignItems: 'center', width: size + 8 }}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colors.bgSoft}
            strokeWidth={stroke}
            fill="none"
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${c} ${c}`}
            animatedProps={animatedProps}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bodySemi,
              fontSize: 14,
              color: colors.text,
            }}
          >
            {valueText}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: fonts.body,
          fontSize: 11,
          color: colors.textMuted,
          marginTop: 6,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
