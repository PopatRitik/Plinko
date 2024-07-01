import { useEffect, useRef, useState } from "react"
import { Gameloop } from "../game/gameloop.js"
import "../src/App.css"
import axios from "axios"

export function Game() {
  const [gameloop, setGameloop] = useState();
  const [amt, setAmt] = useState(0);
  const [score, setScore] = useState(0);
  const canvasRef = useRef();

  function onFinish(index) {
    const MULTIPLIERS = {
      0: 16,
      1: 9,
      2: 2,
      3: 1.4,
      4: 1.4,
      5: 1.2,
      6: 1.1,
      7: 1,
      8: 0.5,
      9: 1,
      10: 1.1,
      11: 1.2,
      12: 1.4,
      13: 1.4,
      14: 2,
      15: 9,
      16: 16
    }
    setScore(prevScore => prevScore + (MULTIPLIERS[index]*100.00 || 0))
  }
  

  useEffect(() => {
    if (canvasRef.current) {
      const gameloop = new Gameloop(canvasRef.current,onFinish)
      setGameloop(gameloop)
    }
  }, [canvasRef])

  return (
    <div className="game-container">
      <div className="mt-4">
        <h2>Amount: {amt}</h2>
        <h2>Score: {score}</h2>
      </div>
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <button
        className="button"
        onClick={async () => {
          const response = await axios.post(`http://localhost:3000/game`, {
            data: 1
          })
          if (gameloop) {
            gameloop.addBall(response.data.point)
          }
          setAmt(amt+100);
        }}
      >
        Add ball
      </button>
    </div>
  )
}
