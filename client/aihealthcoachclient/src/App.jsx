import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./pages/verifyEmail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
          <Route  path="/verify-email" element={<VerifyEmail />}/>
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/profile" element={<Profile />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;