import React from 'react';
import { useParams } from 'react-router-dom';
import { ShareContext } from '../functions/shareStates.js';

const PlayGame = () => {
  const params = useParams();
  const playerID = params.playerid;
  const context = React.useContext(ShareContext);
  React.useEffect(() => {
    const setShowAddQuiz = context.showAddQuiz[1];
    setShowAddQuiz(false);
  }, []);
  return (
    <div>
      <h2>2.4.2Play game Not yet implemented</h2>
      <h2>PlayerID is {playerID}</h2>
    </div>
  );
};
export default PlayGame;
