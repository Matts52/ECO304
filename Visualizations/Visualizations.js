


window.onload = function () {


  /* Global variables affecting the visualizations, bad practice but oh well :(   */
  var bins = 10;
  
  var CLTfreq =  {
    "data" :  [
    {"bin": "1.0", "frequency": 0}, 
    {"bin": "1.2", "frequency": 0}, 
    {"bin": "1.4", "frequency": 0}, 
    {"bin": "1.6", "frequency": 0},
    {"bin": "1.8", "frequency": 0},
    {"bin": "2.0", "frequency": 0},
    {"bin": "2.2", "frequency": 0},
    {"bin": "2.4", "frequency": 0},
    {"bin": "2.6", "frequency": 0},
    {"bin": "2.8", "frequency": 0},
    {"bin": "3.0", "frequency": 0}]
  };
  
  
  /* Event Listeners */
  document.getElementById("genCLT").addEventListener("click", genCLT);
  document.getElementById("genLLN").addEventListener("click", genLLN);
  document.getElementById("resetCLT").addEventListener("click", resetCLT);
  document.getElementById("genDFT").addEventListener("click", genDFT);
  document.getElementById("genREG").addEventListener("click", genREG);
  
  
  
  //setup the general question
  genSetup()
  
  function genSetup(){
    let numVals = 3;
    let vals = [0.33,0.33,0.33];
    let xvals = [1,2,3];
    let n = 5;
  
    //generate the prompt and table text
    q_text = "Assume a sample size of "+n.toString()+" for every individual sample. Observe how the distribution of sample means changes as you record more and more sample means for the following underlying random variable: ";
    let table_text = "<tr> <th> Probability </th> <th> X </th> </tr>";
    for (let i = 0; i < vals.length; i++){
      newval = Math.round(vals[i] * 100) / 100;
      table_text = table_text + "<tr> <th>" + newval.toString() + "</th> <th>"+ xvals[i].toString() +"</th> </tr>";
    }
  
    //write the answers to the output table
    document.getElementById("CLTText").innerHTML = q_text;
    document.getElementById("CLTTable").innerHTML = table_text;
  
    // generate the LLN information
    q_text_lln = "Assume a sample size of "+n.toString()+" for every individual sample. Observe how the sample means converges in expectation to the theoretical mean as you record more and more sample means for the following underlying random variable: ";
    document.getElementById("LLNText").innerHTML = q_text_lln;
    document.getElementById("LLNTable").innerHTML = table_text;
  
    //generate the DFT information
    q_text_dft = "Consider what happens to the shape of the t-distribution as the degrees of freedom are increased. How might economists be \
    able to take advantage of this property?"
    document.getElementById("DFTText").innerHTML = q_text_dft
  
    //generate the Regression information
    q_text_reg = "Consider how a regression line is fit. Based on the points that are plotted, how do we go about developing the \"line of best fit\"?"
    document.getElementById("RegText").innerHTML = q_text_reg
  
  }
  
  
  function genSampMean(){
    let sampSize = 5;
    let sampTotal = 0;
  
    //generate samples
    for (let i = 0; i < sampSize; i++){
      ranVal = getRandomInt(1, 3);
      sampTotal += ranVal;
    }
    //find the current sample means and add it to our data
    sampMean = sampTotal/sampSize;
    bucket = Math.round((sampMean - 1) / 0.2);
  
    //place in the correct bucket
    CLTfreq.data[bucket].frequency += 1;
  
  }
  
  
  
  function genCLT(){
  
    //read in the desired number of samples
    let numSamps = Number(document.getElementById("numSamples").value);
  
    for (let i = 0; i < numSamps; i ++){genSampMean()}
  
    var formatCount = d3.format(",.0f");
  
    /* prep the svg canvas and axis scalings */
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
  
    var x = d3.scaleLinear()
    .domain([1,3])
    .rangeRound([0, width]);
  
    var y = d3.scaleLinear()
    .domain([0, d3.max(CLTfreq['data'], function(d) { return d.frequency; })])
    .range([height, 0]);
  
  
    /* remove previous run and create a new svg */
    d3.select("#clt_dataviz").select("svg").remove();
  
    var svg = d3.select("#clt_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    /* locate the position of datapoints */
    var barr = svg.selectAll(".barr")
    .data(CLTfreq['data'])
    .enter().append("g")
    .attr("key",function(d,i){ return i;})
    ;
  
    /* populate the bar chart with correct positioning and heights */
    var bar = svg.selectAll(".bar")
    .data(CLTfreq['data'])
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d,i) { return "translate(" + x((i/5 + 1) - 1/10  ) + "," + y(d.frequency) + ")"; });
  
    /* create the rectangles in the visualization */
    bar.append("rect")
    .attr("x", 1)
    .attr("width", width/bins)
    .attr("height", function(d) { return height - y(d.frequency); })
    .attr("fill", "rgb(126, 232, 107, 0.5)")
    ;
  
    svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", height * 1.09)
      .text("Sample Mean");
  
    }
  
  
  
  function resetCLT(){
    //set each frequency bucket equal to zero
    for (let i = 0; i < 11; i++){
      CLTfreq.data[i].frequency = 0;
    }
    /* remove previous svg */
    d3.select("#clt_dataviz").select("svg").remove();
  
  }
  
  
  
  function genLLNData(maxSamp){
    let sampSize = 5;
    let expMean = 0;
    let TheoMean = 2;
  
    data = [];
  
    //generate samples means
    for (let i = 0; i < maxSamp; i++){
      currSamp = 0;
      //generate samples within a sample mean
      for (let j = 0; j < sampSize; j++){
        currSamp += getRandomInt(1, 3);
      }
      currMean = currSamp/sampSize;
      expMean = (i/(i+1)) * expMean + (1/(i+1)) * currMean;
  
      data.push({"x": i+1, "y": expMean, "z": TheoMean});
    }
  
    return data;
  
  }
  
  
  function genLLN(){
  
    //read in the desired number of samples
    let numSamps = Number(document.getElementById("numLLNSamps").value);
  
    //generate the data for the visualization
    LLNdata = genLLNData(numSamps);
  
    /* prep the svg canvas and axis scalings */
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
    .domain([1, numSamps])
    .range([0, width]) // 600 is our chart width
   
  const yScale = d3.scaleLinear()
    .domain([1, 3])
    .range([height, 0]) // 400 is our chart height
  
  const lineSamp = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(.5))
  
  const lineTheo = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.z))
    .curve(d3.curveCatmullRom.alpha(.5))
  
    /* remove previous run and create a new svg */
    d3.select("#lln_dataviz").select("svg").remove();
  
    var svg = d3.select("#lln_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
    // add a empirical mean path to the existing svg
    svg.append('path')
      .datum(LLNdata)
      .attr('d', lineSamp)
      .attr("fill", "none")
      .attr("stroke", "rgb(0,0,0)")
      .attr("id", "Emp");
  
  
      /* Animate the sampling mean updates */
      const updatedPathSamp = d3.select("#lln_dataviz").select("svg")
        .select("path#Emp")
        .interrupt()
        .datum(LLNdata)
        .attr("d", lineSamp);
      const pathLengthSamp = updatedPathSamp.node().getTotalLength();
      const transitionPathSamp = d3
        .transition()
        .ease(d3.easeSin)
        .duration(2500);
      updatedPathSamp
        .attr("stroke-dashoffset", pathLengthSamp)
        .attr("stroke-dasharray", pathLengthSamp)
        .transition(transitionPathSamp)
        .attr("stroke-dashoffset", 0);
  
  
    // add a theoretical mean path to the existing svg
    svg.append('path') 
      .datum(LLNdata)
      .attr('d', lineTheo)
      .attr("fill", "none")
      .attr("stroke", "rgb(126, 232, 107)")
      .attr("id", "Theo");
  
      /* Animate the theoretical mean updates */
      const updatedPathTheo = d3.select("#lln_dataviz").select("svg")
          .select("path#Theo")
          .interrupt()
          .datum(LLNdata)
          .attr("d", lineTheo);
        const pathLengthTheo = updatedPathTheo.node().getTotalLength();
        const transitionPathTheo = d3
          .transition()
          .ease(d3.easeSin)
          .duration(2500);
        updatedPathTheo
          .attr("stroke-dashoffset", pathLengthTheo)
          .attr("stroke-dasharray", pathLengthTheo)
          .transition(transitionPathTheo)
          .attr("stroke-dashoffset", 0);
  
  
    
        // call the x axis
        svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));
  
      //call the y axis
      svg.append("g")
                .call(d3.axisLeft(yScale));
  
      //x-axis text
      svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", height * 1.09)
                .text("Number of Sample Means Considered");
                
  
  }
  
  
  function genDFTdata(min, max){
    lowdf = 1;
    highdf = 10000;
  
    data = [];
  
    lastval = min - 0.1;
    for (let i = min; i < max; i += 0.1){
      //create new calculated values uniformly
      newval = i
      lowdfprob = compute_tdist(newval, lowdf) - compute_tdist(lastval, lowdf);
      highdfprob = compute_tdist(newval, highdf) - compute_tdist(lastval, highdf);
      normprob = normalcdf(newval) - normalcdf(lastval);
  
      data.push({"x": newval, "y": lowdfprob * 10, "z": highdfprob * 10, "normal": normprob * 10});
      lastval = newval;
    }
  
    return data;
  
  }
  
  
  
  
  function genDFT(){
    min = -4;
    max = 4;
  
  
    DFTdata = genDFTdata(min, max);
  
    /* prep the svg canvas and axis scalings */
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
    .domain([min, max])
    .range([0, width])
   
  const yScale = d3.scaleLinear()
    .domain([0, 0.5])
    .range([height, 0])
  
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));
  
  const line2 = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.z));
  
  const linenorm = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.normal));
  
  
    /* remove previous run and create a new svg */
    d3.select("#dft_dataviz").select("svg").remove();
  
    var svg = d3.select("#dft_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  
  
    document.getElementById("DegFreeText").innerHTML = "D.F. = 1";
  
    svg.append('path')
      .datum(DFTdata)
      .attr('d', line)
      .attr("fill", "none")
      .attr("stroke", "rgb(0, 0, 0)")
      .attr("id", "Begin");
    
    //plot the normal density function for reference
    svg.append('path')
      .datum(DFTdata)
      .attr('d', linenorm)
      .attr("fill", "none")
      .attr("stroke", "rgb(126, 232, 107)")
      .attr("id", "Normal");
  
      // call the x axis
      svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));
  
      //call the y axis
      svg.append("g")
                .call(d3.axisLeft(yScale));
  
      //x-axis text
      svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "middle")
                .attr("x", width/2)
                .attr("y", height * 1.09)
                .text("t-value");
                
        /* Animate the update animation */
        setTimeout(function(){
  
          document.getElementById("DegFreeText").innerHTML = "D.F. = 10000";
  
          // Updata the line
          svg.select("path")
          .enter()
          .append("path")
          .attr("class","lineTest")
          .datum(DFTdata)
          .merge(svg.select("path"))
          .transition()
          .duration(3000)
          .attr("d", line2);
        }, 2000);
  
  
  
  
  }
  
  
  function genRegPoints(min, max, numPoints){
    data = [];
    slope = Math.random() * [-1.5, 1.5][getRandomInt(0,1)]
    intercept = getRandomInt(min, max);
  
    for (let i = 0; i < numPoints; i++){
      x = min - 1
      y = min - 1
      //make sure we get a point that is in the frame of the plot
      while (x < min || y < min || x > max || y > max){
        x = getRandomInt(min, max) + Math.random();
        y = (intercept + (slope * x)) + Math.random() * [-15, 15][getRandomInt(0,1)];
      }
      //error = (intercept + (slope * x)) - y;
  
      data.push({"x": x, "y": y});
    }
  
    return data;
  
  }
  
  
  function genRegParams(data, numPoints){
    //calculate x and y means
    xmean = 0, ymean = 0;
    for (let i = 0; i < numPoints; i++){
      xmean += data[i].x/numPoints;
      ymean += data[i].y/numPoints;
    }
  
    //calculate the b1 and b0 estimate
    b1_num = 0;
    b1_denom = 0;
    for (let i = 0; i < numPoints; i++){
      b1_num += (data[i].x - xmean) * (data[i].y - ymean);
      b1_denom += Math.pow((data[i].x - xmean), 2);
    }
    b1 = b1_num/b1_denom;
    b0 = ymean - b1 * xmean;
    return [b0, b1];
  }
  
  
  
  
  function genREG() {
    min = 0;
    max = 100;
    numPoints = 10;
  
    REGpoints = genRegPoints(min, max, numPoints);
    REGparams = genRegParams(REGpoints, numPoints);
  
    //build out the supported domain for the ols lines
    OLSpoints = [];
    for (let i = 0; i < max; i++){
      if ((REGparams[0] + REGparams[1] * i > min) && (REGparams[0] + REGparams[1] * i < max)){
        OLSpoints.push({"x": i});
      }
    }
  
    /* prep the svg canvas and axis scalings */
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 350 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
  
    /* create the SVG */
    d3.select("#reg_dataviz").select("svg").remove();
    var svg = d3.select("#reg_dataviz").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
    /* create scales for our points */
    const xScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, width])
   
    const yScale = d3.scaleLinear()
      .domain([min, max])
      .range([height, 0])
  
    const linereg = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(REGparams[0] + REGparams[1]*d.x));
  
    /* call the axes */
    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
  
    svg.append("g")
      .call(d3.axisLeft(yScale));
  
    /* call the scatterplot */
    svg.append('g')
      .selectAll("dot")
      .data(REGpoints)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d.x); } )
      .attr("cy", function (d) { return yScale(d.y); } )
      .attr("r", 3)
      .style("fill", "rgb(126, 232, 107)");
  
    /* call the regression line */
    svg.append('path')
      .datum(OLSpoints)
      .attr('d', linereg)
      .attr("fill", "none")
      .attr("stroke", "rgb(0, 0, 0)")
      .attr("id", "OLS");
  
  
    /* Animate the theoretical mean updates */
    const updatedPath = d3.select("#reg_dataviz").select("svg")
      .select("path#OLS")
      .interrupt()
      .datum(OLSpoints)
      .attr("d", linereg);
    const pathLength = updatedPath.node().getTotalLength();
    const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(2500);
    updatedPath
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transitionPath)
      .attr("stroke-dashoffset", 0);
  
    //write our regression parameters to the document
    document.getElementById("RegFreeText").innerHTML = "b0: "+REGparams[0].toFixed(2).toString()+", b1: "+REGparams[1].toFixed(2).toString();
  
  }
  
  
  
  
  
  
  }
  
  
  
  
  
  
  
  
  
  /* Some attribution for d3 animation goes to https://medium.com/@louisemoxy/create-a-d3-line-chart-animation-336f1cb7dd61 and https://d3-graph-gallery.com/graph/line_change_data.html*/