import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn'; // Correct casing
import Signup from './components/Signup';
import TeacherHome from './components/Teachercomponents/TeacherHome'
import StudentHome from './components/Studentcomponents/StudentHome'
import Resources from './components/Teachercomponents/Resources'
import Courses from "./components/Studentcomponents/Courses";
import AssignmentManagement from './components/Teachercomponents/AssignmentManagement';
import StudentAssignment from './components/Studentcomponents/StudentAssignment';
import ClassOverview from './components/Teachercomponents/ClassOverview';
import TeacherProfile from './components/Teachercomponents/TeacherProfile';
import StudentProfile from './components/Studentcomponents/StudentProfile';
import ChildrenProgress from './components/Teachercomponents/ChildrenProgress';
import TeacherAnnouncements from './components/Teachercomponents/TeacherAnnouncements';
import StudentAnnouncements from './components/Studentcomponents/StudentAnnouncements';
import StudentProgress from './components/Studentcomponents/StudentProgress';
import StudentQueries from './components/Studentcomponents/StudentQueries';
import TeacherQueries from './components/Teachercomponents/TeacherQueries';
import LandingPage from './components/LandingPage';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';  // Adjust the path if needed

  function App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/landingpage" />} /> {/* Redirect to Signup */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
            <Route path="/signin" element={<SignIn />} /> {/* Signin page */}
            <Route path="/teacherhome" element={<TeacherHome />} /> 
            <Route path="/studenthome" element={<StudentHome />} /> 
            <Route path="/courses" element={<Courses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/reset-password" element={<ResetPassword />} />  {/* Reset Password route */}

            <Route path="/assignments-management" element={<AssignmentManagement />} />
            <Route path="/assignments" element={<StudentAssignment />} />
            <Route path="/class-overview" element={<ClassOverview />} />
            <Route path="/teacherprofile" element={<TeacherProfile />} />
            <Route path="/studentprofile" element={<StudentProfile />} />
            <Route path="/children-progress/:email" element={<ChildrenProgress />} />
            <Route path="/teacherannouncements" element={<TeacherAnnouncements />} />
            <Route path="studentannouncements" element={<StudentAnnouncements />} />
            <Route path="/student-progress" element={<StudentProgress />} />
            <Route path="/studentqueries" element={<StudentQueries />} />
            <Route path="/teacherqueries" element={<TeacherQueries />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />




          </Routes>
        </div>
      </Router>
    );
  }


export default App;
