import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { QuestionTypeSelect, PointsSelect, TimeSelect } from './Select.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ShareContext } from '../functions/shareStates.js';
import { getQuizDetail } from '../functions/api.js';

export default function QuestionMeta ({ quizID, questionID }) {
  const theme = createMuiTheme();
  const token = localStorage.getItem('Token');
  const context = React.useContext(ShareContext);
  const [questionContent, setQuestionContent] = context.questionContent;
  const setDuration = context.duration[1];
  const setPoints = context.points[1];
  const setQuestionType = context.questionType[1];
  const setYoutubeLink = context.youtube[1];
  const setPhoto = context.photo[1];
  React.useEffect(() => {
    async function getQuestion () {
      // return question array in quizObj
      const quizObj = await getQuizDetail(quizID, token);
      const questionDetail = quizObj.questions[questionID];
      /***************************************************************************
      *             get question detail and set question detail state
      ****************************************************************************/
      setQuestionContent(questionDetail.Content);
      setDuration(questionDetail.Duration);
      setPoints(questionDetail.Point);
      setQuestionType(questionDetail.Type);
      setYoutubeLink(questionDetail.YoutubeLink);
      setPhoto(questionDetail.Photo);
    }
    getQuestion();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Question Text"
              fullWidth
              value={questionContent}
              onChange={(e) => {
                setQuestionContent(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <QuestionTypeSelect />
            <PointsSelect />
            <TimeSelect />
          </Grid>
        </Grid>
      </React.Fragment>
    </ThemeProvider>
  );
}
QuestionMeta.propTypes = {
  quizID: PropTypes.string,
  questionID: PropTypes.string,
};
