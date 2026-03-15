
window.onload = function () {

    generateNavbar()

    fetch('../Data/Glossary_Data.json')
        .then(response => response.json())
        .then(data => {

            for (var i = 0; i < data.Sheet1.length; i++) {
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

            document.getElementById("glossSearch").addEventListener("input", function () {
                var query = this.value.trim().toLowerCase();
                var entries = document.querySelectorAll(".gloss-entry");
                var anyVisible = false;

                entries.forEach(function (entry) {
                    var termText = entry.querySelector(".gloss-term").textContent.toLowerCase();
                    var defText = entry.querySelector(".gloss-def").textContent.toLowerCase();
                    var match = !query || termText.includes(query) || defText.includes(query);
                    entry.style.display = match ? "" : "none";
                    if (match) anyVisible = true;
                });

                // Hide chapter cards that have no visible entries
                document.querySelectorAll(".gloss-card").forEach(function (card) {
                    var visibleEntries = card.querySelectorAll(".gloss-entry:not([style*='display: none'])");
                    card.style.display = visibleEntries.length > 0 ? "" : "none";
                });

                document.getElementById("glossNoResults").style.display = anyVisible ? "none" : "";
            });
        });


}
