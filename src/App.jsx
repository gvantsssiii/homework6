
import {useEffect, useState } from 'react'
import './App.css'

function App() {

  const [advice, setAdvice] = useState("")
  const [adviceId, setAdviceId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [Spin, setSpin] = useState(false)

  async function getAdvice(){
    setSpin(true)
    setLoading(true)
    const resp = await fetch('https://api.adviceslip.com/advice')                
    const data = await resp.json()

    if(resp.status === 200){
      setAdvice(data.slip.advice)
      setAdviceId(data.slip.id)
      setLoading(false)

       setTimeout(() => {
        setSpin(false)
      }, 500)
    }
  }

  useEffect(() => {
      getAdvice()
  }, [])


  return (
    <>
      <div className='box'>
        <h4 className="id">ADVICE #{adviceId}</h4>
        <h2>{loading ? 'Loading...' : `"${advice}"`}</h2>

      <div className="lines">
        <div className="line gray"></div>
        <div className="line white"></div>
        <div className="line white"></div>
        <div className="line gray"></div>
      </div>
        
        <button onClick={getAdvice} className={Spin ? 'spin' : ''}><img src="/assets/pic.png"/></button>

      </div>
    </>
  )
}

export default App
