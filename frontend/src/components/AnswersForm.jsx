import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ShareContext } from '../functions/shareStates.js';
import { getQuizDetail } from '../functions/api.js';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function AnswersForm ({ quizID, questionID }) {
  const token = localStorage.getItem('Token');
  const context = React.useContext(ShareContext);
  const [answersArray, setAnswersArray] = context.answers;
  const [loadingState, setLoadingState] = React.useState('idle');
  React.useEffect(() => {
    async function getQuestion () {
      // return question array in quizObj
      const quizObj = await getQuizDetail(quizID, token);
      const answers = quizObj.questions[questionID].Answer;
      setAnswersArray(answers);
      setLoadingState('success');
    }
    // get old question value
    getQuestion();
  }, []);
  const addNewAnswer = () => {
    if (answersArray.length < 6) {
      const newAnswerInputs = [...answersArray];
      const newAnswerObj = {};
      newAnswerObj.ID = newAnswerInputs.length;
      newAnswerObj.Content = '';
      newAnswerObj.Correct = false;
      newAnswerInputs.push(newAnswerObj);
      setAnswersArray(newAnswerInputs);
    } else {
      alert('Question must have 2-6 answers!');
    }
  };
  // const removeAnswer = () => {};
  const updateAnswer = (index, value) => {
    const newAnswerInputs = [...answersArray];
    newAnswerInputs[index].Content = value;
    setAnswersArray(newAnswerInputs);
  };

  return (
    <section className="App">
      {loadingState === 'success' && (
        <div>
          {answersArray.map((val, idx) => {
            return (
              <AnswerInput
                key={idx}
                index={idx}
                setAnswer={updateAnswer}
                setAnswerArray={setAnswersArray}
                answerValue={answersArray}
              />
            );
          })}
          <Button
            style={{ backgroundColor: '#27ab18' }}
            variant="contained"
            size="small"
            color="primary"
            onClick={addNewAnswer}
          >
            ADD New Answer
          </Button>
        </div>
      )}
      {loadingState !== 'success' && <p>Loading...</p>}
    </section>
  );
}
AnswersForm.propTypes = {
  quizID: PropTypes.string,
  questionID: PropTypes.string,
};
function AnswerInput ({ index, setAnswer, setAnswerArray, answerValue }) {
  const [checked, setChecked] = React.useState(answerValue[index].Correct);
  const deleteAnswer = () => {
    if (answerValue.length > 2) {
      const newAnswerInputs = [...answerValue];
      newAnswerInputs.splice(index, 1);
      setAnswerArray(newAnswerInputs);
    } else {
      alert('Question must have 2-6 answers!');
    }
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (answerValue[index].Content !== '') {
      const newAnswerInputs = [...answerValue];
      newAnswerInputs[index].Correct = true;
      setAnswerArray(newAnswerInputs);
    } else {
      alert('Please enter the answer content first!');
    }
  };
  return (
    <div>
      <TextField
        label={'Answer' + (index + 1)}
        fullWidth
        type="text"
        onChange={(e) => setAnswer(index, e.target.value)}
        value={answerValue[index].Content}
      />
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={deleteAnswer}
      >
        DELETE{' Answer' + (index + 1)}
      </Button>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label={'Answer' + (index + 1) + ' is True.'}
        />
      </FormGroup>
    </div>
  );
}

AnswerInput.propTypes = {
  index: PropTypes.number,
  setAnswer: PropTypes.func,
  setAnswerArray: PropTypes.func,
  answerValue: PropTypes.array,
};
