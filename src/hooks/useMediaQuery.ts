import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 1. 미디어 쿼리 객체 생성
    const media = window.matchMedia(query);
    // 2. 초기 상태 설정
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    // 3. 이벤트 리스너 설정
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    // 4. 클린업 함수
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
