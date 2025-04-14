'use client'
import { useState } from "react"
import "./page.scss"

export default function Home() {
  const [flyers, setFlyers] = useState<any[]>([])
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)
  const [idCounter, setIdCounter] = useState(0)
  const trajectories = [1, 2, 3, 4]

  const handleClick = () => {
    const trajectory = trajectories[idCounter % 4]
    const newFlyer = {
      id: idCounter,
      trajectory,
    }
    setFlyers((prev) => [...prev, newFlyer])
    setIdCounter(idCounter + 1)

    // запускаем тряску и вспышку
    setTimeout(() => {
      setShake(true)
      setFlash(true)
      setTimeout(() => setShake(false), 300)
      setTimeout(() => setFlash(false), 400) // краснеет чуть дольше, чем тряска
    }, 900)
  }

  const handleFlyerAnimationEnd = (id: number) => {
    setFlyers((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="romah">
      <div className={`imageWrapper ${shake ? 'shake' : ''} ${flash ? 'red-flash' : ''}`}>
        <img src="Без имени.jpeg" alt="Фото" />
      </div>
      <button className="button" onClick={handleClick}>Нажми меня</button>

      {flyers.map(flyer => (
        <div
          key={flyer.id}
          className={`flyerWrapper trajectory-${flyer.trajectory}`}
          onAnimationEnd={() => handleFlyerAnimationEnd(flyer.id)}
        >
          <img src="pngwing.com.png" alt="Летящее фото" />
        </div>
      ))}
    </div>
  )
}
