import React from 'react'

export default function StartScreen({numQuestions, dispatch}) {
  return (
    <div className='start'>
        <h2>welcome to  the react quiz </h2>
        <h3>{numQuestions} question to test your react mastery</h3>
        <button className='btn btn-ui' onClick={() => dispatch({type : 'start'})}>let's start!</button>
        
    </div>
  )
}
