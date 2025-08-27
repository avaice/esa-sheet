
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
    <div className='grid place-items-center h-dvh'>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-[32px] font-bold'>今日の餌やり</h1>
        <div className='flex gap-4'>
          <button className='shadow rounded-lg bg-white w-[150px] h-[80px] border border-gray-300 px-4 py-2 text-[40px] hover:bg-gray-100 active:bg-gray-200' onClick={() => ageruEsa({ timing: 'morning', count: 1 })}>
            朝: {todayEsa.morning}
          </button>
          <button className='shadow rounded-lg bg-white w-[150px] h-[80px] border border-gray-300 px-4 py-2 text-[40px] hover:bg-gray-100 active:bg-gray-200' onClick={() => ageruEsa({ timing: "noon", count: 1 })}>
            昼: {todayEsa.noon}
          </button>
          <button className='shadow rounded-lg bg-white w-[150px] h-[80px] border border-gray-300 px-4 py-2 text-[40px] hover:bg-gray-100 active:bg-gray-200' onClick={() => ageruEsa({ timing: 'night', count: 1 })}>
            夜: {todayEsa.night}
          </button>
        </div>
        <div>
          <p>{
            new Date().toISOString().slice(0, 10)
          }の合計: {todayEsa.morning + todayEsa.noon + todayEsa.night}</p>
        </div>
      </div>
    </div>
  )
}

export default App
