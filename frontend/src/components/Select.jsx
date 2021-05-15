import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ShareContext } from '../functions/shareStates.js';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function QuestionTypeSelect () {
  const context = React.useContext(ShareContext);
  const [questionType, setQuestionType] = context.questionType;
  const classes = useStyles();

  const handleChange = (event) => {
    setQuestionType(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="type-select-label">Question Type</InputLabel>
        <Select
          labelId="type-select-label"
          value={questionType}
          onChange={handleChange}
        >
          <MenuItem value={'Multiple'}>Multiple Choice</MenuItem>
          <MenuItem value={'Single'}>Single Choice</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function PointsSelect () {
  const classes = useStyles();
  const context = React.useContext(ShareContext);
  const [points, setPoints] = context.points;

  const handleChange = (event) => {
    setPoints(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="points-select-label">Points</InputLabel>
        <Select
          labelId="points-select-label"
          value={points}
          onChange={handleChange}
        >
          <MenuItem value={'Standard'}>Standard</MenuItem>
          <MenuItem value={'Double'}>Double points</MenuItem>
          <MenuItem value={'No'}>No points</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function TimeSelect () {
  const classes = useStyles();
  const context = React.useContext(ShareContext);
  const [timeDuration, setTimeDuration] = context.duration;

  const handleChange = (event) => {
    setTimeDuration(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="time-select-label">Time limit</InputLabel>
        <Select
          labelId="time-select-label"
          value={timeDuration}
          onChange={handleChange}
        >
          <MenuItem value={10}>10s</MenuItem>
          <MenuItem value={20}>20s</MenuItem>
          <MenuItem value={30}>30s</MenuItem>
          <MenuItem value={40}>40s</MenuItem>
          <MenuItem value={50}>50s</MenuItem>
          <MenuItem value={60}>60s</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export { TimeSelect, QuestionTypeSelect, PointsSelect };
