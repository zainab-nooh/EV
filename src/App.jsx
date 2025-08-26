import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import routes from './routes.js';
import { getUser } from './utils/users-service.js';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
function App() {
  const [user, setUser] = useState(getUser());
  return (
    <Router>
      <main>
        <Routes>
          {user ? (
            // Protected routes for authenticated users
            <>
              {routes.map(({ Component, key, path }) => (
                <Route
                  key={key}
                  path={path}
                  element={<Component page={key} user={user} setUser={setUser} />}
                />
              ))}
              {/* Redirect to home if trying to access auth while logged in */}
              <Route path="/auth" element={<Navigate to="/home" />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </>
          ) : (
            // Routes for unauthenticated users
            <>
              <Route path="/auth" element={<AuthPage setUser={setUser} />} />
              <Route path="/*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}
export default App;





















