import React, {useContext, useReducer, createContext} from "react";
import "./style.css";

const MyContextA = createContext()
const MyContextB = createContext()

const ComponentA = () => {
  console.log('ComponentA rendered!')
  const {
    state: a,
    dispatch
  } = useContext(MyContextA)
  const incrementA = () => dispatch({
    type: 'INCREMENT_A'
  })
  return <>
    <h1>ComponentA: {a}</h1>
    <button {...{
      onClick: incrementA
    }}>Increment A</button>
  </>
}

const ComponentB = () => {
  console.log('ComponentB rendered!')
  const {
    state: b,
    dispatch
  } = useContext(MyContextB)

  const incrementB = () => dispatch({
    type: 'INCREMENT_B'
  })

  return <>
    <h1>ComponentB: {b}</h1>
    <button {...{
      onClick: incrementB
    }}>Increment B</button>
  </>
}

const Wrapper = ({children}) => {
  console.log('Wrapper rendered!')
  return <>
    <h1>I'm not interested in the state</h1>
    {children}
  </>
}

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'INCREMENT_A': 
      return {
        ...state,
        a: ++state.a
      }
    case 'INCREMENT_B': 
      return {
        ...state,
        b: ++state.b
      }
  }
}

const initialState = {
  a: 0,
  b: 0
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log('state=> ', state)
  return <MyContextA.Provider {...{
    value: {
      state: state.a,
      dispatch
    }
  }}>
    <MyContextB.Provider {...{
      value: {
        state: state.b,
        dispatch
      }
    }}>
      <Wrapper>
        <ComponentA />
        <ComponentB />
      </Wrapper>
    </MyContextB.Provider>
  </MyContextA.Provider>
}

export default App
