import React from 'react';
import { ShareContext } from '../functions/shareStates.js';
function PhotoUpload () {
  const context = React.useContext(ShareContext);
  const [photo, setPhoto] = context.photo;
  async function uploadImage (e) {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPhoto(base64);
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className='App'>
      <input
        type='file'
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <br></br>
      <img src={photo} height='200px' />
    </div>
  );
}

export default PhotoUpload;
