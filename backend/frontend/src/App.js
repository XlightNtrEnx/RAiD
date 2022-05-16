import './App.css';
import HomePage from './mystuff/pages/home.js';
import LoginPage from './mystuff/pages/login';
import KeypressPage from './mystuff/pages/keypress.js';
import OpslogPage from './mystuff/pages/opslog.js';
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="keypress" element={<KeypressPage />} />
          <Route path="opslog" element={<OpslogPage />} />
          <Route
          path="*"
          element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
          }
          />
        </Route>
      </Routes>
    </div>
  );
}
