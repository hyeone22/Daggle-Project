import Carousel from '../ui/Carousel';
import Title from '../ui/text/Title';

function SlideWrapper() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <Title />
      <Carousel />
    </div>
  );
}

export default SlideWrapper;
