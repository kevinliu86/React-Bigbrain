import React from 'react';
import PropTypes from 'prop-types';

export const ShareContext = React.createContext(null);
export function ShareProvider ({ children }) {
  /***************************************************************************
  *                   Share Question detail between 3 steps
  ***************************************************************************/
  const [questionContent, setQuestionContent] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [questionType, setQuestionType] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [youtubelink, setYoutubeLink] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  /***************************************************************************
  *                      Show hide element
  ***************************************************************************/
  const [reloadDashBoard, setReloadDashboard] = React.useState(0);
  const [reloadQustionList, setReloadQustionList] = React.useState(0);
  const [showAddQuiz, setShowAddQuiz] = React.useState(false);
  const [showLoginRegister, setShowLoginRegister] = React.useState(true);
  /***************************************************************************
  *                      Store
  ***************************************************************************/
  const store = {
    questionContent: [questionContent, setQuestionContent],
    duration: [duration, setDuration],
    questionType: [questionType, setQuestionType],
    points: [points, setPoints],
    answers: [answers, setAnswers],
    showLoginRegister: [showLoginRegister, setShowLoginRegister],
    showAddQuiz: [showAddQuiz, setShowAddQuiz],
    reloadDashBoard: [reloadDashBoard, setReloadDashboard],
    reloadQustionList: [reloadQustionList, setReloadQustionList],
    photo: [photo, setPhoto],
    youtube: [youtubelink, setYoutubeLink],
  };
  return (
    <ShareContext.Provider value={store}>{children}</ShareContext.Provider>
  );
}
ShareProvider.propTypes = {
  children: PropTypes.element,
};
export default ShareProvider;
