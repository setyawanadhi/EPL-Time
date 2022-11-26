import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      <NavLink to="/standing" className="link nav-link">
        Standing
      </NavLink>
      <NavLink to="/matches" className="link nav-link">
        Matches
      </NavLink>
      <a
        href="https://www.premierleague.com/"
        target="_blank"
        rel="noreferrer"
        className="link nav-link"
      >
        EPL Website
      </a>
      <NavLink to="/about" className="link nav-link">
        About
      </NavLink>
    </div>
  )
}
