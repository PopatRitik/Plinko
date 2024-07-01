import { HEIGHT, WIDTH, ballRadius, obstacleRadius, sinkWidth } from "./constants.js"
import { Probability, createObstacles, createSinks } from "./object.js"
import { pad, unpad } from "./padding.js"
import { Ball } from "./ball.js"

export class Gameloop {
     constructor(canvasRef, onFinish) {
          this.balls = []
          this.canvasRef = canvasRef
          this.ctx = this.canvasRef.getContext("2d")
          this.obstacles = createObstacles()
          this.sinks = createSinks()
          this.hoverIndex = undefined
          this.update()
          this.onFinish = onFinish
          this.canvasRef.addEventListener("mousemove", this.handleMouseMove.bind(this))
     }

     addBall(startX) {
          const newBall = new Ball(
               startX || pad(WIDTH / 2 + 13),
               pad(50),
               ballRadius,
               "red",
               this.ctx,
               this.obstacles,
               this.sinks,
               index => {
                    this.balls = this.balls.filter(ball => ball !== newBall)
                    this.onFinish?.(index, startX)
               }
          )
          this.balls.push(newBall)
     }

     drawObstacles() {
          this.ctx.fillStyle = "bisque"
          this.obstacles.forEach(obstacle => {
               this.ctx.beginPath()
               this.ctx.arc(
                    unpad(obstacle.x),
                    unpad(obstacle.y),
                    obstacle.radius,
                    0,
                    Math.PI * 2
               )
               this.ctx.fill()
               this.ctx.closePath()
          })
     }

     getColor(index) {
          if (index < 3 || index > this.sinks.length - 3) {
               return { background: "#ff003f", color: "black" }
          }
          if (index < 6 || index > this.sinks.length - 6) {
               return { background: "#ff7f00", color: "black" }
          }
          if (index < 9 || index > this.sinks.length - 9) {
               return { background: "#ffbf00", color: "black" }
          }
          if (index < 12 || index > this.sinks.length - 12) {
               return { background: "#ffff00", color: "black" }
          }
          if (index < 15 || index > this.sinks.length - 15) {
               return { background: "#bfff00", color: "black" }
          }
          return { background: "#7fff00", color: "black" }
     }
     drawSinks() {
          this.ctx.fillStyle = "green"
          const SPACING = obstacleRadius * 2
          for (let i = 0; i < this.sinks.length; i++) {
               this.ctx.fillStyle = this.getColor(i).background
               const sink = this.sinks[i]
               if (this.hoverIndex === i) {
                    this.ctx.font = "bold 10px Arial";
                  } else {
                    this.ctx.font = "normal 13px Arial";
                  }
               this.ctx.fillRect(
                    sink.x,
                    sink.y - sink.height / 2,
                    sink.width - SPACING,
                    sink.height
               )
               this.ctx.fillStyle = this.getColor(i).color
               const text = this.hoverIndex === i ? Probability[i+1] : sink?.multiplier?.toString() + "x"
               this.ctx.fillText(text, sink.x - 15 + sinkWidth / 2, sink.y)
          }
     }

     draw() {
          this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
          this.drawObstacles()
          this.drawSinks()
          this.balls.forEach(ball => {
               ball.draw()
               ball.update()
          })
     }

     update() {
          this.draw()
          this.requestId = requestAnimationFrame(this.update.bind(this))
     }

     stop() {
          if (this.requestId) {
               cancelAnimationFrame(this.requestId)
          }
     }

     handleMouseMove(event) {
          const rect = this.canvasRef.getBoundingClientRect()
          const mouseX = event.clientX - rect.left
          const mouseY = event.clientY - rect.top
          this.hoverIndex = undefined
          for (let i = 0; i < this.sinks.length; i++) {
            const sink = this.sinks[i]
            if (
              mouseX >= sink.x - sink.width / 2 &&
              mouseX <= sink.x + sink.width / 2 &&
              mouseY >= sink.y - sink.height / 2 &&
              mouseY <= sink.y + sink.height / 2
            ) {
              this.hoverIndex = i
              break
            }
          }
        }
}
