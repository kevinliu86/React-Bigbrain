import React from 'react';
import Quiz from '../components/Quiz.jsx';
import { getQuizMeta, getQuizDetail } from '../functions/api.js';
import { ShareContext } from '../functions/shareStates.js';
import Title from '../components/Title';

function Dashboard () {
  const [quizDetailsArray, setQuizDetailsArray] = React.useState([]);
  const [loadingState, setLoadingState] = React.useState('idle');
  const token = localStorage.getItem('Token');
  const context = React.useContext(ShareContext);
  const reloadDashBoard = context.reloadDashBoard[0];
  React.useEffect(() => {
    /***************************************************************************
     *                    hide login & register in navbar
     ****************************************************************************/
    const setShowLoginRegister = context.showLoginRegister[1];
    const setShowAddQuiz = context.showAddQuiz[1];
    setShowLoginRegister(false);
    setShowAddQuiz(true);
    /***************************************************************************
     *           input:Token ====> QuizList ====> QuizID + QuizDetail
     ****************************************************************************/
    async function getQuizDetailsOfUser () {
      const rawMetaArray = await getQuizMeta(token);
      const quizDetailsArray = await Promise.all(
        rawMetaArray.map(async (rawMeta) => {
          const quizDetail = await getQuizDetail(rawMeta.id, token);
          const quizDetailObj = {
            quizID: rawMeta.id,
            quizDetail,
          };
          return quizDetailObj;
        })
      );
      setQuizDetailsArray(quizDetailsArray);
      setLoadingState('success');
    }
    getQuizDetailsOfUser();
  }, [reloadDashBoard]);
  return (
    <div style={{ width: '100%' }}>
      <Title title={'Dashboard'} />
      {loadingState !== 'success' && <p>Loading...</p>}
      {loadingState === 'success' && <Quiz data={quizDetailsArray} />}
    </div>
  );
}

export default Dashboard;
