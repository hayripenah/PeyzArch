import { useEffect, useState } from 'react';
import { fetchProvinceEnvironment } from '../api/provinceEnvironment';
import type { ProvinceEnvironment } from '../types/environment';

type State = {
  data: ProvinceEnvironment | null;
  loading: boolean;
  error: string | null;
};

export function useProvinceEnvironment(provinceId: string | null): State {
  const [state, setState] = useState<State>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!provinceId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetchProvinceEnvironment(provinceId)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Veri alınamadı',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [provinceId]);

  return state;
}
