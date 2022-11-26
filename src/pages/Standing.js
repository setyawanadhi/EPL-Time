import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Standing(props) {
  const [standing, setStanding] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { history } = props

  useEffect(() => {
    const loadData = async () => {
      setHasError(false)
      try {
        const ENDPOINT_STAND = `https://api.football-data.org/v2/competitions/2021/standings`
        const apiKey = 'ea0130e692a3472889646ef54e20b7e3'
        const options = {
          method: 'GET',
          headers: {
            'X-Auth-Token': apiKey,
          },
        }
        console.log(ENDPOINT_STAND)

        const response = await fetch(ENDPOINT_STAND, options)
        const jsonData = await response.json()

        const info = jsonData.standings[0].table
        // const season = jsonData.season.currentMatchday
        // console.log(season)
        // console.log('test')
        console.log(info)
        setStanding(info)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setHasError(true)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="standing">
      <h1 className="title">Premier League Standing</h1>
      <table className="standing-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Club Name</th>
            <th>G</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standing.map((stand, id) => (
            <tr key={id}>
              <td>{stand.position}</td>
              <td>
                <NavLink
                  to={`/standing/${stand.team.id}`}
                  onClick={() => history.push(`/standing/${stand.team.id}`)}
                  className="link team-link"
                >
                  <p>{stand.team.name}</p>
                </NavLink>
              </td>
              <td className="posctr">
                <p>{stand.playedGames}</p>
              </td>
              <td className="posctr">
                <p>{stand.won}</p>
              </td>
              <td className="posctr">
                <p>{stand.draw}</p>
              </td>
              <td className="posctr">
                <p>{stand.lost}</p>
              </td>
              <td className="posctr">
                <p>{stand.goalDifference}</p>
              </td>
              <td className="posctr">
                <p>
                  <b>{stand.points}</b>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasError && (
        <h6 className="loadings">
          An error occurred while fetching data, data cannot be loaded,
        </h6>
      )}
    </div>
  )
}
