 /*----- cached element references -----*/

let button = document.getElementById('candy-image')
let audio = document.getElementById('audio')

 /*----- functions -----*/

function playAudio() {
    button.addEventListener('click',function(evt){
        audio.play();
        window.open('introPage.html');
    });
}

playAudio()