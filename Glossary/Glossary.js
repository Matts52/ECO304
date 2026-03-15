
window.onload = function () {

    generateNavbar()

    fetch('../Data/Glossary_Data.json')
        .then(response => response.json())
        .then(data => {

            for (var i = 0; i < data.Sheet1.length; i++) {
                //console.log(data.Sheet1[i].Chapter);
                var entry = document.createElement("div");
                entry.classList.add("gloss-entry");

                var term = document.createElement("p");
                term.classList.add("gloss-term");
                term.textContent = data.Sheet1[i].Term;

                var def = document.createElement("p");
                def.classList.add("gloss-def");
                def.textContent = data.Sheet1[i].Interpretation;

                entry.appendChild(term);
                entry.appendChild(def);
                document.getElementById(data.Sheet1[i].Chapter).appendChild(entry);
            }
        });


}
