document.addEventListener("DOMContentLoaded", function () {

    generateNavbar();

    var videoElement = document.getElementById("animVideo");
    var cards = document.querySelectorAll(".anim-card");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            cards.forEach(function (c) { c.classList.remove("active"); });
            card.classList.add("active");
            videoElement.src = card.dataset.video;
            videoElement.load();
        });
    });

});
