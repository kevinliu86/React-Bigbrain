import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import myAxios, { getQuizDetail, getQuizSession } from '../functions/api.js';
import { Redirect } from 'react-router-dom';
import { ShareContext } from '../functions/shareStates.js';
import TextField from '@material-ui/core/TextField';
import copy from 'copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  paper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-200px',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
/***************************************************************************
 *                          QuestionCard in QuestionEDIT
 ****************************************************************************/
function QuestionCard ({
  quizID,
  questionID,
  questionContent,
  questionDuration,
  thumbnail,
}) {
  const token = localStorage.getItem('Token');
  /***************************************************************************
  *                    use share state to reload Dashboard
  ****************************************************************************/
  const context = React.useContext(ShareContext);
  const [reloadQustionList, setReloadQustionList] = context.reloadQustionList;
  const classes = useStyles();
  const [editQuestion, setEditQuestion] = React.useState(0);
  const [editQuiz, setEditQuiz] = React.useState(0);
  /***************************************************************************
   *                                Delete Question
   ****************************************************************************/
  async function deleteQuestion (quizID, questionID) {
    const body = await getQuizDetail(quizID, token);
    body.questions.splice(questionID, 1);
    try {
      const response = await myAxios.put(
        'admin/quiz/' + quizID,
        { ...body },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      if (response.status === 200) {
        alert('Delete Success');
        setReloadQustionList(reloadQustionList + 1);
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  if (editQuiz) {
    return <Redirect to={'/questionedit/' + editQuiz + '/' + editQuestion} />;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Question photo"
          height="140"
          src={`${thumbnail}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {questionContent}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {questionDuration}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          style={{ backgroundColor: '#27ab18' }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            setEditQuestion(questionID);
            setEditQuiz(quizID);
          }}
        >
          EDIT
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteQuestion(quizID, questionID);
          }}
        >
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
QuestionCard.propTypes = {
  quizID: PropTypes.string,
  questionID: PropTypes.number,
  questionContent: PropTypes.string,
  questionDuration: PropTypes.number,
  thumbnail: PropTypes.string,
};
/***************************************************************************
 *                          QuizCard in Dashboard
 *                            show thumbnail
 *                             Total Time
 ****************************************************************************/

export default function DashboardCard ({ quiz }) {
  const token = localStorage.getItem('Token');
  const [quizActive, setQuizActive] = React.useState(quiz.quizDetail.active);
  /***************************************************************************
   *                    show/hide Modal
   ****************************************************************************/
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [session, setSession] = React.useState(0);
  const [toResult, setToResult] = React.useState(false);
  /***************************************************************************
   *                    use share state to reload Dashboard
   ****************************************************************************/
  const context = React.useContext(ShareContext);
  const [reloadDashBoard, setReloadDashBoard] = context.reloadDashBoard;
  /***************************************************************************
   *                    2.3 Starting & stopping game
   ****************************************************************************/
  async function quizStartAPI (token, quizID) {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + quizID + '/start', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setReloadDashBoard(reloadDashBoard + 1);
        const session = await getQuizSession(token, quizID);
        setSession(session);
        handleOpen();
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  async function quizStopAPI (token, quizID) {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/' + quizID + '/end', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        if (confirm('Would you like to view the results?')) {
          setToResult(true);
        } else {
          // Do nothing!
          setReloadDashBoard(reloadDashBoard + 1);
        }
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  const quizStart = (quizID) => {
    setQuizActive(123);
    quizStartAPI(token, quizID);
  };
  const quizStop = (quizID) => {
    setQuizActive(null);
    quizStopAPI(token, quizID);
  };
  /***************************************************************************
   *                     Calculate sum time of quiz
   ****************************************************************************/
  const questionDurationByIndex = quiz.quizDetail.questions.map(
    (x) => x.Duration
  );
  // const getSum = (total, num) => {
  //   return total + num;
  // };
  // const totalTime = questionDurationByIndex.reduce(getSum, 0);
  const [editQuiz, setEditQuiz] = React.useState(0);
  /***************************************************************************
   *                             DELETE Quiz
   ****************************************************************************/
  async function deleteQuiz (quizID) {
    try {
      const response = await myAxios.delete('admin/quiz/' + quizID, {
        headers: { Authorization: 'Bearer ' + token },
      });
      if (response.status === 200) {
        setReloadDashBoard(reloadDashBoard + 1);
      } else if (response.status === 400) {
        alert('Invalid input');
      } else if (response.status === 403) {
        alert('Invalid Token');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  if (toResult) {
    return <Redirect to={'/results/' + session } />;
  }
  if (editQuiz) {
    return <Redirect to={'/quizedit/' + editQuiz} />;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Quiz Photo"
          height="140"
          src={`${quiz.quizDetail.thumbnail}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {quiz.quizDetail.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {quiz.quizDetail.questions.length} questions in this quiz.
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            This quiz will cost you {totalTime} seconds.
          </Typography> */}
          <TotalTime timeArray={questionDurationByIndex} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        {quizActive === null && (
          <ButtonCard clickFn={() => {
            quizStart(quiz.quizID);
          }} content={'Start'} />
        )}
        {quizActive !== null && (
          // <Button
          //   variant="contained"
          //   size="small"
          //   color="primary"
          //   onClick={() => {
          //     quizStop(quiz.quizID);
          //   }}
          // >
          //   Stop
          // </Button>
          <ButtonCard clickFn={() => {
            quizStop(quiz.quizID);
          }} content={'Stop'} />
        )}
        <Button
          style={{ backgroundColor: '#27ab18' }}
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            setEditQuiz(quiz.quizID);
          }}
        >
          EDIT
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteQuiz(quiz.quizID);
          }}
        >
          DELETE
        </Button>
        <Modal open={open} onClose={handleClose}>
          <div className={classes.paper}>
            <TextField
              label="Link"
              value={'localhost:3000/join/' + session}
            />
            <Button
            startIcon={<FileCopyIcon />}
            variant="contained"
            color="primary"
            onClick={() => {
              copy('localhost:3000/join/' + session);
            }}
          >Copy Link
          </Button>
          </div>
        </Modal>
      </CardActions>
    </Card>
  );
}
DashboardCard.propTypes = {
  quiz: PropTypes.object,
};

function ButtonCard ({ clickFn, content }) {
  return (<Button
    variant="contained"
    size="small"
    color="primary"
    onClick={clickFn}
  >{content}
  </Button>);
}
ButtonCard.propTypes = {
  clickFn: PropTypes.func,
  content: PropTypes.string,
};

function TotalTime ({ timeArray }) {
  const getSum = (total, num) => {
    return total + num;
  };
  const totalTime = timeArray.reduce(getSum, 0);
  return (<Typography
    variant="body2"
    color="textSecondary"
    component="p"
  >
  This quiz will cost you {totalTime} seconds.
  </Typography>);
}
TotalTime.propTypes = {
  timeArray: PropTypes.array,
}
export { QuestionCard, ButtonCard, TotalTime };
