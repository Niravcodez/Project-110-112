//TEACHABLE MACHINE WEB APP LINK: https://teachablemachine.withgoogle.com/models/-vIWWfLUw/
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("#camera");

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML = "<img id = 'captured_image' src ='"+ data_uri +"'>"; 
    });
}

console.log("ml5.version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-vIWWfLUw/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = toSpeak;
    var utterthis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        toSpeak = "";
        gesture = results[0].label;
        if(gesture == "amazing")
        {
            toSpeak = "This is Amazing!";
            document.getElementById("udpate_emoji").innerHTML = "&#9996;";
        }
        else if(gesture == "best")
        {
            toSpeak = "All the Best!";
            document.getElementById("udpate_emoji").innerHTML = "&#128077;";
        }
        else if(gesture == "victory")
        {
            toSpeak = "That was a Marvelous Victory";
            document.getElementById("udpate_emoji").innerHTML = "&#128076;";
        }
        speak();
    }
}