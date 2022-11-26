import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import BottomNav from './components/BottomNav'
import Standing from './pages/Standing'
import Team from './pages/Team'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import About from './pages/About'

const history = createBrowserHistory()

function App() {
  return (
    <BrowserRouter history={history}>
      <div className="app">
        <header>
          <h1>Premier League Time</h1>
        </header>
        <Routes>
          <Route path="/" element={<Navigate replace to="/standing" />} />
          <Route path="/standing" element={<Standing />} />
          <Route path="/standing/:teamId" element={<Team />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:matchId" element={<MatchDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>
          <BottomNav />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
