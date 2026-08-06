import { useResume } from "./context/ResumeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

import AppNavbar from "./components/AppNavbar";
import LandingNavbar from "./components/LandingNavbar";

import Home from "./pages/Home";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobMatchPage from "./pages/JobMatch";
import Mentor from "./pages/Mentor";
import Simulator from "./pages/Simulator";
import SkillGapPage from "./pages/SkillGap";
import About from "./pages/About";
import Momentum from "./pages/Momentum";


function App() {

    const {

      skills,
      setSkills,

      resumeText,
      setResumeText,

      parsedResume,
      setParsedResume,

      selectedCareer,


    } = useResume();

    const location = useLocation();

    const landingRoutes = ["/", "/login", "/signup"];

    const isLanding = landingRoutes.includes(location.pathname);

  return (

    <>
      {isLanding ? <LandingNavbar /> : <AppNavbar />}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/signup"
            element={<Signup />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis
                setSkills={setSkills}
                setResumeText={setResumeText}
                setParsedResume={setParsedResume}
                parsedResume={parsedResume}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-match"
          element={
            <JobMatchPage
              resumeText={resumeText}
            />
          }
        />

        <Route
          path="/mentor"
          element={
            <Mentor
              selectedCareer={selectedCareer}
            />
          }
        />
        <Route
            path="/momentum"
            element={<Momentum />}
        />

        <Route
          path="/simulator"
          element={
            <Simulator
              skills={skills}
              selectedCareer={selectedCareer}
            />
          }
        />

        <Route
          path="/skill-gap"
          element={
            <SkillGapPage
              skills={skills}
              selectedCareer={selectedCareer}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </>

  );
}

export default App;