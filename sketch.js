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
let cuyr = 0;
let cuxe = 0;
let posx;
let posy;
let tooltip;
var id;
let ellipses;
let offsetx = 5;
let offsety = 5;
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
        diclet[l] = [];
    for (var key in data) {
            Object.keys(data[key]).forEach(function(k){
                if (l == k.charAt(0)){
                    diclet[l].push(k);
                    }
            })
        }  
        })
        //cux = 0;
        cux -= diclet[Object.keys(diclet)[0]].length;
        // for (var i in diclet) {
        //     cux+= diclet[i-1].length;
        //     letter = createDiv(i);
        //     letter.position(cux/1.5, offsetx);
        // }
    for (var key = 0; key < Object.keys(data).length; key++) {
        
        cuy=0;
        Object.keys(data[Object.keys(data)[key]]).forEach(function(k){
            if (k == 0){
                delete data[Object.keys(data)[key]][k];
            }
        });
        console.log(data[Object.keys(data)[key]]);
        // cuyr += Object.keys(data[Object.keys(data)[key-1]]).length;
        // role = createDiv(Object.keys(data)[key]);
        // role.position(offsety, cuyr);
        // Object.keys(data[Object.keys(data[Object.keys(data)[key]]).forEach(function(k){
        //     count += 1;
        //     cux = 0;
        //     //cuxe -= diclet[Object.keys(diclet)[0]].length;
            
        //     coord[k + count.toString()] = [];
        //     coord[k + count.toString()].push({'role' : key, 'index' : Object.keys(data[Object.keys(data)[key]]).indexOf(k), 'name': k, 'ty' : cuyr, 'link': data[Object.keys(data)[key]][k]['auteurslies']})
        //     for (var truc in diclet) { 
        //         cux += diclet[truc].length;
        //         //console.log(cuxe);
        //         if (diclet[truc].includes(k)) {
        //         coord[k + count.toString()].push({'letter' : truc, 'index' : diclet[truc].indexOf(k), 'name' : k, 'tx' : cux});
                   
        //     }
        //     }
        // })
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
            posy = coord[el][0]['ty']+(coord[el][0]['index']+5);
            posx = coord[el][1]['tx']/1.5+(coord[el][1]['index']+5);

            div = createA(coord[el][0]['link'], '');
            //div.parent('#defaultCanvas0');
            div.size(5,5);
            div.style('border', '0.5px solid #000');
            div.style('border-radius', '5px / 5px');
            div.position(posx,posy);
            div.addClass('ellipse')
            div.id(el);
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
