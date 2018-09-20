//my code here
//let data;
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let diclet =  {};
let coord = {};
let count = 0;
let width = 1110.50;
let height = 5000;
let cuy = 0;
let cux = 0;
let cuyr = 20;
let cuxe = 0;
let posx;
let posy;
let tooltip;
var id;
let ellipses;
let offsetx = 5;
let offsety = 5;
let figspace = 10;
let rolespace = 200;
const colors = ['1f77b4', 'ff7f0e','2ca02c', 'd62728', '9467bd', '8c564b', 'e377c2', '7f7f7f', 'bcbd22', '17becf'];
function preload() {
    //data = loadJSON('~/data.bnf.fr/visu_auteurs_lies/auteursliesmusset.json')
}

function setup() {
    //noLoop()
    //console.log(data)
    let cnv = createCanvas(width, height);
    cuyr -= Object.keys(data[Object.keys(data)[0]]).length;
    console.log(Object.keys(data['Auteur du texte']).length);
    letters.forEach(function(l){
        cux+=(width-rolespace)/27;
        letter = createDiv(l);
        //letter.style('position', 'fixed');
        letter.style('left', cux+rolespace+'px');
        letter.style('top', offsetx+'px');
        letter.addClass('letter');
        //letter.parent('#letterdiv');
        diclet[l] = [];
 
    for (var key in data) {
            Object.keys(data[key]).forEach(function(k){
                if (l == k.charAt(0)){
                    diclet[l].push(k);
                    }
            })
        }  
        })
    
    for (var key = 0; key < Object.keys(data).length; key++) {
        
        cuy=0;
        Object.keys(data[Object.keys(data)[key]]).forEach(function(k){
            if (k == 0){
                delete data[Object.keys(data)[key]][k];
            }
        });
        if (data[Object.keys(data)[key-1]] !== undefined) {
            //console.log(data[Object.keys(data)[key-1]]);
            cuyr += Object.keys(data[Object.keys(data)[key-1]]).length * figspace;
        }
        
        if (key > 10){
            colr = Number(key.toString()[1]);
        } else {
            colr = key;
        }
        role = createDiv(Object.keys(data)[key]);
        //role.position(offsety, cuyr);
        role.style('left', offsety+'px');
        role.style('top', cuyr+'px');
        //role.style('position', 'sticky');
        role.addClass('role');
        role.style('font-size', '15px')
        role.style('color', '#'+ colors[colr]);
        //role.scrollIntoView();
        Object.keys(data[Object.keys(data)[key]]).forEach(function(k){
            count += 1;
            cux = rolespace;
            //cuxe -= diclet[Object.keys(diclet)[0]].length;
            if (key > 10){
                colr = Number(key.toString()[1]);
            } else {
                colr = key;
            }
            coord[k + count.toString()] = [];
            coord[k + count.toString()].push({'role' : key, 'index' : Object.keys(data[Object.keys(data)[key]]).indexOf(k), 'name': k, 'ty' : cuyr, 'link': data[Object.keys(data)[key]][k]['auteurslies'], 'col' : colors[colr]})
            for (var truc in diclet) { 
                //cux += diclet[truc].length;
                cux += (width-rolespace)/27;
                //console.log(cuxe);
                if (diclet[truc].includes(k)) {
                coord[k + count.toString()].push({'letter' : truc, 'index' : diclet[truc].indexOf(k), 'name' : k, 'tx' : cux});
                   
            }
            }
        })
        //console.log(coord);
        }

    tooltip = createDiv();
    //tooltip.parent('#defaultCanvas0'); 
    tooltip.style('display', 'none');
    tooltip.addClass('tooltip');
    tooltip.position(0, 0);

    for (var el in coord) {
        if (coord[el][1] !== undefined) {
            //id = el;
            posy = coord[el][0]['ty']+(coord[el][0]['index'] * figspace);
            posx = coord[el][1]['tx'];
            //posx = coord[el][1]['tx']/1.5+(coord[el][1]['index']+5);

            //div = createA(coord[el][0]['link'], '');
            div = createDiv();
            //div.parent('#defaultCanvas0');
            div.size(15,10);
            //div.style('border', '0.5px solid #000');
            div.style('border-radius', '5px / 5px');
            div.style('background-color', '#' + coord[el][0]['col']);
            div.position(posx,posy);
            div.addClass('ellipse')
            div.id(el);
            
            //console.log('#' + coord[el][0]['col'])
        }else{
            //delete coord[el];
        }
    }
        //console.log(coord);
        ellipses = selectAll('.ellipse');
        for (let i = 0; i<ellipses.length; i++){
            ellipses[i].mouseOver(function(){
                id = (ellipses[i]['elt'].id);
                let top = (ellipses[i]['elt'].style.top);
                let left = (ellipses[i]['elt'].style.left);
                tooltip = select('.tooltip');
                tooltip.html(coord[id][0]['name']);
                tooltip.style('left', left);
                tooltip.style('top', top);
                //console.log(left, top);
                tooltip.show();
            });
            ellipses[i].mouseOut(function(){
                id = (ellipses[i]['elt'].id);
                tooltip = select('.tooltip');
                tooltip.hide();
            });
        }
        // var letterscroll = selectAll('.letter');
        // console.log(letterscroll)
        // for (let e = 0; e <letterscroll;e++){
        //     letterscroll[e].scrollIntoView();
        //     // function scrollToTop() {
        //     //     letterscroll[e].scrollIntoView(true);
        //     // }
        //     // function scrollToBottom() {
        //     //     letterscroll[e].scrollIntoView(false);
        //     // }
        // }
//scroll
// window.onscroll = function()  {myFunction()};
// var lettscroll = document.getElementById("letterdiv");
// //console.log(lettscroll)
// var sticky = lettscroll.offsetTop;

// function myFunction(){
//     if (window.pageYOffset > sticky) {
//         lettscroll.classList.add('sticky');
//         lettscroll.style('top', )
//     }else{
//         lettscroll.classList.remove('sticky');
//     }
// }
}

function draw() {
//     push();
//     for (var l in diclet) {
//         var long = diclet[l].length;
//         push();
//         translate(0, 10);
//         pop();
//         translate(long,0 );
//         //push();
//         //rotate(QUARTER_PI);
//         //textSize(10);
//         text(l, 0, 0)
//         //line(0, 0, long,0 )
//         //pop();
//     }
    
//     for (var r in data) {
//         var lont = Object.keys(data[r]).length;
//         translate(0, lont/1.5);
//         text(r, 0, 0);
//         line(0, 0, lont/2, 0);
//     }
//     pop();
    
    // for (var el in coord) {
    //     //console.log(el)
    //     //
    //     // if (coord[el][1] !== undefined) {
    //     // posx = coord[el][0]['tx']/2+coord[el][0]['index']/2;
    //     // posy = coord[el][1]['ty']/5+coord[el][1]['index']/5;
 

    //      //}
         
    // }

}
