let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let voices = [];

speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

function speak(text){

    // old voice stop (atakna fix)
    speechSynthesis.cancel();

    let textSpeak = new SpeechSynthesisUtterance(text);

    let femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") || 
        v.name.toLowerCase().includes("female") || 
        v.name.toLowerCase().includes("samantha")
    );

    if(femaleVoice){
        textSpeak.voice = femaleVoice;
    }

    textSpeak.lang = "hi-IN";
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;

    speechSynthesis.speak(textSpeak);
}

function wishMe(){
    let hours = new Date().getHours();

    if(hours >= 0 && hours < 12){
        speak("Good Morning");
    }
    else if(hours >= 12 && hours < 16){
        speak("Good Afternoon");
    }
    else if(hours >= 17 && hours < 20){
        speak("Good Evening");
    }
    else{
        speak("Good Night");
    }
}

window.addEventListener('load',()=>{
    wishMe()
})

// speech recognition

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.lang = "en-IN";

recognition.onresult = (event) => {

   let currentIndex = event.resultIndex;
   let transcript = event.results[currentIndex][0].transcript;

   content.innerText = transcript;

   takeCommand(transcript.toLowerCase());

   // 🔥 stop listening after result (smooth)
   recognition.stop();
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display= "none"
    voice.style.display="block"
})

function takeCommand(message){

    btn.style.display= "flex"
    voice.style.display="none"

    if(message.includes("hello")||message.includes("hey")){
        speak("Hello ,What can i help you?")
    }

    else if(message.includes("who are you")||message.includes("kon ho tum")){
        speak("I am Chiya a virtual Assistant, created by Shrashti")
    }

    else if(message.includes("open youtube")||message.includes("youtube kholo")){
        speak("Opening youtube")
        window.open("https://www.youtube.com")
    }

    else if(message.includes("open google")||message.includes("google kholo")){
        speak("Opening Google");
        window.open("https://www.google.com");
    }

    else if(message.includes("open github")||message.includes("github kholo")){
        speak("Opening GitHub");
        window.open("https://www.github.com");
    }

    else if(message.includes("time")||message.includes("time kya ho rah hai")){
        let time = new Date().toLocaleTimeString();
        speak("The time is " + time);
    }

    else if(message.includes("date")||message.includes("aaj kya date hai")){
        let date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    }

    else if(message.includes("weather")){
        speak("Showing today's weather");
        window.open("https://www.google.com/search?q=today+weather");
    }

    else if(message.includes("plus")){
        speak("I can calculate for you, but advanced math coming soon!");
    }

    else if(message.includes("open mail")){
        speak("Opening Gmail");
        window.open("https://mail.google.com");
    }

    else if(message.includes("play my favorite song") || message.includes("mera fav song suunao")){
        speak("Playing your favorite song on YouTube");
        window.open("https://www.youtube.com/watch?v=y_GVDbfaiwQ&list=RDy_GVDbfaiwQ&start_radio=1");
    }

    //fixed google search fallback
    else{
        speak(`This is what I found on internet for ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
