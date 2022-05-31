import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-room" element={<NewRoom />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
