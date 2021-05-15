import React from 'react';
import { useParams } from 'react-router-dom';
import OldQuestionEdit from '../components/OldQuestionEdit';

/***************************************************************************
 *                         input:QuizID ====> QuestionList
 *                         Output: QuestionList
 ****************************************************************************/
function QuestionEdit () {
  // const token = localStorage.getItem('Token');
  const params = useParams();
  // get all question info
  return (
  <div style={{ width: '100%' }}>
    <OldQuestionEdit quizID={params.quizid} questionID={params.questionid} />
  </div>
  );
}
export default QuestionEdit;
