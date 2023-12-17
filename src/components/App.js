// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './startScreen'
import Question from './Question'
import { type } from '@testing-library/user-event/dist/type'
import NextButton from './nextButton'
import Progress from './progress'
import Footer from './Footer'
import Timer from './Timer'
import FinishScreen from './finishScreen '

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  // laoding, error, ready, active,finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
}

// console.log(initialState.questions);

function reducer (state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }

    case 'start':
      return { ...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points
      }

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }

    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore
      }

    case 'restart':
      return {
        ...state,
        questions: state.questions,
        status: 'ready',
        secondsRemaining: 10
      }

case 'tick':
  return {
    ...state, 
    secondsRemaining: state.secondsRemaining - 1,
    status: state.secondsRemaining === 0? 'finished': state.status


  }

    default:
      throw new Error('unhandled action type in reducer')
  }
}

export default function App () {
  const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then(res => res.json())
      .then(response => dispatch({ type: 'dataReceived', payload: response }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='App'>
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              className='progress'
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
         <Footer>
         <Timer dispatch={dispatch} secondsRemaining = {secondsRemaining}/>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
         </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}
