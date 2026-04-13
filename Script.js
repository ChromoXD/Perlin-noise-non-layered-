const cvs = document.getElementById('cvs');
const ctx = cvs.getContext('2d');

cvs.width = Math.min(window.innerWidth, window.innerHeight);
cvs.height = Math.min(window.innerWidth, window.innerHeight);

let Width = cvs.width;
let Height = cvs.height;

let img = ctx.createImageData(Width, Height);

window.addEventListener('resize',() => {    
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
})


function Dot_Prod([x1, y1], [x2, y2], a) {
    return ((x1-x2) * Math.cos(a) + (y1-y2) * Math.sin(a));
}

function fade(t) {
    return t*t*t*(t*(6*t - 15) + 10)
}

function lerp(a, b, t) {
    return a + (b - a) * t
}




let angles = [];

for (let i = 0; i < 4; i++) {
    angles.push(2*Math.PI*Math.random());
}


for (let i = 0; i < Height; i++) {
    for (let o = 0; o < Width; o++) {
        let index = (i * Width + o)*4;
        

        let x = o/cvs.width;
        let y = Math.abs((i - cvs.height + 1)/cvs.height);

        let u = fade(x);
        let v = fade(y);

        let x1 = lerp(Dot_Prod([0,1],[x,y],angles[2]), Dot_Prod([1,1],[x,y],angles[3]), u);
        let x2 = lerp(Dot_Prod([0,0],[x,y],angles[0]), Dot_Prod([1,0],[x,y],angles[1]), u);
        let avg = lerp(x1, x2, v)

        img.data[index + 0] = 255*avg;
        img.data[index + 1] = 255*avg;
        img.data[index + 2] = 255*avg;
        img.data[index + 3] = 255;

        // console.log(avg);
        
    }
}

ctx.putImageData(img, 0, 0);