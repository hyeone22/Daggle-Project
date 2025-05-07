import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Slide1 from '@/assets/Image1.svg';
import Slide2 from '@/assets/Image2.svg';
import Slide3 from '@/assets/Image3.svg';
import Slide4 from '@/assets/Image4.svg';

function Carousel() {
  // 상태 관리
  const containerRef = useRef<HTMLDivElement>(null); // 캐러셀 컨테이너 DOM 참조
  const [translateX, setTranslateX] = useState(0); // 현재 X축 이동 위치
  const [isAutoScrolling, setIsAutoScrolling] = useState(true); // 자동 스크롤 활성화 여부
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  // 애니메이션 및 스크롤 관련 참조
  const animationRef = useRef<number | undefined>(undefined); // requestAnimationFrame ID 저장
  const lastScrollTimeRef = useRef(0); // 마지막 스크롤 시간 저장 (Date.now()로 측정)
  const accumulatedDeltaYRef = useRef(0); // 누적된 수직 스크롤 값

  // 캐러셀 슬라이드 데이터
  const slides = useMemo(
    () => [
      {
        image: Slide1,
        title: '프린티',
        subtitle: '주식회사 프린티',
        description: '작가와 팬을 잇는 일러스트 출력 플랫폼',
      },
      {
        image: Slide2,
        title: 'G-Alpha',
        subtitle: '(주)씨에어허브',
        description: '물류 관계자 비교견젹 솔루션',
      },
      {
        image: Slide3,
        title: 'KOSTA-EDU',
        subtitle: '한국소프트웨어 기술진흥협회',
        description: '학습관리 시스템',
      },
      {
        image: Slide4,
        title: '달콤수학',
        subtitle: '달콤교육',
        description: '엄마표 온라인 수학교육 강의 플랫폼',
      },
    ],
    []
  );

  // 캐러셀 관련 상수 계산
  const slideWidth = 319 + 16; // 슬라이드 너비 (이미지 + 마진)
  const totalSlides = slides.length; // 전체 슬라이드 수
  const maxScroll = -slideWidth * totalSlides; // 최대 스크롤 위치

  // 스크롤 위치 업데이트 함수
  const updatePosition = useCallback(() => {
    // Date.now()를 사용하여 현재 시간을 밀리초 단위로 가져옴
    // 이를 통해 스크롤 속도를 일정하게 유지하고 프레임 드롭 방지
    const currentTime = Date.now();
    const deltaTime = currentTime - lastScrollTimeRef.current;

    // 60fps로 제한하여 부드러운 애니메이션 구현
    if (deltaTime >= 1000 / 60) {
      const deltaY = accumulatedDeltaYRef.current;
      accumulatedDeltaYRef.current = 0;
      lastScrollTimeRef.current = currentTime;

      setTranslateX((prev) => {
        let newPosition = prev + deltaY * 0.8; // 스크롤 속도 조절

        // 무한 스크롤 구현
        if (newPosition <= maxScroll) {
          newPosition = 0;
        } else if (newPosition >= 0) {
          newPosition = maxScroll;
        }

        return newPosition;
      });
    }

    animationRef.current = requestAnimationFrame(updatePosition);
  }, [maxScroll]);

  // 마우스 휠 이벤트 핸들러
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // 마우스가 이미지 위에 있지 않거나 수평 스크롤인 경우 무시
      if (!isHovered || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      e.preventDefault();
      e.stopPropagation();
      accumulatedDeltaYRef.current += e.deltaY;
    },
    [isHovered]
  );

  // 자동 스크롤 함수
  const autoScroll = useCallback(() => {
    if (!isAutoScrolling) return;

    setTranslateX((prev) => {
      let newPosition = prev - 1;

      // 무한 스크롤 구현
      if (newPosition <= maxScroll) {
        newPosition = 0;
      }

      return newPosition;
    });

    animationRef.current = requestAnimationFrame(autoScroll);
  }, [isAutoScrolling, maxScroll]);

  // 이벤트 리스너 설정 및 정리
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    animationRef.current = requestAnimationFrame(updatePosition);
    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleWheel, updatePosition, autoScroll]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      <div
        ref={containerRef}
        className="flex"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: 'none',
          willChange: 'transform', // 브라우저에게 transform이 변경될 것임을 알림
          touchAction: 'none', // 터치 이벤트 비활성화
          backfaceVisibility: 'hidden', // 3D 변환 시 뒷면 숨김
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d', // 3D 변환 활성화
        }}
      >
        {/* 슬라이드 3번 반복하여 무한 스크롤 효과 구현 */}
        {[...slides, ...slides, ...slides].map((slide, index) => (
          <div
            key={index}
            className="mobile:w-full w-[319px] h-[391px] mx-2 flex-shrink-0 rounded-[20px] overflow-hidden relative group"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white cursor-pointer">
              <h3 className="text-2xl font-bold">{slide.title}</h3>
              <div className="flex flex-col gap-2 border-t border-[#D6D7DC] pt-4">
                <p className="text-[16px] line-clamp-2">{slide.description}</p>
                <h4 className="font-bold text-[16px]">{slide.subtitle}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
