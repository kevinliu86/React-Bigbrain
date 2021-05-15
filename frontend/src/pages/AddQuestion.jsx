import React from 'react';
import { useParams } from 'react-router-dom';
import NewQuestion from '../components/NewQuestion.jsx';
function AddQuestion () {
  const params = useParams();
  return (
  <div style={{ width: '100%' }}>
    <NewQuestion quizID={params.quizid} />
  </div>
  );
}
export default AddQuestion;
