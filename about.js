const tl = gsap.timeline({defaults:{ease:'power1.out',onComplete:bodyvisible}});
tl.to('h1',{y:'0%',duration:0.5,stagger:0.25});
tl.to(".slider",{y:'-100%',duration:0.85,delay:1});
tl.to(".loadingscreen",{y:'-100%'},"-=0.6");
tl.fromTo("nav",{y:"-100%"},{y:"0%",duration:0.5});
document.getElementById("main1").style.display="flex";
tl.fromTo(".welcome",{y:"100%",display:"none"},{y:"0%",duration:0.5,display:"flex"});
tl.fromTo(".wrapper",{y:"45%",display:"none"},{y:"0%",duration:0.5,display:"flex"});
tl.fromTo(".why",{y:"45%",display:"none"},{y:"0%",duration:0.5,display:"flex"},"-=0.5");
tl.fromTo(".imgdiv",{y:"45%"},{y:"0%",duration:0.8},"-=0.5");
var i =0;
function bodyvisible(){
    i=i+1; 
    if(i==21){
        setInterval(bodyvisible2,1000);
    }
    
}
function bodyvisible2(){
    document.getElementsByTagName('body')[0].style.overflow='visible';
}