There are three component tests in App.test.jsx.
The first test is about the button of the card in the dashboard.
The second test is about the correct display title.
The third test is about calculating the correct total quiz time.

Our program completed task 2.2 --- 2.4
2.4.2/ 2.4.3/ 2.3.3 art not fully implemented.

The flow of this program:
Admin => Register/Login => Dashboard Page => Add New Quiz / Logout  in Navbar. Start(stop)/ Edit/ Delete Quiz => The dashboard will auto rerender after an update or delete quiz/question.

Quiz Edit => User can edit exist questions or add new questions 
There are 3 steps to edit question
        =>1. edit question meta(question duration, question content, question type, question points)
        =>2. edit answers
            add/ remove answer between 2-6 
            select correct answer
            edit answer content
        =>3. question media
            User can upload photo / Youtube link to the question in this step

After Quiz starts there is a pupop show link to start the game
Users also can navigate to http://localhost:3000/join fill input to join the started game.