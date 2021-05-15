import React from 'react';
import { useParams } from 'react-router-dom';
import { ShareContext } from '../functions/shareStates.js';

const Results = () => {
  const params = useParams();
  const sessionid = params.sessionid;
  const context = React.useContext(ShareContext);
  React.useEffect(() => {
    const setShowAddQuiz = context.showAddQuiz[1];
    setShowAddQuiz(false);
  }, []);
  return (
    <div>
      <h2>2.3.3Results Not yet implemented</h2>
      <h2>sessionID is {sessionid}</h2>
    </div>
  );
};
export default Results;
