let container = document.getElementsByClassName('container')[0];
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let ctx = canvas.getContext('2d');

let dots = [];
let arrayColors = ['#eee', '#545454', "#596d91", '#bb5a68', '#696541'];
for (let index = 0; index < 60; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 2,
        color: arrayColors[Math.floor(Math.random() * 5)]
    });
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.fill();
    });
}

const show = (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - container.getBoundingClientRect().left,
        y: event.pageY - container.getBoundingClientRect().top
    }

    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x)**2 + (mouse.y - dot.y)**2);
        if(distance < 250){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
}

container.addEventListener('mousemove', (event) => {
    show(event);
});

window.addEventListener('load', (event) => {
    show(event);
});