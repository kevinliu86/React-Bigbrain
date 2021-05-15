import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Questions } from '../components/Quiz.jsx';
import { getQuizDetail } from '../functions/api.js';
import Button from '@material-ui/core/Button';
import { ShareContext } from '../functions/shareStates.js';
import Title from '../components/Title';

/***************************************************************************
 *                         input:QuizID ====> QuestionList
 *                         Output: QuestionList
 ****************************************************************************/
function QuestionEdit () {
  const token = localStorage.getItem('Token');
  const params = useParams();
  const [questionsArray, setQuestionsArray] = React.useState([]);
  const [createNewQuestion, setCreateNewQuestion] = React.useState(false);
  // questionID params.questionid
  const context = React.useContext(ShareContext);
  const reloadQustionList = context.reloadQustionList[0];
  React.useEffect(() => {
    const setShowAddQuiz = context.showAddQuiz[1];
    setShowAddQuiz(false);
    async function getQuestionList () {
      // return question array in quizObj
      const quizDetail = await getQuizDetail(params.quizid, token);
      setQuestionsArray(quizDetail.questions);
    }
    getQuestionList();
  }, [reloadQustionList]);
  if (createNewQuestion === true) {
    return <Redirect to={'/addquestion/' + params.quizid } />;
  }
  return (
    <div style={{ width: '100%' }}>
      <Title title={'Qestions in quiz'} />
      <Button
        style={{ backgroundColor: '#27ab18' }}
        color='primary'
        variant='contained'
        onClick={() => { setCreateNewQuestion(true) }}
      >
        New Question
      </Button>
      <Questions data={questionsArray} quizID={params.quizid} />
    </div>
  );
}
export default QuestionEdit;
