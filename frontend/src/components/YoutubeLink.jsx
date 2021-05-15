import React from 'react';
import { ShareContext } from '../functions/shareStates.js';
import TextField from '@material-ui/core/TextField';

function YoutubeLink () {
  const context = React.useContext(ShareContext);
  const [youtubelink, setYoutubeLink] = context.youtube;
  return (
    <div className='App'>
      <TextField
        label='Youtube Link'
        variant='outlined'
        type='text'
        value={youtubelink}
        size='small'
        onChange={(e) => {
          setYoutubeLink(e.target.value);
        }}
      />
    </div>
  );
}
export default YoutubeLink;
