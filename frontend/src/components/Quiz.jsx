import React from 'react';
import PropTypes from 'prop-types';
import DashboardCard, { QuestionCard } from '../components/Card.jsx';
import Box from '@material-ui/core/Box';

function Questions (props) {
  return (
    <Box display="flex" flexWrap="wrap" p={1} bgcolor="background.paper">
      {props.data.map((val, idx) => {
        return (
          <Box key={idx} m={2}>
            <QuestionCard
              key={idx}
              quizID={props.quizID}
              questionID={idx}
              questionContent={val.Content}
              questionDuration={val.Duration}
              thumbnail={val.Photo}
            />
          </Box>
        );
      })}
    </Box>
  );
}
Questions.propTypes = {
  data: PropTypes.array,
  quizID: PropTypes.string,
};
export { Questions };
/***************************************************************************
 *                          Quiz part in Dashboard
 ****************************************************************************/
function Quiz (props) {
  return (
    <Box display="flex" flexWrap="wrap" p={1} bgcolor="background.paper">
      {props.data.map((val, idx) => {
        return (
          <Box key={idx} m={2}>
            <DashboardCard
              key={idx}
              quiz={val}
            />
          </Box>
        );
      })}
    </Box>
  );
}

Quiz.propTypes = {
  data: PropTypes.array,
};
export default Quiz;
