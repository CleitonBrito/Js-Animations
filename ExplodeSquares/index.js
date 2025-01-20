let square = document.getElementById('transiction');
let container = document.getElementsByClassName('square')[0];

let arraySquares = [];
var angle = 0, quantity = 0, quantityUntilEdge = 0;

const recalculate = () => {
    arraySquares = [];

    let width = window.innerWidth;
    let height = window.innerHeight;

    quantity = 10;
    angle = 360/quantity;

    let cos = Math.cos(angle * Math.PI / 180);

    let biggestEdge = width;

    if(height > width){
        biggestEdge = height;
    }

    let proportion = (biggestEdge / cos) / biggestEdge;
    let step = biggestEdge / (square.clientWidth / 1.2);
    quantityUntilEdge = biggestEdge/step;
    console.log(quantityUntilEdge);

    for(let i = 0; i < quantityUntilEdge; i++){
        data = {
            angle: (i + 1) * angle,
            size : 5 + ((square.clientWidth - 5) / quantity) * i,
            posX : (step * (i + 1)),
            posY : (step * (i + 1)) + proportion**(i*10),
        }
        arraySquares.push(data);
    }
    return arraySquares;
}
recalculate();

let ShowEffect = (event) => {
    if(event.type == 'resize'){
        recalculate();
        return 0;
    }

    let items = document.querySelectorAll(".pai");

    if(items.length != 0){
        items.forEach((item)=> {
            document.querySelectorAll(".pai")[0].remove();
        });
        return 0;
    }

    arraySquares = recalculate();

    for(let j = 0; j <= angle + 1; j++){
        var element = document.createElement('div');
        element.setAttribute('id', "pai-"+j);
        element.classList.add('pai');
        element.style.position = "relative";
        element.style.top = "20px";
        element.style.left = "0";
        element.style.transform = "rotate("+((j + 1) * angle)+"deg) translate(50%, 50%)";
        square.appendChild(element);
        for(var i = 0; i < quantityUntilEdge; i++){
                var children = document.createElement('div');
                children.classList.add('item');
                children.setAttribute('id', j+""+i);
                children.style.borderRadius = "50%";

                if(!children.classList.contains('in')){
                    (function(i){
                    setTimeout(function(){
                        document.getElementById(j+""+i).classList.add('in');
                    }, 50 * i);
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
};

container.addEventListener('click', ShowEffect);
window.addEventListener('resize', ShowEffect);