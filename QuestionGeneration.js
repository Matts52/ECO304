
/* code for generating a single variable question sample */
function genQ1(){
  let numVals = getRandomInt(3, 5);
  let vals = [];

  //generate the random values
  for (let i = 0; i <= numVals - 1; i++) {
    newval = Math.random() * 1/numVals;
    vals.push(newval);
  }
  vals.push(1 - vals.reduce((partialSum, a) => partialSum + a, 0));

  //convert random values to a table and calculate expected value answer iteratively
  let table_text = "<tr> <th> Probability </th> <th> X </th> </tr>";
  let Q1Ans1 = 0;
  let Q1Ans4 = 0;
  let xvals = []
  for (let i = 0; i < vals.length; i++){
    newval = Math.round(vals[i] * 100) / 100
    xval = getRandomInt(-20, 20)
    xvals.push(xval)
    table_text = table_text + "<tr> <th>" + newval.toString() + "</th> <th>"+ xval.toString() +"</th> </tr>";
    //calculate expected values
    Q1Ans1 = Q1Ans1 + newval * xval
    Q1Ans4 = Q1Ans4 + newval * Math.pow(xval, 2)
  }

  //calculate the variance and a cumulative value
  let Q1Ans2 = 0
  let fval = getRandomInt(-20, 20)
  let Q1Ans3 = 0
  for (let i = 0; i < vals.length; i++){
    newval = Math.round(vals[i] * 100) / 100
    Q1Ans2 = Q1Ans2 + Math.pow( (xvals[i] - Q1Ans1),2) * newval
    //sum cumulative
    if (xvals[i] <= fval) {
      Q1Ans3 = Q1Ans3 + newval
    }
  }

  //write the answers to the output table
  document.getElementById("Q1Text").innerHTML = table_text;
  document.getElementById("Q1Ans1").innerHTML = "E[X] = "+(Math.round(Q1Ans1*1000)/1000).toString();
  document.getElementById("Q1Ans2").innerHTML = "Var(X) = "+(Math.round(Q1Ans2*1000)/1000).toString();
  document.getElementById("Q1Ans3").innerHTML = "F("+fval.toString()+") = "+(Math.round(Q1Ans3*1000)/1000).toString();
  document.getElementById("Q1Ans4").innerHTML = "E[X<sup>2</sup>] = "+(Math.round(Q1Ans4*1000)/1000).toString();

}



/* Code for generating a two variable question sample */
function genQ2(){
  let numVals = 5;
  let probs = [];
  //generate the random values
  for (let i = 0; i <= numVals - 1; i++) {
    newval = Math.random() * 1/numVals;
    probs.push(newval);
  }
  probs.push(1 - probs.reduce((partialSum, a) => partialSum + a, 0));


  //set arbitrary numbers for x and y
  a = getRandomInt(-50, 50);
  b = getRandomInt(-50, 50);
  c = getRandomInt(-50, 50);
  d = getRandomInt(-50, 50);
  e = getRandomInt(-50, 50);
  let xvals = [a,b,c,a,b,c];
  let yvals = [d,e,d,e,d,e];

  //convert random values to a table and calculate expected value answer iteratively
  let table_text = "<tr> <th> Probability </th> <th> X </th> <th> Y </th> </tr>";
  for (let i = 0; i < probs.length; i++){
    newprob = Math.round(probs[i] * 100) / 100;
    table_text = table_text + "<tr> <th>" + newprob.toString() + "</th> <th>"+ xvals[i].toString() +"</th> <th>"+yvals[i].toString()+"</th> </tr>";
  }

  //get the marginals
  let margexpX = 0;
  let margexpY = 0;
  let multXY = 0;
  for (let i = 0; i < probs.length; i++){
    newprob = Math.round(probs[i] * 100) / 100;
    margexpX = margexpX + newprob * xvals[i];
    margexpY = margexpY + newprob * yvals[i]; 
    multXY= multXY + newprob * xvals[i] * yvals[i];
  }

  let covXY = multXY - (margexpX * margexpY)
  let rand = getRandomInt(0,2)
  let condYonX = (probs[rand]/(probs[rand]+probs[rand+3]))*yvals[rand] + (probs[rand+3]/(probs[rand]+probs[rand+3]))*yvals[rand+3]

  //print out our table and answers
  document.getElementById("Q2Text").innerHTML = table_text;
  document.getElementById("Q2Ans1").innerHTML = "E[X] = "+(Math.round(margexpX*1000)/1000).toString();
  document.getElementById("Q2Ans2").innerHTML = "E[Y] = "+(Math.round(margexpY*1000)/1000).toString();
  document.getElementById("Q2Ans3").innerHTML = "E[XY] = "+(Math.round(multXY*1000)/1000).toString();
  document.getElementById("Q2Ans4").innerHTML = "cov(X,Y) = "+(Math.round(covXY*1000)/1000).toString();
  document.getElementById("Q2Ans5").innerHTML = "E[Y|X="+xvals[rand]+"] = "+(Math.round(condYonX*1000)/1000).toString();

}

function genQ3(){
  //generate our randomness
  low = getRandomInt(-100, 100);
  high = getRandomInt(low+1, low + 50);
  xval = getRandomInt(low-5, high+5);
  symbols = [">", "<"];
  symb = getRandomInt(0,1);

  //generate the prompt
  q_text = "Consider a Uniform Random Variable X~U("+low.toString()+", "+high.toString()+"). Please calculate the probability that X "+symbols[symb]+" "+xval.toString()+"? Also calculate the expectation and variance of X.";

  //calculate the answer
  if (symb == 0) {
    ans = 1 - (xval - low)/(high - low);
  } else {
    ans = (xval - low)/(high - low);
  }

  //account for edge cases
  if (ans > 1) {
    ans = 1;
  } else if (ans < 0){
    ans = 0;
  }

  //calculate expectation and varaince
  expext = (low + high)/2
  variance = Math.pow((high - low), 2)/12

  //write the output
  document.getElementById("Q3Text").innerHTML = q_text;
  document.getElementById("Q3Ans1").innerHTML = "Probability = "+(Math.round(ans*1000)/1000).toString();
  document.getElementById("Q3Ans2").innerHTML = "E[X] = "+(Math.round(expect*1000)/1000).toString();
  document.getElementById("Q3Ans3").innerHTML = "Var(X) = "+(Math.round(variance*1000)/1000).toString();

}





function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

