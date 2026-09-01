var dino = document.getElementById("dino");

IdleImageNumber = 1;
IdleAnimationNumber = 0;

//setting to change idle images
function IdleAnimation() {
    IdleImageNumber = IdleImageNumber + 1;

    if (IdleImageNumber == 11){
        IdleImageNumber = 1;
    }
    dino.src = "resources/Idle (" + IdleImageNumber + ").png";
}

//when the idle animation start
function IdleAnimationStart() {
    IdleAnimationNumber = setInterval(IdleAnimation, 200);
}


WalkImageNumber = 1;
WalkAnimationNumber = 0;
WalkSound = new Audio("resources/run.mp3");

//setting to change walking images
function WalkAnimation() {
    WalkImageNumber = WalkImageNumber + 1;
    WalkSound.play();

    if (WalkImageNumber == 11){
        WalkImageNumber = 1;
    }

    dino.src = "resources/Walk (" + WalkImageNumber + ").png";
}



//when the walk animation start
function WalkAnimationStart() {
    WalkAnimationNumber = setInterval(WalkAnimation, 150);
    clearInterval(IdleAnimationNumber);
}


//checking the key 
function KeyCheck(event){
    //alert(event.which);
    //Enter = 13

    var KeyCode = event.which;

if (KeyCode == 13) {
        if (WalkAnimationNumber == 0) {
            WalkAnimationStart ();
        }
  
         if(MoveBackgroundAnimationId == 0) {
       MoveBackgroundAnimationId = setInterval(MoveBackground, 150);
         }   

         if(cactusAnimationId == 0){
        cactusAnimationId = setInterval(cactusAnimation, 100);
         }
 }  

    //Space = 32

if (KeyCode == 32) {
        if (JumpAnimationNumber == 0) {
            JumpAnimationStart ();
        }

         if(MoveBackgroundAnimationId == 0) {
            MoveBackgroundAnimationId = setInterval(MoveBackground, 150);
         }   
         
        if(cactusAnimationId == 0){
        cactusAnimationId = setInterval(cactusAnimation, 100);
         }
    }  
}


//setting jump animation
JumpAnimationNumber = 0;
JumpImageNumber = 1;
var dinoMarginTop = 450;
JumpSound = new Audio("resources/jump.mp3");

function JumpAnimation() {
     JumpImageNumber = JumpImageNumber + 1;
     JumpSound.playbackRate = 0.6;
     JumpSound.play();

    if(JumpImageNumber <= 6){
        dinoMarginTop = dinoMarginTop - 15;
        dino.style.marginTop = dinoMarginTop + "px";
    }

    if(JumpImageNumber >= 7){
        dinoMarginTop = dinoMarginTop + 15;
        dino.style.marginTop = dinoMarginTop + "px";
    }

    if (JumpImageNumber == 13){
        JumpImageNumber = 1;
        clearInterval(JumpAnimationNumber);
        JumpAnimationNumber = 0;
        WalkImageNumber = 0;
        WalkAnimationStart();
        dinoMarginTop = 450;
    }

    dino.src = "resources/Jump (" + JumpImageNumber + ").png";
}

function JumpAnimationStart() {
    clearInterval(IdleAnimationNumber);
    WalkImageNumber = 0;
    clearInterval(WalkAnimationNumber);
    JumpAnimationNumber =  setInterval(JumpAnimation,150);
}


//illustratung the run movement
var BackgroundImagePositionX = 0;
var MoveBackgroundAnimationId = 0;

var score = 0;

function MoveBackground() {
    BackgroundImagePositionX = BackgroundImagePositionX - 20;
    document.getElementById("background").style.backgroundPositionX = BackgroundImagePositionX + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score;
}


//the barrier creating
cactusMarginLeft = 2000;

function CreateCactus(){
    for(var i = 0; i <= 20; i++){

    var cactus = document.createElement("div");
    cactus.className = "cactus";
    document.getElementById("background").appendChild(cactus);
    cactus.style.marginLeft = cactusMarginLeft + "px";
    cactus.id = "cactus" + i;
   // cactusMarginLeft = cactusMarginLeft + 900;

   //minimizing the gap of two barriers and make the game difficult
    if (i<5){
        cactusMarginLeft = cactusMarginLeft + 1000;
    }

    if(i>=10){
        cactusMarginLeft = cactusMarginLeft + 800;
    }

    if(i>=20){
        cactusMarginLeft = cactusMarginLeft + 400;
    }  
    }
}


//stopping the animation and play dead animation when dino hit by the cactus 
var cactusAnimationId = 0;
function cactusAnimation(){
    for(var i = 0; i <= 20; i++){

        var cactus = document.getElementById("cactus" + i);
        var currentMarginLeft = getComputedStyle(cactus).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 25;
        cactus.style.marginLeft = newMarginLeft + "px";

        if(newMarginLeft >= -110 && newMarginLeft <= 10){
             if(dinoMarginTop > 471){

                 clearInterval(cactusAnimationId);

                 clearInterval(WalkAnimationNumber);
                  WalkAnimationNumber = -1;

                 clearInterval(JumpAnimationNumber);
                 JumpAnimationNumber = -1;

                 clearInterval(MoveBackgroundAnimationId);
                  MoveBackgroundAnimationId = -1;
        
                DeadAnimationNumber = setInterval(DeadAnimation,100);
              }
         }
    } 
}


//Dead Animation
DeadImageNumber = 1;
DeadAnimationNumber = 0;
DeadSound = new Audio("resources/dead.mp3");

function DeadAnimation(){
    DeadImageNumber = DeadImageNumber + 1;
    DeadSound.playbackRate = 0.8;
    DeadSound.play();

    if(DeadImageNumber == 9){
        DeadImageNumber = 8;

        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
    }

    dino.src = "resources/Dead (" + DeadImageNumber + ").png";
}


function reload(){
    location.reload();
}
