const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []

function randomColor() {
    return `hsl(${Math.random() * 360},100%,60%)`
}

class Particle {

    constructor(x, y) {
        this.x = x
        this.y = y
        this.speedX = (Math.random() - 0.5) * 8
        this.speedY = (Math.random() - 0.5) * 8
        this.size = Math.random() * 3 + 2
        this.life = 100
        this.color = randomColor()
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.speedY += 0.05
        this.life--
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

function launchFirework() {

    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height / 2

    for (let i = 0; i < 120; i++) {
        particles.push(new Particle(x, y))
    }
}

function changeTitle(newText) {

    title.style.opacity = 0

    setTimeout(() => {
        title.textContent = newText
        title.style.opacity = 1
    }, 300)
}

function startFireworks() {

    const interval = setInterval(launchFirework, 300)

    setTimeout(() => {
        clearInterval(interval)
    }, 10000)
    changeTitle("Merci ! ❤️")
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {

        particles[i].update()
        particles[i].draw()

        if (particles[i].life <= 0) {
            particles.splice(i, 1)
        }
    }

    requestAnimationFrame(animate)
}

animate()