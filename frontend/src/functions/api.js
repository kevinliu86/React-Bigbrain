import axios from 'axios';
const BASE_URL = 'http://localhost:5005/';
const myAxios = {
  post: (path, ...args) => axios.post(BASE_URL + path, ...args),
  get: (path, ...args) => axios.get(BASE_URL + path, ...args),
  put: (path, ...args) => axios.put(BASE_URL + path, ...args),
  delete: (path, ...args) => axios.delete(BASE_URL + path, ...args),
};
// By default, if the 2nd parameter to axios.post() is an object,
//  Axios serializes the object to JSON using the JSON.stringify() function.
//  If the 2nd parameter is an object, Axios also sets the content-type header to application/json
// await myAxios.post('admin/auth/register',{
//     email,
//     password,
//     name,
//   });
/***************************************************************************
 *                  get all quiz meta created by login user
 *                  Input: Token
 *                  Output: Quiz Meta Data
 ****************************************************************************/
async function getQuizMeta (token) {
  // setLoadingState('loading');
  try {
    const response = await myAxios.get('admin/quiz', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const quizsArray = response.data.quizzes;
    // setLoadingState('success');
    return quizsArray;
  } catch (error) {
    alert(error.response.data.error);
  }
}
/***************************************************************************
 *                  get quiz detail by quiz id
 *                  Input : QuizID Token
 *                  Output: QuizDetail
 ****************************************************************************/
async function getQuizDetail (quizID, token) {
  try {
    const response = await myAxios.get('admin/quiz/' + quizID, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.error);
  }
}
/***************************************************************************
 *                  get quiz detail by quiz id
 *                  Input : QuizID Token
 *                  Output: QuizDetail
 ****************************************************************************/
async function getQuizSession (token, quizID) {
  try {
    const response = await fetch('http://localhost:5005/admin/quiz/' + quizID, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson.active;
    } else if (response.status === 400) {
      alert('Invalid input');
    } else if (response.status === 403) {
      alert('Invalid Token');
    }
  } catch (error) {
    alert(error.response.data.error);
  }
}
/***************************************************************************
 *                 Put question
 *                 Input : quizID token data
 ****************************************************************************/
async function putQuestion (token, quizID, data) {
  try {
    const response = await fetch('http://localhost:5005/admin/quiz/' + quizID, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      console.log('PUT success');
    } else if (response.status === 400) {
      alert('Invalid input');
    } else if (response.status === 403) {
      alert('Invalid Token');
    }
  } catch (error) {
    alert(error.response.data.error);
  }
}
export { getQuizMeta, getQuizDetail, putQuestion, getQuizSession };
export default myAxios;
