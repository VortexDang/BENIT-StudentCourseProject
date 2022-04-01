import * as React from 'react';
import HomePage from './homePage';
import CoursesPage from './coursesPage';
import StudentPage from './studentPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/"element={<HomePage/>}/>
      </Routes>
      <Routes>
        <Route exact path="/student-page/:id"element={<StudentPage/>}/>
      </Routes>
      <Routes>
        <Route exact path="/courses"element={<CoursesPage/>}/>
      </Routes>
    </Router>
    </div>
  );
}
