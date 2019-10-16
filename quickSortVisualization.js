
let a=[] //empty array
let initialValue=9; //just a random value


//populating the array 
for(let i=0;i<=50;i++) {
    a.push(initialValue);
    initialValue+=13; //again a random value just to increase the count
}


//generator function for the bubble sort 

function* bubbleSort(array){
    document.getElementById('lblPass').innerHTML=0; //resets the pass label
    document.getElementById('lblDisplay').innerHTML=0; 
    let swapped;
    let count=0;
    let pass=1;
    do{
        swapped=false;
        document.getElementById('lblPass').innerHTML=pass; //replace the nummber with the number of counts
        for(let i=0;i<array.length;i++){
            if(array[i]>array[i+1]){
                let temp=array[i];
                array[i]=array[i+1];
                array[i+1]=temp;
                swapped=true;
                count++;
                //drawing the canvas agaian after shuffling 
                draw(array,i);
                document.getElementById('lblDisplay').innerHTML=count;
                yield swapped;
            }
        }
        pass++;  //increase upon completing one pass 
    }while(swapped);
}


//function to call the bubble sort function at a given interval
function bubble(){
    canvas=document.getElementById('myCanvas');
    let sort=bubbleSort(a);
    function repaintCanvas(a){
        requestAnimationFrame(repaintCanvas);
        sort.next();
    }
    setTimeout(repaintCanvas(a),3);
}

//function to shuffle the array 
function shuffle(array){
    document.getElementById('lblPass').innerHTML=0; //resets the pass label
    document.getElementById('lblDisplay').innerHTML=0;
    let cIndex=array.length;
    let t_value,random_index;
    while(0!=cIndex){
        random_index=Math.floor(Math.random()*cIndex);
        cIndex-=1;

        t_value=array[cIndex];
        array[cIndex]=array[random_index];
        array[random_index]=t_value;

    }
    return array;
}

//most important function to draw the canvas 

function draw(array,colorToBeFilled){
    if(canvas.getContext){
        let ctx=canvas.getContext('2d');
        let w=16;
        let  currentXcoordinate=50;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<array.length;i++){
            if(i==colorToBeFilled){
                ctx.fillStyle="red";
            }else ctx.fillStyle="blue"
        
        let h=array[i];
        ctx.font='bold 10px cursive';
        ctx.fillText(array[i], currentXcoordinate,canvas.height-(h+16));
        ctx.fillRect( currentXcoordinate,canvas.height-(h+12),w,h);
        ctx.fillText(i+1, currentXcoordinate,canvas.height-(2));
         currentXcoordinate+=w+2;
    }
}

}

function reshuffle(){
    shuffle(a);
    draw(a,0);
}



window.onload=function(){
    canvas=document.getElementById('myCanvas');
    shuffle(a);
    draw(a,0);
}
