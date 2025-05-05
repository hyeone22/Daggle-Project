import Board from '../Board';

function BoardWrapper() {
  return (
    <div className="bg-white rounded-md w-full flex flex-col justify-center items-center">
      <Board />
    </div>
  );
}

export default BoardWrapper;
