//console.log(lovers);



// Get the current URL's query string
// const urlParams = new URLSearchParams(window.location.search);
// const loversIndex = urlParams.has('lovers') ? parseInt(urlParams.get('lovers')) : null; // Check if 'lovers' exists
// const senderNameElement = document.querySelector('.sendername');
// const recepientNameElement = document.querySelector('.recepientname');
// const textElement = document.querySelector('.paragraph');
// // Check if the index is valid and exists in the array

// fetch('lovers.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data); // This will log the JSON data to the console
    
//     if (loversIndex === null) {
//   console.log('No "lovers" parameter found in the URL.');
// } else if (!isNaN(loversIndex) && loversIndex >= 0 && loversIndex < data.length) {
//   console.log(data[loversIndex]);
//   senderNameElement.textContent = data[loversIndex].sender;
//   recepientNameElement.textContent = data[loversIndex].recepient;
//   if(data[loversIndex].text != ""){
//   textElement.textContent = data[loversIndex].text;
//   }
//   if(loversIndex == 3){
//       textElement.textContent = `الأُمُّ تَلْثُمُ طِفْلَها وتَضُمُّهُ
// حرمٌ سَمَاويُّ الجمالِ مُقَدَّسُ
// تَتَألَّهُ الأَفكارُ وهي جِوارَهُ
// وتَعودُ طاهرةً هناكَ الأَنفُسُ
// حَرَمُ الحَيَاةِ بِطُهْرِها وحَنَانِها
// هل فوقَهُ حَرَمٌ أَجلُّ وأَقدسُ
// بوركتَ يا حَرَمَ الأُمومَةِ والصِّبا
// كم فيكَ تكتملُ الحَيَاةُ وتَقْدُسُ
// `;
//   }
//     if(loversIndex == 4){
//       textElement.textContent = `As I reflect on our journey together, I would like to thank you for being best friends, amazing supporters, and the most amazing gym buddies. Happy Valentine's day, my loves. 
// `;
//   }
//   if(loversIndex == 6){
//       textElement.textContent = `To my favorite mother

// Because you didn't let me come visit you I'm sending you this message, with love from all 5 of us in NDU, Berlin, Paris, Bruxelles and Jbeil

// You're the best Mom ever, get well soon 🥰
 
// `;
//   }

// } else {
//   console.log('Invalid lover index or index out of range.');
// }

//   })
//   .catch(error => {
//     console.error('Error reading the JSON file:', error);
//   });
  

const urlParams = new URLSearchParams(window.location.search);
const loversId = urlParams.get('lovers'); // Get ID as a string

const senderNameElement = document.querySelector('.sendername');
const recepientNameElement = document.querySelector('.recepientname');
const textElement = document.querySelector('.paragraph');

fetch('lovers.json')
  .then(response => response.json())
  .then(data => {
    // console.log(data); // Log JSON data to check structure

    if (!loversId) {
      console.log('No "lovers" parameter found in the URL.');
      return;
    }

    // Find the object where id matches loversId (string comparison)
    const lover = data.find(item => item.id === loversId);

    if (lover) {
      // console.log(lover);
      senderNameElement.textContent = lover.sender;
      recepientNameElement.textContent = lover.recepient;
      if (lover.text && lover.text.trim() !== "") {
        textElement.textContent = lover.text;
      }
      if(lover.id == 3){
          textElement.textContent = `الأُمُّ تَلْثُمُ طِفْلَها وتَضُمُّهُ
    حرمٌ سَمَاويُّ الجمالِ مُقَدَّسُ
    تَتَألَّهُ الأَفكارُ وهي جِوارَهُ
    وتَعودُ طاهرةً هناكَ الأَنفُسُ
    حَرَمُ الحَيَاةِ بِطُهْرِها وحَنَانِها
    هل فوقَهُ حَرَمٌ أَجلُّ وأَقدسُ
    بوركتَ يا حَرَمَ الأُمومَةِ والصِّبا
    كم فيكَ تكتملُ الحَيَاةُ وتَقْدُسُ
    `;
      }
        if(lover.id == 4){
          textElement.textContent = `As I reflect on our journey together, I would like to thank you for being best friends, amazing supporters, and the most amazing gym buddies. Happy Valentine's day, my loves. 
    `;
      }
      if(lover.id == 6){
          textElement.textContent = `To my favorite mother
    
    Because you didn't let me come visit you I'm sending you this message, with love from all 5 of us in NDU, Berlin, Paris, Bruxelles and Jbeil
    
    You're the best Mom ever, get well soon 🥰
     
    `;
      }
    } else {
      console.log('No match found for the given lovers ID.');
    }
  })
  .catch(error => {
    console.error('Error reading the JSON file:', error);
  });




"use strict";

let W, H, ctx, ropes,stat,turn;

let mouse, touch;
let move = false;

const u = {
    drawC(x, y, r, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    },

    drawL(x0,y0,x, y, r, c) {
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineWidth = r;
        ctx.strokeStyle = c;
        ctx.lineTo(x,y);

        ctx.stroke();
        ctx.closePath();
    },

    pick(max=1, min=0){
        return Math.random() * (max - min) + min;
    },

    ipick(max=1, min=0){
        return Math.round(Math.random() * (max - min) + min);
    },
    writeT(text,x,y){
        ctx.beginPath();
        // The size is set with the font
        ctx.font = '25px serif';
        // align position
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // draw text
        ctx.fillText(text,x,y);
        ctx.fill();
        ctx.closePath();}
};

class Rope{
    constructor(x,y,r,c,z){
        this.ref = {x:x, y:y};
        this.si=Math.min(0.05*this.ref.x,0.05*(W-this.ref.x),0.05*this.ref.y,0.05*(H-this.ref.y));
        this.d ={x:1, y:-1.3};
        this.z =z;
        this.r =r;
        this.c =c;
        this.ar =0;
        this.f=1;
        this.n=[];
        this.n.push(new Node(this.ref.x, this.ref.y,this.r,this.c));
        this.createCords();
    }
    createCords(){
    let a, b;
        for(let i=0;i<20;i++){
            a=this.n[0].x+5*(i+1);
            b=this.n[0].y+5*(i+1);
            let color=this.c;
            this.n.push(new Node(a,b,u.pick(),color));}
    }
    // Controls movement
    update(idx) {
        for(let j=0;j<this.n.length;j++){
        // parametric equations driven by increment in angle this.z for node 0
        if(!j){
        if(mouse.x&&(idx!=turn))continue;
        this.z+=0.01;
        let tx=Math.sin(this.z);
        this.n[j].x = mouse.x || this.ref.x+ (this.si*(16*tx*tx*tx));
        tx=this.z;
        this.n[j].y = mouse.y || this.ref.y-(this.si*(13*Math.cos(tx)-5*Math.cos(2*tx)- 2*Math.cos(3*tx) - Math.cos(4*tx)));
            // reset position with touch
            if(mouse.x){this.ref.x=mouse.x;
                if(mouse.y)this.ref.y=mouse.y;
                this.ar=0; //not calculating
                this.z%=6.3132;
                turn++;
                turn%=(ropes.length);
                mouse.x=null;
                mouse.y=null;
                this.si=Math.min(0.05*this.ref.x,0.05*(W-this.ref.x),0.05*this.ref.y,0.05*(H-this.ref.y));
                ctx.fillStyle = "#ffffff00";
                ctx.fillRect(0, 0, W, H);}
        }
        else{
        this.n[j].x +=  (this.n[j-1].x-this.n[j].x) /(j+1) ;
        this.n[j].y +=  (this.n[j-1].y-this.n[j].y) /(j+1) ;
        }
    this.n[j].draw();
    }
    }
}

class Node{
    constructor(x,y,r,c){
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }
    draw() {
        u.drawC(this.x, this.y, this.r, this.c);
    }
    check(ref,d,si,f){
        //return(this.x>ref.x+(2*si)-1 || this.x<ref.x-(2*si)+1);
        return(this.x>ref.x+(2*si) || this.x<ref.x-(2*si));
    }
}

const eventsListener = () => {
    mouse = {
        x: null,
        y: null
    };
     touch = {
        x: null,
        y: null
    };

    window.addEventListener("mousemove", function(event){
        if(move){
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        }
        else{
            mouse.x = null;
            mouse.y = null;
        }
    });
    window.addEventListener("mousedown", function(event){
        move=true;
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    window.addEventListener("mouseup", function(event){
        move=false;
    });
    window.addEventListener("touchstart", function(event){
        let touch = event.changedTouches[0];
        let touchX = parseInt(touch.clientX);
        let touchY = parseInt(touch.clientY);
        mouse.x = touchX-cvs.offsetLeft;
        mouse.y = touchY-cvs.offsetTop;
        move=true;
    });

    window.addEventListener("touchmove", function(event){
        //event.preventDefault();
        if(move){
            let touch = event.changedTouches[0];
            let touchX = parseInt(touch.clientX);
            let touchY = parseInt(touch.clientY);
            event.preventDefault();
            mouse.x = touchX-cvs.offsetLeft;
            mouse.y = touchY-cvs.offsetTop;
        }
    },{passive:false}); //*** thanks to SR

    window.addEventListener("touchend", function(event){
        mouse.x = null;
        mouse.y = null;
        move=false;
    });
};

const animate = () => {
    ctx.fillStyle = "#ffffff00";  // Change the background color here
    ctx.fillRect(0, 0, W, H);
    ropes.forEach((x, idx) => { x.update(idx) });
    requestAnimationFrame(animate);
};

const init = () => {
    ctx = document.querySelector("#cvs").getContext("2d");
    W = ctx.canvas.width = innerWidth;
    H = ctx.canvas.height = innerHeight;
    turn=0;
    stat=true;
    ropes=[];
    ropes.push(new Rope(W*0.5, H*0.25,1,"hotpink",0.2));
    //ropes.push(new Rope(W*0.25, H*0.25,5,"cyan"));
    ropes.push(new Rope(W*0.5, H*0.25,2,"cyan",3.341));
    //window.alert("Credit to Lolo for event handlers: touch or strife");
    ctx.fillStyle = "#ffffff00";
    ctx.fillRect(0, 0, W, H);
    eventsListener();
    requestAnimationFrame(animate);
};

onload = init;
