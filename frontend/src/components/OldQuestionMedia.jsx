import React from 'react';
import Typography from '@material-ui/core/Typography';
import PhotoUpload from './PhotoUpload';
import YoutubeLink from './YoutubeLink';

export default function OldQuestionMedia () {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Upload a photo
      </Typography>
      <PhotoUpload />
      <Typography variant='h6' gutterBottom>
        Input a youtube link
      </Typography>
      <YoutubeLink />
    </React.Fragment>
  );
}
