let square = document.getElementById('transiction');
let container = document.getElementsByClassName('square')[0];

let width = window.innerWidth;
let height = window.innerHeight;

let quantity = 20;
let angle = 360/quantity;

let cos = Math.cos(angle * Math.PI / 180);

let biggestEdge = width;

if(height > width){
    biggestEdge = height;
}

let proportion = (biggestEdge / cos) / biggestEdge;
let step = biggestEdge / (square.clientWidth * 1.2);

let arraySquares = [];

container.addEventListener('click', () => {
    for(let i = 0; i < quantity; i++){
        data = {
            angle: (i + 1) * angle,
            size : 5 + ((square.clientWidth - 5) / quantity) * i,
            posX : (step * (i + 1)),
            posY : (step * (i + 1)) + proportion,
        }
        arraySquares.push(data);
        console.log(data.size);
    }

    for(let j = 0; j <= angle + 1; j++){
        var element = document.createElement('div');
        element.setAttribute('id', "pai-"+j);
        element.style.position = "relative";
        element.style.transition = "all 0.4s ease";
        element.style.top = "20px";
        element.style.left = "0";
        element.style.transform = "rotate("+((j + 1) * angle)+"deg) translate(50%, 50%)";
        square.appendChild(element);
        for(var i = 0; i < quantity; i++){
                var children = document.createElement('div');
                children.classList.add('item');
                children.setAttribute('id', j+""+i);

                if(!children.classList.contains('in')){
                    (function(i){
                    setTimeout(function(){
                        console.log(document.getElementById(j+""+i).classList.add('in'));
                    }, 20 * i);
                    })(i);
                }
                element.appendChild(children);
                children.style.width = arraySquares[i].size+"px";
                children.style.height = arraySquares[i].size+"px";
                children.style.backgroundColor = "red";
                children.style.position = "absolute";
                children.style.top = arraySquares[i].posX+"px";
                children.style.left = arraySquares[i].posY+"px";
        }
    }
});