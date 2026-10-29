import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Cihaz pusulası (web DeviceOrientation / native benzeri).
 * İzin yoksa null döner — UI rüzgar/yedek heading kullanır.
 */
export function useDeviceHeading(): number | null {
  const [heading, setHeading] = useState<number | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const handler = (e: DeviceOrientationEvent) => {
      // iOS webkitCompassHeading, aksi halde alpha (0–360, ters yönde olabilir)
      const anyE = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      if (typeof anyE.webkitCompassHeading === 'number') {
        setHeading(anyE.webkitCompassHeading);
        return;
      }
      if (typeof e.alpha === 'number') {
        setHeading((360 - e.alpha + 360) % 360);
      }
    };

    const request = async () => {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      try {
        if (typeof DOE.requestPermission === 'function') {
          const p = await DOE.requestPermission();
          if (p !== 'granted') return;
        }
      } catch {
        /* ignore */
      }
      window.addEventListener('deviceorientation', handler, true);
    };

    request();
    return () => window.removeEventListener('deviceorientation', handler, true);
  }, []);

  return heading;
}
