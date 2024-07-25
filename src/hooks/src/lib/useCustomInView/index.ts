import { useInView } from 'react-intersection-observer';

export function useCustomInView(threshold: number, skip: boolean) {
  const { ref, inView } = useInView({
    threshold: threshold,
    initialInView: false,
    skip: skip,
  });

  return { ref, inView };
}
