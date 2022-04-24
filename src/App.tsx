import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
