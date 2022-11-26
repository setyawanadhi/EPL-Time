import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

export default function MatchDetail() {
  const [match, setMatch] = useState()
  const { matchId } = useParams()

  useEffect(() => {
    const match = {
      method: 'GET',
      url: `https://api.football-data.org/v2/matches/${matchId}`,
      headers: {
        'X-Auth-Token': 'ea0130e692a3472889646ef54e20b7e3',
      },
    }

    axios
      .request(match)
      .then(function (response) {
        console.log(response.data.match)
        setMatch(response.data.match)
      })
      .catch(function (error) {
        console.error(error)
        // setHasError(true)
      })
  }, [matchId])

  const scoreHomeTeam =
    match === undefined
      ? 'Loading..'
      : match.score.fullTime.homeTeam === 0
      ? '0'
      : match.score.fullTime.homeTeam
  const scoreAwayTeam =
    match === undefined
      ? 'Loading..'
      : match.score.fullTime.awayTeam === 0
      ? '0'
      : match.score.fullTime.awayTeam

  return (
    <div className="match">
      {match === undefined ? (
        'Wait a moment'
      ) : (
        <div>
          <h1 className="title">{match.competition.name}</h1>
          <h2 className="title">Matchday {match.matchday}</h2>
          <h3 className="title">
            {match.homeTeam.name}{' '}
            <span>
              {scoreHomeTeam} - {scoreAwayTeam}
            </span>{' '}
            {match.awayTeam.name}
          </h3>
          <div className="match-detail">
            <p>
              <strong>Stadium: </strong> {match.venue}
            </p>
            <p>
              <strong>Time: </strong> {match.utcDate.replace('T', ' ')} UTC
            </p>
            <p>
              <strong>Referees: </strong>
            </p>
            {match.referees.map((r) => {
              return (
                <p key={r.id}>
                  {r.name} from {r.nationality}
                </p>
              )
            })}
            <p>
              <strong>Status: </strong>
              {match.status}
            </p>
            <p>
              <strong>Winner: </strong>
              {match.score.winner === 'HOME_TEAM'
                ? match.homeTeam.name
                : match.awayTeam.name}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
