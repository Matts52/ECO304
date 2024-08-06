
window.onload = function () {

    generateNavbar()

    fetch('../Data/Glossary_Data.json')
        .then(response => response.json())
        .then(data => {

            for (var i = 0; i < data.Sheet1.length; i++) {
                //console.log(data.Sheet1[i].Chapter);
                var h3 = document.createElement("p");
                h3.innerHTML = "<b>" + data.Sheet1[i].Term + "</b>"
                var p = document.createElement("p");
                p.innerHTML = data.Sheet1[i].Interpretation;

                document.getElementById(data.Sheet1[i].Chapter).appendChild(h3).appendChild(p);
            }
        });


}
