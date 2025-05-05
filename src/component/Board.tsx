import BoardList from './list/BoardList';
import BoardText from './ui/text/BoardText';

function Board() {
  return (
    <div className="w-full flex flex-col items-center rounded-xl">
      <BoardText />
      <BoardList />
    </div>
  );
}

export default Board;
