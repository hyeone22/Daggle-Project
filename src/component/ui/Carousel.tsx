// components/Hello.tsx

import Slide1 from '@/assets/Image1.svg';
import Slide2 from '@/assets/Image2.svg';
import Slide3 from '@/assets/Image3.svg';
import Slide4 from '@/assets/Image4.svg';

function Carousel() {
  const slides = [
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
  ];

  return (
    <div className="overflow-hidden w-full">
      {/* 마우스를 올리면 애니메이션 멈춤 */}
      <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
        {[...slides, ...slides].map((slide, index) => (
          <div
            key={index}
            className="w-[319px] h-[391px] mx-2 flex-shrink-0 rounded-[20px] overflow-hidden relative group"
          >
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
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
