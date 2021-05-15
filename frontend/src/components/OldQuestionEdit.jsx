import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import QuestionMeta from './QuestionMeta';
import AnswersForm from './AnswersForm';
import OldQuestionMedia from './OldQuestionMedia';
import Copyright from './Copyright.jsx';
import PropTypes from 'prop-types';
import { ShareContext } from '../functions/shareStates.js';
import { getQuizDetail, putQuestion } from '../functions/api.js';
/***************************************************************************
*                       Question part in Question EDIT
 "questions": [
  {
"Content": "What is your favorite Food?",
"Type": "Single",
"Point": "Standard",
"Duration": 10,
"YoutubeLink": "123",
"Photo": "456",
"Answer": [
  {
"ID": 0,
"Content": "Basketball",
"Correct": true
},
  {
"ID": 1,
"Content": "Football",
"Correct": false
},
  {
"ID": 2,
"Content": "Baseball",
"Correct": false
},
  {
"ID": 3,
"Content": "Table tennis",
"Correct": false
}
]
}
****************************************************************************/
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Question', 'Answers', 'Media'];

function getStepContent (step, quizID, questionID) {
  switch (step) {
    case 0:
      return <QuestionMeta quizID={quizID} questionID={questionID} />;
    case 1:
      return <AnswersForm quizID={quizID} questionID={questionID} />;
    case 2:
      return <OldQuestionMedia />;
    default:
      throw new Error('Unknown step');
  }
}

export default function OldQuestionEdit ({ quizID, questionID }) {
  const classes = useStyles();
  const token = localStorage.getItem('Token');
  const [activeStep, setActiveStep] = React.useState(0);
  /***************************************************************************
   *                     Functions of page next or back
  ****************************************************************************/
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  /***************************************************************************
  *                     Get all state of new question
  ****************************************************************************/
  const context = React.useContext(ShareContext);
  const photo = context.photo[0];
  const points = context.points[0];
  const questionContent = context.questionContent[0];
  const duration = context.duration[0];
  const questionType = context.questionType[0];
  const answers = context.answers[0];
  const youtubelink = context.youtube[0];
  /***************************************************************************
   *                    Use PUT to update question
   ****************************************************************************/
  async function submitQuestion (token, quizID, questionID) {
    const quizDetail = await getQuizDetail(quizID, token);
    const newQuestion = {};
    newQuestion.Content = questionContent;
    newQuestion.Type = questionType;
    newQuestion.Point = points;
    newQuestion.Duration = duration;
    newQuestion.YoutubeLink = youtubelink;
    newQuestion.Photo = photo;
    newQuestion.Answer = answers;

    quizDetail.questions[questionID] = newQuestion;
    putQuestion(token, quizID, quizDetail);
  }
  if (activeStep === steps.length) {
    submitQuestion(token, quizID, questionID);
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length
              ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Question add Success!
                  </Typography>
                  <Typography variant='h5' gutterBottom>
                  Click HOME back to dashboard page.
                </Typography>
              </React.Fragment>
                )
              : (
              <React.Fragment>
                {getStepContent(activeStep, quizID, questionID)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
                )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
OldQuestionEdit.propTypes = {
  quizID: PropTypes.string,
  questionID: PropTypes.string,
};
