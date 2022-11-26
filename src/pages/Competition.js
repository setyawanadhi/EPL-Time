import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function Competition(props) {
  const [competition, setCompetition] = useState()
  const { history } = props

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.football-data.org/v2/competitions',
      headers: {
        'X-Auth-Token': 'ea0130e692a3472889646ef54e20b7e3',
      },
    }

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.competitions.filter((i, idx) => idx < 50))
        setCompetition(response.data.competitions.filter((i, idx) => idx < 50))
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1>Competitions</h1>
      {competition === undefined
        ? 'Wait a moment'
        : competition.map((c) => {
            return (
              <NavLink
                key={c.id}
                to={`/competition/${c.id}`}
                onClick={() => history.push(`/competition/${c.id}`)}
                className="link"
              >
                <p>
                  {c.name} | {c.area.name}
                </p>
              </NavLink>
            )
          })}
    </div>
  )
}
