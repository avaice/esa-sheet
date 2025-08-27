
import { useState } from 'react'
import './App.css'
type Timing = 'morning' | 'noon' | 'night'
type Esa = {
  timing: Timing
  count: number
}

const getEsaLog = (): {
  date: string
  morning: number
  noon: number
  night: number
}[] => {
  const json = localStorage.getItem('esa')
  if (json) {
    return JSON.parse(json)
  }
  return []
}

const useEsa = () => {

  const getTodayEsa = () => {
    const esaLog = getEsaLog()
    const today = new Date().toISOString().slice(0, 10)
    const todayEsa = esaLog.find(e => e.date === today)
    return todayEsa || { date: today, morning: 0, noon: 0, night: 0 }
  }
  const [todayEsa, setTodayEsa] = useState(getTodayEsa())

  const ageruEsa = (esa: Esa) => {
    const esaLog = getEsaLog()
    const today = new Date().toISOString().slice(0, 10)
    const todayEsa = esaLog.find(e => e.date === today)
    if (todayEsa) {
      todayEsa[esa.timing] += esa.count
    } else {
      const newEsa = {
        date: today,
        morning: 0,
        noon: 0,
        night: 0,
        [esa.timing]: esa.count
      }
      esaLog.push(newEsa)
    }
    localStorage.setItem('esa', JSON.stringify(esaLog))
    setTodayEsa(getTodayEsa())
  }

  return { ageruEsa, getTodayEsa, todayEsa }
}

function App() {
  const { ageruEsa, getTodayEsa } = useEsa()
  const todayEsa = getTodayEsa()

  return (
    <>
      <div>
        <h1>今日の餌やり</h1>
        <div>
          <button onClick={() => ageruEsa({ timing: 'morning', count: 1 })}>
            朝: {todayEsa.morning}
          </button>
          <button onClick={() => ageruEsa({ timing: "noon", count: 1 })}>
            昼: {todayEsa.noon}
          </button>
          <button onClick={() => ageruEsa({ timing: 'night', count: 1 })}>
            夜: {todayEsa.night}
          </button>
        </div>
        <div>
          <p>total: {todayEsa.morning + todayEsa.noon + todayEsa.night}</p>
        </div>
      </div>
    </>
  )
}

export default App
