window.onload = function () {

    generateNavbar();

    document.getElementById("calcGrade").addEventListener("click", calcGrades);

    function calcGrades() {
        //weights [Assignments, Labs, Final]
        let weights = {
            "asn": 0.05,
            "lab": 0.02,
            "lab_project": 0.09,
            "low_midterm": 0.10,
            "high_midterm": 0.15,
            "final": 0.35
        };
        let assignments = [];
        let labs = [];
        let totalGrade = 0;
        let totalWeight = 0;

        //read in the inputted grades
        assignments.push(document.getElementById("A1Grade").value);
        assignments.push(document.getElementById("A2Grade").value);
        assignments.push(document.getElementById("A3Grade").value);
        assignments.push(document.getElementById("A4Grade").value);
        assignments.push(document.getElementById("A5Grade").value);
        assignments.push(document.getElementById("A6Grade").value);
        labs.push(document.getElementById("L1Grade").value);
        labs.push(document.getElementById("L2Grade").value);
        labs.push(document.getElementById("L3Grade").value);
        lab_project = document.getElementById("LPGrade").value;
        midterm1 = document.getElementById("M1Grade").value;
        midterm2 = document.getElementById("M2Grade").value;
        final = document.getElementById("FGrade").value;

        // locate the lowest assignment or missing assignments
        let min = 101;
        let minInd = -1;
        let containMissing = false
        for (let i = 0; i < assignments.length; i++) {
            //check for missing assignments
            if (assignments[i] == "") {
                containMissing = true;
                break;
            }

            if (Number(assignments[i]) <= min) {
                min = assignments[i];
                minInd = i;
            }
        }

        //remove the empty or lowest assignment
        if (containMissing) {
            assignments = assignments.filter(a => a !== "");
        } else {
            assignments.splice(minInd, 1);
        }

        //remove any labs not yet done
        labs = labs.filter(a => a !== "");

        //go through each assignment
        for (let i = 0; i < assignments.length; i++) {
            totalGrade += assignments[i] * weights["asn"];
            totalWeight += weights["asn"];
        }

        //go through each lab
        for (let i = 0; i < labs.length; i++) {
            totalGrade += labs[i] * weights["lab"];
            totalWeight += weights["lab"];
        }

        //add in the lab project
        if (lab_project != "") {
            totalGrade += lab_project * weights["lab_project"];
            totalWeight += weights["lab_project"];
        }


        console.log(midterm1, midterm2)
        //add in the midterms
        if (midterm1 != "" && midterm2 == "") {
            totalGrade += midterm1 * weights["high_midterm"];
            totalWeight += weights["high_midterm"];
        }
        else if (midterm1 != "" && midterm2 != "") {
            if (midterm1 < midterm2) {
                totalGrade += midterm1 * weights["low_midterm"];
                totalWeight += weights["low_midterm"];
                totalGrade += midterm2 * weights["high_midterm"];
                totalWeight += weights["high_midterm"];
            } else {
                totalGrade += midterm1 * weights["high_midterm"];
                totalWeight += weights["high_midterm"];
                totalGrade += midterm2 * weights["low_midterm"];
                totalWeight += weights["low_midterm"];
            }
        }

        //add in the final
        if (final != "") {
            totalGrade += final * weights["final"];
            totalWeight += weights["final"];
        }

        console.log(totalGrade, totalWeight)

        document.getElementById("gradecalc_curr").innerHTML = "Your current grade is <b>" + (Math.round(((totalGrade / 100) / totalWeight) * 1000) / 10).toString() + "%</b> \
                based on "+ Math.round((totalWeight * 1000) / 10).toString() + "% of the graded course material.";

    }





}
