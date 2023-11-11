document.addEventListener("DOMContentLoaded", function () {
    
    generateNavbar()

    // Define an object to map option values to video sources
    var videoSources = {
        "option1": "../Assets/ExpectedValue.mp4",
        "option2": "../Assets/ContinuousExpectation.mp4",
        "option3": "../Assets/ConditionalProbability.mp4",
        "option4": "../Assets/DGPSampling.mp4",
        "option5": "../Assets/BiasedEstimator.mp4"
    };
    
    // get our elements
    var selectBox = document.getElementById("selectBox");
    var videoElement = document.querySelector("video");

    // Add an event listener to the select box
    selectBox.addEventListener("change", function () {
        var selectedValue = selectBox.value;

        // Check if the selected value exists in the video sources object
        if (videoSources.hasOwnProperty(selectedValue)) {
            videoElement.src = videoSources[selectedValue];
            videoElement.load(); // Load the new video source
        } else {
            // Handle the case when the selected option doesn't have a corresponding video source
            alert("No video source found for the selected option.");
        }
    });
});
