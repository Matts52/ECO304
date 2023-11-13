/* General Functions */
function generateQuestion(question){
    if (question == 'Q1') {
      genQ1();
      showAns('Q1', hide=true);
    } else if (question == 'Q2') {
      genQ2();
      showAns('Q2', hide=true);
    } else if (question == 'Q3') {
      genQ3();
      showAns('Q3', hide=true);
    } else if (question == 'Q4') {
      genQ4();
      showAns('Q4', hide=true);
    } else if (question == 'Q5') {
      genQ5();
      showAns('Q5', hide=true);
    } else if (question == 'Q6') {
      genQ6();
      showAns('Q6', hide=true);
    } else if (question == 'Q7') {
      genQ7();
      showAns('Q7', hide=true);
    } else if (question == 'Q8') {
      genQ8();
      showAns('Q8', hide=true);
    }
  }
  
  function showAns(question, hide=false) {
    const numAnswers = {
      'Q1': 4,
      'Q2': 5,
      'Q3': 3,
      'Q4': 2,
      'Q5': 2,
      'Q6': 1,
      'Q7': 1,
      'Q8': 1,
    }[question] || 0;
  
    for (let i = 1; i <= numAnswers; i++) {
      const element = document.getElementById(`${question}Ans${i}`);
      if (element) {
        if (hide) {
          element.classList.add('hidden');
        } else {
          element.classList.toggle('hidden');
        }
      }
    }
  }
  

  /* Question Specific Functions */
  
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
    let xvals = [];
    for (let i = 0; i < vals.length; i++){
      newval = Math.round(vals[i] * 100) / 100;
      xval = getRandomInt(-20, 20);
      xvals.push(xval);
      table_text = table_text + "<tr> <th>" + newval.toString() + "</th> <th>"+ xval.toString() +"</th> </tr>";
      //calculate expected values
      Q1Ans1 = Q1Ans1 + newval * xval;
      Q1Ans4 = Q1Ans4 + newval * Math.pow(xval, 2);
    }
  
    //calculate the variance and a cumulative value
    let Q1Ans2 = 0;
    let fval = getRandomInt(-20, 20);
    let Q1Ans3 = 0;
    for (let i = 0; i < vals.length; i++){
      newval = Math.round(vals[i] * 100) / 100;
      Q1Ans2 = Q1Ans2 + Math.pow( (xvals[i] - Q1Ans1),2) * newval;
      //sum cumulative
      if (xvals[i] <= fval) {
        Q1Ans3 = Q1Ans3 + newval;
      }
    }
  
    //write the answers to the output table
    document.getElementById("Q1Table").innerHTML = table_text;
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
  
    let covXY = multXY - (margexpX * margexpY);
    let rand = getRandomInt(0,2);
    let condYonX = (probs[rand]/(probs[rand]+probs[rand+3]))*yvals[rand] + (probs[rand+3]/(probs[rand]+probs[rand+3]))*yvals[rand+3];
  
    //print out our table and answers
    document.getElementById("Q2Table").innerHTML = table_text;
    document.getElementById("Q2Ans1").innerHTML = "E[X] = "+(Math.round(margexpX*1000)/1000).toString();
    document.getElementById("Q2Ans2").innerHTML = "E[Y] = "+(Math.round(margexpY*1000)/1000).toString();
    document.getElementById("Q2Ans3").innerHTML = "E[XY] = "+(Math.round(multXY*1000)/1000).toString();
    document.getElementById("Q2Ans4").innerHTML = "cov(X,Y) = "+(Math.round(covXY*1000)/1000).toString();
    document.getElementById("Q2Ans5").innerHTML = "E[Y|X="+xvals[rand]+"] = "+(Math.round(condYonX*1000)/1000).toString();
  
  }
  
  /* generate a uniform distribution example */
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
    expect = (low + high)/2
    variance = Math.pow((high - low), 2)/12
  
    //write the output
    document.getElementById("Q3Text").innerHTML = q_text;
    document.getElementById("Q3Ans1").innerHTML = "Probability = "+(Math.round(ans*1000)/1000).toString();
    document.getElementById("Q3Ans2").innerHTML = "E[X] = "+(Math.round(expect*1000)/1000).toString();
    document.getElementById("Q3Ans3").innerHTML = "Var(X) = "+(Math.round(variance*1000)/1000).toString();
  }
  
  /* generate a normal distribution example */
  function genQ4(){
    //generate randomness
    mean = getRandomInt(-100,100);
    variance = getRandomInt(1,50);
    xval = getRandomInt(mean-10,mean+10);
    symbols = [">", "<"];
    symb = getRandomInt(0,1);
  
    //generate question text
    q_text = "Consider a Normal Random Variable X~N("+mean.toString()+", "+variance.toString()+"). Please calculate the standardized value of "+xval.toString()+". Also calculate the probability that X "+symbols[symb]+" "+xval.toString()+".";
  
    //calculate the standardized value
    zval = (xval - mean)/Math.sqrt(variance);
  
    //calculate the answer
    if (symb == 0) {
      ans = 1 - normalcdf(zval);
    } else {
      ans = normalcdf(zval);
    }
  
    //write the output
    document.getElementById("Q4Text").innerHTML = q_text;
    document.getElementById("Q4Ans1").innerHTML = "z = "+(Math.round(zval*1000)/1000).toString();
    document.getElementById("Q4Ans2").innerHTML = "Probability = "+(Math.round(ans*1000)/1000).toString();
  }
  
  
  /* question about sample mean */
  function genQ5(){
  let numVals = getRandomInt(2, 5);
  let vals = [];
  let n = getRandomInt(5, 50);
  
  //generate the random values
  for (let i = 0; i <= numVals - 1; i++) {
    newval = Math.random() * 1/numVals;
    vals.push(newval);
  }
  vals.push(1 - vals.reduce((partialSum, a) => partialSum + a, 0));
  
  q_text = "Assume a sample size of "+n.toString()+". What is the expectation and variance of the sample mean?";
  
  let table_text = "<tr> <th> Probability </th> <th> X </th> </tr>";
  let expected = 0;
  let xvals = [];
  for (let i = 0; i < vals.length; i++){
    newval = Math.round(vals[i] * 100) / 100;
    xval = getRandomInt(-20, 20);
    xvals.push(xval);
    table_text = table_text + "<tr> <th>" + newval.toString() + "</th> <th>"+ xval.toString() +"</th> </tr>";
    //calculate expected values
    expected = expected + newval * xval;
  }
  
  //calculate the variance and a cumulative value
  let variance = 0;
  for (let i = 0; i < vals.length; i++){
    newval = Math.round(vals[i] * 100) / 100;
    variance = variance + Math.pow( (xvals[i] - expected),2) * newval;
  }
  variance = variance/n
  
  console.log(table_text);

  //write the answers to the output table
  document.getElementById("Q5Text").innerHTML = q_text;
  document.getElementById("Q5Table").innerHTML = table_text;
  document.getElementById("Q5Ans1").innerHTML = "Expectation = "+(Math.round(expected*1000)/1000).toString();
  document.getElementById("Q5Ans2").innerHTML = "Variance = "+(Math.round(variance*1000)/1000).toString();
  
  }
  
  
  function genQ6(){
  let trueKnown = [false, true][getRandomInt(0,1)];
  
  //initialize our variables
  mean = getRandomInt(-50, 50);
  variance = getRandomInt(1, 100);
  conf = getRandomInt(0,2);
  confLevel = [90, 95, 99][conf];
  zval = [1.645, 1.96, 2.58][conf];
  n = getRandomInt(5, 100);
  
  q_text = "Assume that data is randomly sampled.";
  
  //check for if true mean known
  if (trueKnown){
  
    q_text += " The underlying mean is "+mean.toString()+", underlying variance is "+variance.toString()+", sample size is "+n.toString()+", and a "+confLevel.toString()+" \
      percent confidence level is desired. Please calculate this confidence interval for E[X].";
  
    ans_lower = mean - zval * Math.sqrt(variance/n);
    ans_upper = mean + zval * Math.sqrt(variance/n);
  
    q_ans = "E[X] &#8712; ("+(Math.round(ans_lower*1000)/1000).toString()+", "+(Math.round(ans_upper*1000)/1000).toString()+")";
  //otherwise if the true mean is not known
  } else {
  
    q_text += " The sample mean is "+mean.toString()+", sample variance is "+variance.toString()+", sample size is "+n.toString()+", and a "+confLevel.toString()+" \
      percent confidence level is desired. Please calculate this confidence interval for E[X].";
  
    //calulcate the critical value from the t-table
    alpha = (100 - confLevel)/200;
    tcritval = tdistr(n-1, alpha);
  
    ans_lower = mean - tcritval * Math.sqrt(variance/n);
    ans_upper = mean + tcritval * Math.sqrt(variance/n);
  
    q_ans = "E[X] &#8712; ("+(Math.round(ans_lower*1000)/1000).toString()+", "+(Math.round(ans_upper*1000)/1000).toString()+")";
  }
  
  document.getElementById("Q6Text").innerHTML = q_text;
  document.getElementById("Q6Ans1").innerHTML = q_ans;
  
  }
  
  
  function genQ7(){
  //initialize our variables
  variance = getRandomInt(1, 100);
  conf = getRandomInt(0,2);
  confLevel = [90, 95, 99][conf];
  n = getRandomInt(5, 100);
  
  q_text = "Assume that data is randomly sampled. The sample variance is "+variance.toString()+", sample size is "+n.toString()+", and a "+confLevel.toString()+" \
  percent confidence level is desired. Please calculate this confidence interval for Var[X].";
  
  //calculcate the critical value from the chi-table
  alpha = (100 - confLevel)/200
  chihighcritval = chisqrdistr(n-1, alpha);
  chilowcritval = chisqrdistr(n-1, 1-alpha);
  
  //get the two boundaries
  ans_lower = ((n-1)*variance)/chihighcritval;
  ans_upper = ((n-1)*variance)/chilowcritval;
  
  q_ans = "Var[X] &#8712; ("+(Math.round(ans_lower*1000)/1000).toString()+", "+(Math.round(ans_upper*1000)/1000).toString()+")";
  
  //write to document
  document.getElementById("Q7Text").innerHTML = q_text;
  document.getElementById("Q7Ans1").innerHTML = q_ans;
  
  }
  
  function genQ8() {
    //initialize our variables
    sampMean = Math.random() * 50;
    testMean = sampMean + Math.random() * 5 * [-1, 1][getRandomInt(0,1)]
    sampVar = Math.random() * 100;
    conf = getRandomInt(0,2);
    confLevel = [90, 95, 99][conf];
    n = getRandomInt(5, 100);
  
    q_text = "Assume random sampling. Given a sample mean of "+sampMean.toFixed(2).toString()+", sample variance of "+sampVar.toFixed(2).toString()+", confidence level \
          of "+confLevel.toString()+", and sample size of "+n.toString()+". Test the hypothesis that the underlying mean is "+testMean.toFixed(2).toString()+"."
  
    //calculate our test statistic
    teststat = (sampMean - testMean)/Math.sqrt(sampVar/n);
  
    //calulcate the critical value from the t-table
    alpha = (100 - confLevel)/200;
    tcritval = tdistr(n-1, alpha);
  
    //do the decision rule
    if (Math.abs(teststat) > Math.abs(tcritval)){
      q_ans = "Reject the Null Hypothesis"
    } else {
      q_ans = "Fail to reject the Null Hypothesis"
    }
  
    //write to document
    document.getElementById("Q8Text").innerHTML = q_text;
    document.getElementById("Q8Ans1").innerHTML = q_ans;
  
  }