import React from 'react'

export default function FinishScreen ({ points, maxPossiblePoints, dispatch }) {
const percentage = (points / maxPossiblePoints) * 100

  let emoji
  if (percentage === 100) emoji = '🎖️'
  if (percentage >= 80 && percentage < 100) emoji = '💐'
  if (percentage >= 60 && percentage < 80) emoji = '👏'
  if (percentage >= 40 && percentage < 60) emoji = '👍'
  if (percentage >= 20 && percentage < 40) emoji = '👎'
  if (percentage >= 0 && percentage < 20) emoji = '😒'

  return (
   <>
    <p className='result'>
      <span>{emoji}</span> you scored <strong>{points}</strong> out of{' '}
      {maxPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className='highscore'>(highScore: X points)</p>
    <button className='btn btn-ui' onClick={() => dispatch({type : 'restart'})}>Restart quiz!</button>
   </>
  )
}
