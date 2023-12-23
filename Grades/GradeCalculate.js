window.onload = function () {

    generateNavbar();

    document.getElementById("calcGrade").addEventListener("click", calcGrades);

    function calcGrades() {
        //weights [Assignments, Labs, Final]
        let weights = [0.08, 0.03, 0.14, 0.37];
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
        //attendance = document.getElementById("AGrade").value;
        midterm = document.getElementById("MGrade").value;
        final = document.getElementById("FGrade").value;

        // locate the lowest assignment or missing assignments
        let min = 101;
        let minInd = -1;
        let containMissing = false
        for (let i = 0; i < assignments.length; i++){
            //check for missing assignments
            if (assignments[i] == ""){
                containMissing = true;
                break;
            }

            if (Number(assignments[i]) <= min){
                min = assignments[i];
                minInd = i;
            }
        }

        //remove the empty or lowest assignment
        if (containMissing){
            assignments = assignments.filter(a => a !== "");
        } else {
            assignments.splice(minInd, 1);
        }

        //remove and labs not yet done
        labs = labs.filter(a => a !== "");

        //go through each assignment
        for (let i = 0; i < assignments.length; i++){
            totalGrade += assignments[i] * weights[0];
            totalWeight += weights[0];
        }

        //go through each lab
        for (let i = 0; i < labs.length; i++){
            totalGrade += labs[i] * weights[1];
            totalWeight += weights[1];
        }

        //add in the final
        //if (attendance != ""){
        //    totalGrade += attendance * weights[2];
        //    totalWeight += weights[2];
        //}

        //add in the final
        if (midterm != ""){
            totalGrade += midterm * weights[2];
            totalWeight += weights[2];
        }

        //add in the final
        if (final != ""){
            totalGrade += final * weights[3];
            totalWeight += weights[3];
        }

        console.log(totalGrade, totalWeight)

        document.getElementById("gradecalc_curr").innerHTML = "Your current grade is <b>"+(Math.round(((totalGrade/100)/totalWeight)*1000)/10).toString()+"%</b> \
                based on "+Math.round((totalWeight*1000)/10).toString()+"% of the graded course material.";

    }





}
