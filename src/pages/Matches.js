import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function Matches(props) {
  const [lastMatch, setLastMatch] = useState([])
  const [currentMatchday, setCurrentMatchday] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { history } = props

  useEffect(() => {
    setHasError(false)
    const options = {
      method: 'GET',
      url: `http://api.football-data.org/v2/competitions/2021/matches?status=FINISHED`,
      headers: {
        'X-Auth-Token': 'ea0130e692a3472889646ef54e20b7e3',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.matches)
        setLastMatch(response.data.matches)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error)
        setHasError(true)
      })
  }, [])

  useEffect(() => {
    const matchDay = {
      method: 'GET',
      url: `https://api.football-data.org/v2/competitions/2021/standings`,
      headers: {
        'X-Auth-Token': 'ea0130e692a3472889646ef54e20b7e3',
      },
    }

    axios
      .request(matchDay)
      .then(function (response) {
        console.log(response.data.season.currentMatchday - 1)
        setCurrentMatchday(response.data.season.currentMatchday - 1)
      })
      .catch(function (error) {
        console.error(error)
        setHasError(true)
      })
  }, [])

  const matchDay = currentMatchday

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="matches">
      <div>
        <h1 className="title">Premier League</h1>
        <h2 className="title">Matchday {currentMatchday} Results</h2>
      </div>
      <table className="match-table">
        <thead className="header">
          <tr>
            <th>Home Team</th>
            <th>Score</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {lastMatch
            .filter((md) => md.matchday === matchDay)
            .map((x) => (
              <tr key={x.id}>
                <td className="home">{x.homeTeam.name}</td>
                <td className="fixture">
                  <NavLink
                    to={`/matches/${x.id}`}
                    onClick={() => history.push(`/matches/${x.id}`)}
                    className="link score-link"
                  >
                    {x.score.fullTime.homeTeam}-{x.score.fullTime.awayTeam}
                  </NavLink>
                </td>
                <td className="away">{x.awayTeam.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {hasError && (
        <h6 className="loadings">
          An error occurred while fetching data, data cannot be loaded, please
          come back later
        </h6>
      )}
    </div>
  )
}
