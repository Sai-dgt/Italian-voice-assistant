const bars = document.querySelectorAll('.wave-bar');
bars.forEach((bar,index)=>{

bar.style.animationDelay = `${index*0.05}s`;



});