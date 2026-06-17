const bars = document.querySelectorAll('.wave-bar');
bars.forEach((bar,index)=>{
bar.style.animationDelay = `${index*0.05}s`;
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
    stream= await navigator.mediaDevices.getUserMedia({audio:true});
    chunks=[]
    media_recorder=new MediaRecorder (stream)
   
    media_recorder.ondataavailable=function(event){
     chunks.push(event.data)
    };
    
    media_recorder.onstop=function(){
    isRecording=false
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
           bars.forEach(bar=>bar.style.animationPlayState="running")
           audio.onended=function(){
           bars.forEach(bar=>bar.style.animationPlayState="paused")

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

