prediction = "";
Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot ()
{
Webcam.snap(function(data_uri)
{
document.getElementById("Output").innerHTML = '<img id = "captured_image" src = "'+data_uri+'" >';
});
}

console.log(ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KDxKhfl5Y/model.json',modelLoaded);

function modelLoaded()
{
    console.log("modelLoaded")
}

function speak()
{
var synth = window.speechSynthesis;
speak_data = "The prediction is " + prediction;
var utterThis = new SpeechSynthesisUtterance(speak_data);
utterThis.rate = 0.5;
synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, got_Result);
}

function got_Result(error, results)
{
if (error)
{
console.log(error);
}
else 
console.log(results);
document.getElementById("sign_Output").innerHTML = results[0].label;
prediction = results[0].label;
speak();
if (results[0].label == "Thumbs Up")
{
    document.getElementsById("sign_emoji_Output").innerHTML = "&#128078;";
}
if (results[0].label == "Thumbs Down")
{
    document.getElementsById("sign_emoji_Output").innerHTML = "&#128077;";
}
if (results[0].label == "Outstanding")
{
    document.getElementsById("sign_emoji_Output").innerHTML = "&#128076;";
}
if (results[0].label == "Peace")
{
    document.getElementsById("sign_emoji_Output").innerHTML = "&#9996;";
}
}