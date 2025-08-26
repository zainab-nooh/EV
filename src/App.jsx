import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import routes from './routes.js';   
import { getUser } from './utils/users-service.js';
import AuthPage from './pages/AuthPage/AuthPage.jsx';


function App() {
  const [user, setUser] = useState(getUser());

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/*" element={<Navigate to="/home" />} />
    //   </Routes>
    // </Router>
    <Router>
      <main>
        {user ? (
          <>
            <Routes>
              {routes.map(({ Component, key, path }) => (
                <Route
                  key={key}
                  path={path}
                  element={<Component page={key} user={user} setUser={setUser} />}
                />
              ))}
              {/* <Route path="/*" element={<Navigate to="/home" />} /> */}
            </Routes>
          </>
        ) : (
          <AuthPage setUser={setUser} />
        )}
      </main>
    </Router>
  );
}

export default App;
