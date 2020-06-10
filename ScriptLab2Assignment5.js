window.addEventListener("load",function(){
    //show div
    let show=document.getElementById("showImage");
    //save button
    let saveButton=document.querySelector(".save");
    //color input
    let colorSet=document.querySelector("input");
    //radius
    let radius=10;
    //plus and minus buttons and radius
    let plusObj=document.querySelectorAll(".pointer")[0];
    let minusObj=document.querySelectorAll(".pointer")[1];
    let radiusObj=document.querySelector("div > span");
    //colors
    //let colorsObj=this.document.querySelectorAll("label");
    //localStorage.clear();
    let colorChoosen;
    if(localStorage.getItem("color")){
        colorChoosen=localStorage.getItem("color");
        colorSet.value=colorChoosen;
    }else{
        colorChoosen="black";
    }
   
    //get canvas object
    var myCanvas=this.document.querySelector("canvas");
    //resize canvas object
    myCanvas.width=window.innerWidth-19;
    myCanvas.height=window.innerHeight-150;
    let myContext=myCanvas.getContext('2d');
    let drawflag=false;
    //canvas event handling
    myCanvas.onmousemove=function(event){
        if(drawflag){
        myContext.beginPath();
        myContext.arc(event.offsetX,event.offsetY,radius,0,360);
        myContext.fillStyle=colorChoosen;
        myContext.fill();
        myContext.closePath();

        }
    }
    myCanvas.onmouseup=function(){
        drawflag=false;
    }
    myCanvas.onmousedown=function(){
        drawflag=true;
    }
    //color picking
   /* for(let i=0;i<colorsObj.length;i++){
        colorsObj[i].onclick=function(){
          //remove the previous color
          let previousColor=document.querySelector(".choosenColor");
          if(previousColor){
          previousColor.classList.remove("choosenColor");
          }
          //set the new choosen color
         this.classList.add("choosenColor");
         colorChoosen=this.style.backgroundColor;
        }
    }*/

    //plus and minus event handling
    plusObj.onclick=function(){
        radius++;
        if(check(radius)){
            radius=30;
        }
        radiusObj.innerText=radius;
    }
    minusObj.onclick=function(){
        radius--;
        if(check(radius)){
            radius=10;
        }
        radiusObj.innerText=radius;
    }

    //check function
    function check(redius){
        return redius<10 || redius>30;
    }
    

    //color picking with color input
    colorSet.onchange=function(){
        colorChoosen=colorSet.value;
        localStorage.setItem("color",colorChoosen);
    }

    
    //save button handling
    saveButton.onclick=function(){
        let imgData=myCanvas.toDataURL();
        let savedImg=new Image();
        savedImg.src=imgData;
        show.style.border="5px solid blue";
        show.appendChild(savedImg);

    }


});//end of load