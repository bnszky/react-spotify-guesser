import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import WelcomePage from './components/WelcomePage/WelcomePage'
import PlaylistPreviewPage from './components/PlaylistPreviewPage/PlaylistPreviewPage'
import QuizPage from './components/QuizPage/QuizPage'

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/preview/:id" element={<PlaylistPreviewPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
  )
}

export default App
