window.addEventListener('load',init);
//global variables
let readingtime =3;
let typingtime=10;
let score = 0;
let isplaying;
let a = 1;
let c =0;
let error =0;
var blinkerid=0;
var id =1;
var finallength=0;
var correctkeystrokes=0;
var wrongkeystrokes=0;
var uncorrectedwords=0;
var testrunningtime=1;
var netwpm2=0;
//proverbs array
var one,two,three,four,five,six,seven,eight,nine,ten;
one=["a ","picture ","is ","worth ","a ","thousand ","words"];
two=['a ','stich ','in ','time ','saves ','nine'];
three=['cowards ','die ','many ','times ','before ','their ','death'];
four=['make ','hay ','while ','the ','sun ','shines'];
five=['never ','test ','the ','depth ','of ','water ','with ','both ','feet'];
six=['rome ','was ','not ','build ','in ','a ','day'];
seven=['all ','that ','glitters ','is ','not ','gold'];
eight=['not ','all ','those ','who ','wander ','are ','lost'];
nine=['the ','only ','constant ','is ','change'];
ten=['the ','past ','does ','not ','equal ','the ','future'];
var proverbs=[one,two,three,four,five,six,seven,eight,nine,ten];

const time = document.querySelector('#timeid');
function init(){
// PRESS enter to start animation
 const enter=document.querySelector(".entertostart");
const entertext="Press Enter to start";
var splittext=entertext.split("");
for(let  i= 0; i< splittext.length; i++)
{
  
  enter.innerHTML+="<span class=\"spanclass\">"+ splittext[i] +"</span>";
  
}

let char =0;
let timer = setInterval(ontick,50);
function ontick(){
  const span = enter.querySelectorAll('span')[char];
  span.classList.add('fade');
  char++
  if(char===splittext.length){
    clearInterval(timer);
    timer=null;
    return;
  }

}


//event listener for enter key to start the game :)
  document.addEventListener('keyup',function enterfunction(event){
console.log("enter is presseed");
        if (event.keyCode === 13)
         {
        createtextdiv();
        time.style.visibility="visible";
        setTimeout(timerfunction,4000);
        time.innerHTML=readingtime;
       setInterval(displaytime,1000);
        document.getElementById("entertostarting").style.display="none";
        x = document.getElementsByClassName("text");  
       
        for (i = 0; i < x.length; i++) 
        {
            x[i].style.visibility = "visible"; 
          }

        }
        document.removeEventListener('keyup',enterfunction);

      });

      
}
//function to convert charactercode into keycode(works only for lowercase alphabets)
function getKeyCode(char) {
    var keyCode = char.charCodeAt(0);
    if(keyCode > 90) {  
      return keyCode - 32;
    }
    return keyCode; 
  }
 
//main mygame function
 function mygame(){

    var testimeinterval=setInterval(testtime,1000);   
    var blinkerstuff=1001
     var blinkerdivjs= document.getElementById(blinkerstuff);
     blinkerdivjs.style.visibility="visible";
    document.addEventListener("keyup",function keypress(event){
      
        var s =document.getElementById(a);
       var b = s.innerHTML;
        c =getKeyCode(b);
      //for backspace detection
        if(event.keyCode==8)
          {
          
           var rando= document.getElementById(a);
           rando.classList.remove("wrongletter");
           rando.style.color="#000000";
            rando.style.backgroundColor = "#FFFFFF";  
            a=a-1;
            if (a===0)
            {
              a=1;
            }
           
            var back =document.getElementById(a);

            back.style.color="#000000";
            back.style.backgroundColor = "#FFFFFF";
            blinkerstuff=blinkerstuff-1;
            if(blinkerstuff<=1000){
              blinkerstuff=1001;
            }  
             blinkerdivjs.style.visibility="hidden";
            blinkerdivjs=document.getElementById(blinkerstuff);
            blinkerdivjs.style.visibility="visible";
            
        }
          else
          {
            //for the right key pressed
          if(event.keyCode ==c)
          {
            s.classList.remove("wrongletter");
            correctkeystrokes=correctkeystrokes+1;
            a = a+1;

            if(a===finallength+1){
              document.removeEventListener('keyup',keypress);
              clearInterval(testimeinterval);
              calculateuncorrectedletters();
              setTimeout(loadresults,200);
            }
            
              s.style.color="#99C794";
              s.style.backgroundColor = "#EDF7E7";
              s.style.visibility="visible";
             
               blinkerdivjs.style.visibility="hidden";
                blinkerstuff=blinkerstuff+1;
                if (blinkerstuff<=1000+id-1){

                  blinkerdivjs=document.getElementById(blinkerstuff);
                  blinkerdivjs.style.visibility="visible";
                }
               

              if(error>0){
                error =0;
              }
             
          }
          else{

            //for the wrong key pressed
            wrongkeystrokes=wrongkeystrokes+1;
            s.style.color="#D55B60";
            s.classList.add("wrongletter");
            s.style.animationName="shake";
            s.style.backgroundColor = "#FFDCD9";
            s.style.visibility="visible"
            error =error+1;
            if (error==1) 
              {
                a=a+1;
                if(a===finallength+1){
                  document.removeEventListener('keyup',keypress);
                  clearInterval(testimeinterval);
                  calculateuncorrectedletters();
                  setTimeout(loadresults,200);
                  
               }else{
                blinkerdivjs.style.visibility="hidden";
                blinkerstuff=blinkerstuff+1;
                blinkerdivjs=document.getElementById(blinkerstuff);
                blinkerdivjs.style.visibility="visible";
              }
              }
              if(error>2){
                if (error==3){
                  error=2;  
                  s.style.animationPlayState="playing";
                  s.style.backgroundColor="#ffffff";
                
                }
              }
            
            
            }
          }
          
          });
       
  }
  //timer function for the reading time (hides the words to be typed)
 function timerfunction(){
   
    x = document.getElementsByClassName("text")  
    
    for (i = 0; i < x.length; i++) 
    {
        x[i].style.visibility = "hidden"; 
  
      }
      mygame();

  }
  // displays the time left to read the sentence
function displaytime(){

 
    if (readingtime<=0){
    time.style.visibility="hidden";
    clearInterval;
    }else
    {
    readingtime = readingtime-1;
    time.innerHTML=readingtime;
  }
 
}
//function to create the word div and letter div using two for loops and another function
function createtextdiv(){

parentdivid=90;
var newdiv ="";
var firstsentence=proverbs[Math.round(Math.random() * 10)]
returnfinallength(firstsentence);
for (k=0;k<firstsentence.length;k++)
{
  newdiv = firstsentence[k];
   parentid =createparentdiv(parentdivid);
   parentdivid=parentdivid+1;
  for (m=0 ;m<newdiv.length;m++)

  {
    var letter ="";
    letter=newdiv[m];
    addElement(letter,id,parentid);
    id = id+1;
  }
    
}

return id;

  
}

//creates the  letter div elements 
function addElement(letter,id) {
  var node = document.createElement("div");
  var textnode = document.createTextNode(letter);
  node.appendChild(textnode);
  document.getElementById(parentid).appendChild(node);
  node.classList.add("text");
  node.id =id;
  createblinker( id);
}
//creates the word div elements
function createparentdiv(parentdivid) {
  
  var node = document.createElement("div");
  document.getElementById("parentid").appendChild(node);
  node.classList.add("word");
  node.id =parentdivid;
 
  return parentdivid;
}
//creates the blinker elements
function createblinker(){
  var node = document.createElement("div");
  document.getElementById(id).appendChild(node);
  node.classList.add("blinker");
  blinkerid=1000+id;
  node.id=blinkerid;


}

//returns the final length of the selected sentence
function returnfinallength(firstsentence){

  for (g=0;g<firstsentence.length;g++){
    var p =firstsentence[g];
    for(z=0;z<p.length;z++){
  
      finallength=finallength+1;
  
    }
  
  
  }
  
return finallength  

}

//for loading results and displaying them after the test is over
function loadresults(){
          displayresults();
          removetextelement();
}


//removing the word and letter div elements to display the results
function removetextelement(){
  let element = document. getElementById("maintextboxid");
  element.remove();
  document.getElementById("parentid").remove();
}


//function to calculate uncorrected letters which is used to calculate net WPM

function calculateuncorrectedletters(){
  let parent=document.getElementById("parentid");
  let sameclass=parent.getElementsByClassName("wrongletter");
  return sameclass.length;
  }
//calculating and displaying the errors
function displayresults(){
let final=correctkeystrokes+wrongkeystrokes;
let accuracy=correctkeystrokes/final;
let accuracyfinal=accuracy*100;
accuracyfinal=Math.round(accuracyfinal);
if (accuracyfinal>=100){
  accuracyfinal=100;
}
uncorrectedwords=calculateuncorrectedletters();
var grosswpm=correctkeystrokes/5;
var gg=grosswpm-uncorrectedwords;
var timeinmins=testrunningtime/60;
var netwpm=gg/timeinmins;
netwpm =Math.round(netwpm);
if(netwpm<0){
  netwpm=0;
}
netwpm2=netwpm;

//dynamicaly displaying the analysis tab
if(netwpm<50){
  document.getElementById("modalsadsvg").style.display="block";
}

if(netwpm>=50 & netwpm<70){
  document.getElementById("modaljoysvg").style.display="block";
  
}
if(netwpm>=70){
  document.getElementById("modalhappysvg").style.display="block";
}

if(netwpm<30){
  document.getElementById("modalresultsid").innerHTML="Your typing speed is <span class='oogabooga'>too slow</span>";
}
if(netwpm<50 & netwpm>=30){
  document.getElementById("modalresultsid").innerHTML="Your typing speed is  <span class='oogabooga'>Slow</span>";
}
if(netwpm<70 & netwpm>=50){
  document.getElementById("modalresultsid").innerHTML="Your typing speed is <span class='oogabooga'>Good</span>";
}
if(netwpm<100 & netwpm>=70){
  document.getElementById("modalresultsid").innerHTML="Your typing speed is  <span class='oogabooga'>Excellent</span>";
}

let b=document.getElementById("main-container1");
b.style.display="flex";
//call result animation
resultanimation();
var highscore=localStorage.getItem("wpm");
if(netwpm>highscore){
localStorage.setItem("wpm",netwpm);
document.getElementById("highwpm").style.display="block";
const t5 = gsap.timeline({defaults:{ease:'power1.out'}});
  t5.from(".highwpm",{y:400,duration:1});
  t5.fromTo(".highwpm",{y:0},{y:400,duration:1},"+=1");
}
//call event listener for analysis button
analysisbuttonfn();

let j=document.getElementById('netwpm');
j.innerHTML=netwpm;
let k=document.getElementById('accuracy');
k.innerHTML=accuracyfinal+"%";
let l=document.getElementById('correctkeystrokes');
l.innerHTML=correctkeystrokes;
let m=document.getElementById('wrongkeystrokes');
m.innerHTML=wrongkeystrokes;
let p=document.getElementById("uncorrectedletters");
p.innerHTML=uncorrectedwords;

}

function testtime(){
  testrunningtime=testrunningtime+1;
}

//animation for results 
function resultanimation(){
  const tl = gsap.timeline({defaults:{ease:'power1.out'}});
  tl.fromTo("#background",{y:"-350px"},{y:"0px",duration:0.3});
  tl.fromTo("#female",{y:"350px"},{y:"0px",duration:0.3},"-=0.3");
  tl.fromTo("#male",{y:"350px"},{y:"0px",duration:0.3},"-=0.3");
  tl.fromTo(".tryagainbutton",{y:"350px"},{y:"0px",duration:0.2},"-=0.3");
  tl.fromTo(".resultsbutton",{y:"350px"},{y:"0px",duration:0.2},"-=0.2");
  tl.fromTo(".styled-table",{y:"-350px"},{y:"0px",duration:0.2},"-=0.2");
  tl.fromTo("td",{y:"350px"},{y:"0px",duration:0.1,stagger:0.01},"-=0.2");

}

function analysisbuttonfn(){
  let v = document.getElementById("analysisbutton");
  v.addEventListener("click",analysisclickfn);
}
function analysisclickfn(){
  gsap.fromTo(".modal",{y:"-200%",duration:1},{y:"0%"});
  let v=document.getElementById("analysismodal");
  v.style.display="flex";

  createanimationforresult();
  if(netwpm2>=50 & netwpm2<70){
  const tp=gsap.timeline({defaults:{ease:'power1.out'}});
  tp.from("#girlholding",{x:"-100%",duration:0.5});
  tp.from("#emoji-board",{y:"300%",duration:0.5});
  tp.from("#smile-emoji",{y:"300%",duration:0.5},"-=0.5");
}
if(netwpm2>=70){
  const tr=gsap.timeline({defaults:{ease:'power1.in'}});
  tr.from("#bg",{scale:0,duration:0.5});
  tr.from("#fl",{y:"200%",duration:0.5},"-=0.5");
  tr.from("#fr",{y:"200%",duration:0.5},"-=0.5");
  tr.from("#m",{y:"200%",duration:0.5},"-=0.5");
}
if(netwpm2<50){
const tx=gsap.timeline({defaults:{ease:'power1.out'}});
tx.from("#floor",{scale:0,duration:0.5});
tx.from("#sad-emoji",{x:"-200%",duration:0.5},"-=0.5");
tx.from("#female-sad-right",{x:"200%",duration:0.5},"-=0.5");
}
let x=document.getElementById("closemodal");
x.addEventListener("click",closemodal);
}
function closemodal(){
  
  gsap.fromTo(".modal",{y:"0%",duration:1},{y:"-200%"});
  setTimeout(()=>{
    let v=document.getElementById("analysismodal");
    v.style.display="none"},320);
}

function createanimationforresult(){
  let x=document.getElementsByClassName("oogabooga")[0];
  let text=x.textContent;
  let finaltext=text.split("");
  x.textContent="";
  for(let i=0;i<finaltext.length;i++){
    x.innerHTML+="<span class='ooga2'>" +finaltext[i]+"</span>"
  }
var char2 =0;
let timer = setInterval(ontick2,50);
function ontick2(){
  let span2 = document.querySelectorAll('.ooga2')[char2];
   span2.classList.add('oogastyle');
   char2++
   if(char2===finaltext.length){
     clearInterval(timer);
     timer=null;
     return;
   }
 
}
}
function rowdy(){
  alert("Your Highest WPM is "+localStorage.getItem("wpm"));
}


