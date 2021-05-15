import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { QuestionTypeSelect, PointsSelect, TimeSelect } from './Select.jsx';
import { ThemeProvider } from '@material-ui/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ShareContext } from '../functions/shareStates.js';

export default function NewQuestionMeta ({ quizID }) {
  const theme = createMuiTheme();
  const context = React.useContext(ShareContext);
  const [questionContent, setQuestionContent] = context.questionContent;
  const setDuration = context.duration[1];
  const setPoints = context.points[1];
  const setQuestionType = context.questionType[1];
  React.useEffect(() => {
    setQuestionContent('');
    setDuration('');
    setPoints('');
    setQuestionType('');
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
NewQuestionMeta.propTypes = {
  quizID: PropTypes.string,
};
