import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function BoardText() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = !!accessToken;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/write');
  };

  return (
    <div className="w-full h-24 px-6 border-b border-[#EEEFF1] mobile:border-none flex justify-between items-center">
      <h2 className="font-bold text-2xl">게시판</h2>
      <Button
        variant="secondary"
        size="icon"
        text="글쓰기"
        className="mobile:hidden"
        disabled={!isLoggedIn}
        onClick={handleClick}
      />
    </div>
  );
}

export default BoardText;
