// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage/AddSubcriptionPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import AddSurveyPage from "./pages/AddSurveyPage/AddSurveyPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
        path="/addsubscription"
        element={
          <PrivateRoute>
            <AddSubscriptionPage />
          </PrivateRoute>
        } 
        />
        <Route
          path="/addproduct"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
          />
        <Route
          path="/addsurvey"
          element={
            <PrivateRoute>
              <AddSurveyPage />
            </PrivateRoute>
          }
          />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
