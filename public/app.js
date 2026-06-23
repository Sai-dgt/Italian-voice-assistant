const bars = document.querySelectorAll('.wave-bar');
const center= (bars.length-1)/2
const minheight=3
const maxheight=30
const barWidth=2
const gap = 3
const waveformWidth=120
const totalWidth= bars.length*barWidth + (bars.length-1)*gap
const startX= (waveformWidth-totalWidth)/2
let intervalId
bars.forEach((bar,index)=>{
bar.style.left=`${startX + index*(barWidth+gap)}px`
})
bars.forEach((bar,index)=>{
bar.style.animationDelay = `${index*0.05}s`;

const distance=Math.abs(index-center);
let normalized= distance/center
const curve = Math.cos(normalized*(Math.PI/2))

bar.style.height = `${Math.round(minheight + (maxheight - minheight) * curve)}px`;
bar.dataset.restingHeight=bar.style.height
});
let isRecording= false
const mike_button=document.querySelector('.microphone');
let media_recorder ;
let chunks= [];
let stream
const LevelButton = document.querySelectorAll('.level-button')
const levels=["beginner","intermediate","advanced"]
let currentLevel="intermediate"
let history =[]
let currentTranscript
LevelButton.forEach((button,index)=>{
button.addEventListener("click",function(){
currentLevel=levels[index]
})
})
    
mike_button.addEventListener("click",async function () {

   try{
   
     if (isRecording===false){isRecording=true  ;
    mike_button.classList.add("recording");
    stream= await navigator.mediaDevices.getUserMedia({audio:true});
    chunks=[]
    media_recorder=new MediaRecorder (stream)
   
    media_recorder.ondataavailable=function(event){
     chunks.push(event.data)
    };
    
    media_recorder.onstop=function(){
    isRecording=false
    mike_button.classList.remove("recording");
    stream.getTracks().forEach(track => track.stop())        
   
    const blob = new Blob (chunks, {type:'audio/webm'})
    const formData = new FormData()
    formData.append('audio',blob,'recording.webm')
    fetch ('/transcribe',{
     method:'POST',
     body: formData
    })
    .then(response=> response.text())
    .then(transcript=> {
        
    currentTranscript=transcript
      return  fetch ('/chat',{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({
     message:transcript,
     level:currentLevel,
     history:history
     })
    })
})
    .then(response=> response.text())
    .then(reply=> {
     
      history.push({"role":"user","content":currentTranscript})  
      history.push({"role":"assistant","content":reply}) 
      history=history.slice(-10)
      return fetch('/speak',{
         method: 'POST',
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({text:reply})
     
    })
})
    
    .then(response =>response.blob())
    .then(blob=>{

        const audio= new Audio(URL.createObjectURL(blob))
        audio.play()
        audio.onplaying=function (){
         intervalId=setInterval(function(){
         bars.forEach((bar,index)=>{
         const restingValue=parseFloat(bar.dataset.restingHeight)
         const randomHeight= Math.round(minheight + Math.random() * (restingValue - minheight))
         bar.style.height=`${randomHeight}px`

         })},150);
          
           audio.onended=function(){
           clearInterval(intervalId)
           bars.forEach((bar,index)=>{
            bar.style.height=bar.dataset.restingHeight

           })
           }
           
        }
    })
    };
    media_recorder.start()
    setTimeout(()=>media_recorder.stop(),8000);
    
   
     }else {
        media_recorder.stop()
     }
   }catch (error){
    console.log("Mic denied");

    
   }
})

