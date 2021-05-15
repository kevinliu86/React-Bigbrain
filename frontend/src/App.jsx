import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './pages/LoginTemp.jsx';
import SignUp from './pages/RegisterTemp.jsx';
import NavBar from './components/Navbar.jsx';
import QuizEdit from './pages/QuizEdit.jsx';
import QuestionEdit from './pages/QuestionEdit.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddQuestion from './pages/AddQuestion.jsx'
import ShareProvider from './functions/shareStates.js';
import Results from './pages/Results';
import JoinGame from './pages/JoinGame';
import PlayGame from './pages/PlayGame';
import JoinGamewithSession from './pages/JoinGamewithSession';

function App () {
  return (
    <ShareProvider>
      <Router>
        <div>
          <NavBar />
          <Body />
        </div>
      </Router>
    </ShareProvider>
  );
}
function Body () {
  return (
    <Switch>
      <Route path='/login'>
        <SignIn />
      </Route>
      <Route path='/register'>
        <SignUp />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/quizedit/:quizid'>
        <QuizEdit />
      </Route>
      <Route path='/addquestion/:quizid'>
        <AddQuestion />
      </Route>
      {/* react router wildcard */}
      <Route path='/questionedit/:quizid/:questionid'>
        <QuestionEdit />
      </Route>
      <Route path='/results/:sessionid'>
        <Results />
      </Route>
      <Route path='/join/:sessionid'>
        <JoinGamewithSession />
      </Route>
      <Route path='/join'>
        <JoinGame />
      </Route>
      <Route path='/play/:playerid'>
        <PlayGame />
      </Route>
      <Route path='/'>
        <SignIn />
      </Route>
    </Switch>
  );
}
export default App;
