import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import routes from '../app-server.js'
import { getUser } from './utils/users-service.js'
import AuthPage from './pages/AuthPage/AuthPage.jsx';


function App() {
  const [user, setUser] = useState(getUser())
  return (
    <Router>
			<main className={styles.App}>
			{
				user ?
			<>
			<Routes>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						element={
						<Component 
							page={key} 
							user={user}
							setUser={setUser}
						/>
						}
					></Route>
				))}
				<Route path='/*' element={<Navigate to="/"/>}/>
         {/*Requires home route   */}
			</Routes>
			</>
			:
		<AuthPage setUser={setUser}/>
		}
		</main>
		</Router>
  )
}

export default App
