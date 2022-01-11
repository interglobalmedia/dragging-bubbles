function draw() {
    const canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    if (canvas.getContext) {
        ctx = canvas.getContext('2d')
        ctx.beginPath()
        const centerX = canvas.width / 2
        const centerY = canvas.width / 2
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(0, 200)
        ctx.lineTo(200, 0)
        ctx.closePath()
        ctx.stroke()
    }
}

function drawTriangleTwo() {
    const canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    ctx.beginPath()
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(200, 400)
    ctx.lineTo(400, 200)
    ctx.closePath()
    ctx.stroke()
}

function drawShapes() {
    draw()
    drawTriangleTwo()
}

drawShapes()

