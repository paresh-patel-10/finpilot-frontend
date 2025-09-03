// NEW: Import useState from React
import React, { useContext, useState } from 'react'; 
import { AppContext } from './context/AppContext';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import MainForm from './components/UserInput/MainForm';
import PlanDashboard from './components/Dashboard/PlanDashboard';
// NEW: Import the LandingPage component you just created
import LandingPage from './components/LandingPage'; 
import './App.css';

// CSS keyframes for background animation and text fade-in
const animations = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

function App() {
  const { generatedPlan, isLoading, error } = useContext(AppContext);
  
  // NEW STATE: This will control which view is shown. Defaults to true.
  const [showLandingPage, setShowLandingPage] = useState(true);

  // A cohesive dark color palette
  const darkPurple = '#0D0B1A';
  const textLight = 'rgba(200, 200, 220, 0.9)';
  
  // NEW HANDLER: This function will be called when the "Get Started" button is clicked.
  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  // NEW LOGIC: If showLandingPage is true, we only render the LandingPage component.
  if (showLandingPage) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // If showLandingPage is false, we render the main application as before.
  return (
    <>
      <style>{animations}</style>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          background: `linear-gradient(-45deg, ${darkPurple}, #1a1625, #221c35, ${darkPurple})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
      >
        {/* Left Panel (Brand + Tagline) */}
        <Box
          className="gradient-background"
          sx={{
            flex: '0 0 40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            background: 'rgba(15, 12, 30, 0.95)',
            p: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 5500,
              fontSize: "5rem",
              background: "linear-gradient(90deg, #8133d5ff, #b94386ff, #336acbff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your AI-Powered Financial Co-Pilot
          </Typography>
          <Typography
            variant="body1"
            align="left"
            sx={{
              mt: 2,
              color: textLight,
              animation: 'fadeIn 1s ease-out 0.5s forwards',
              maxWidth: '80%',
            }}
          >
            With FinPilot, your money moves with purpose. Plan smarter, invest wiser, and grow faster - guided by personalized financial roadmaps built for your future.
          </Typography>
        </Box>

        {/* Right Panel (Form or Dashboard) */}
        <Box
          sx={{
            flex: '0 0 60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(12, 10, 25, 0.95)',
            p: 4,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              width: '80%',
              backgroundColor: 'rgba(15, 12, 30, 0.9)',
              animation: 'fadeIn 1s ease-out 1s forwards',
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Generating your personalized plan...
                </Typography>
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mt: 4 }}>
                {error}
              </Alert>
            ) : generatedPlan ? (
              <PlanDashboard />
            ) : (
              <MainForm />
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default App;