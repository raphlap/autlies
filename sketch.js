//my code here
//let data;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let diclet =  {};
let coord = {};
let count = 0;
let width = 1000;
let height = 500;
let cuy = 0;
let cux = 0;
let posx;
let posy;
let tooltip;
function preload() {
    //data = loadJSON('~/data.bnf.fr/visu_auteurs_lies/auteursliesmusset.json')
}

function setup() {
    noLoop()
    //console.log(data)
    letters.forEach(function(l){
        diclet[l] = [];
    for (var key in data) {
            Object.keys(data[key]).forEach(function(k){
                if (l == k.charAt(0)){
                    diclet[l].push(k);
                    }
            })
        }  
        })
    for (var key in data){
        cux += Object.keys(data[key]).length;
        Object.keys(data[key]).forEach(function(k){
            count += 1;
            cuy = 0;
            
            coord[k + count.toString()] = [];
            coord[k + count.toString()].push({'role' : key, 'index' : Object.keys(data[key]).indexOf(k), 'name': k, 'tx' : cux})
            for (var i in diclet) {
                cuy += diclet[i].length;;
                if (diclet[i].includes(k)) {
                coord[k + count.toString()].push({'letter' : i, 'index' : diclet[i].indexOf(k), 'name' : k, 'ty' : cuy});
                }
            }
        })
    }

    for (var key in coord) {
        //console.log(typeof key)
        // if (key.charAt(0) == 0){
        //     delete coord.key;
        // }
    }
        //console.log(coord)
        console.log(coord['Ã‰mile Faguet1565']);
        createCanvas(width, height);
        //var tooltip = selectAll('.tooltip');
        
}

function draw() {
    
    for (var l in diclet) {
        var long = diclet[l].length;
        translate(0, long/5);
        text(l, 0, 0)
        line(0, 0, 0, long/5)
    }
    
    for (var r in data) {
        var lont = Object.keys(data[r]).length;
        push();
        translate(0, height);
        pop();
        translate(lont/2, 0);
        push();
        rotate(QUARTER_PI);
        textSize(10);
        text(r, 0, 0)
        pop();
        
        line(0, 0, lont/2, 0)
    }
    
    for (var el in coord) {
        //console.log(el)
        //
        if (coord[el][1] !== undefined) {
            //console.log('yes !')
            //console.log(coord[el][1]['ty'], coord[el][0]['tx'])
        //push();
        //translate(coord[el][0]['tx']/2, coord[el][1]['ty']/5);
        
        //stroke(0);
        posx = coord[el][0]['tx']/2+coord[el][0]['index']/2;
        posy = coord[el][1]['ty']/5+coord[el][1]['index']/5;
        div = createDiv();
        div.size(5,5);
        //div.style('translate', coord[el][0]['tx']/2, coord[el][1]['ty']/5);
        div.style('border', '0.5px solid #000');
        div.style('border-radius', '5px / 5px');
        div.position(posx,posy);
        //div.mouseOver(showtooltip(posx, posy));
        //ellipse(coord[el][0]['index']/2, coord[el][1]['index']/5, 5, 5);
        //pop();
        }else{
            //console.log(el)
        }
    }
}

function showtooltip(x, y) {
    // tooltip = select('.tooltip');
    // tooltip.style('display', 'block');
    // tooltip.position(x, y);
}