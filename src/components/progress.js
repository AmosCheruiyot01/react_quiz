
import React from 'react'

export default function Progress({index, numQuestions, points,  maxPossiblePoints, answer}) {
  return (
    <header className='progress'>

<progress max = {numQuestions} value={index + Number(answer !== null)}/>

        <p>question <strong>{index + 1}</strong>/ {numQuestions}</p>
        <p><strong>{points}</strong> / { maxPossiblePoints}</p>
    </header>
  )
}
