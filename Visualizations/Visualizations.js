
window.onload = function () {


/* Global variables affecting the visualization, bad practice but oh well */
var bins = 10;

var jsonData=  {
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

var jData = [];


/* Event Listeners */
document.getElementById("genCLT").addEventListener("click", genCLT);
document.getElementById("genLLN").addEventListener("click", genLLN);



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

  q_text_lln = "Assume a sample size of "+n.toString()+" for every individual sample. Observe how the sample means converges in expectation to the theoretical mean as you record more and more sample means for the following underlying random variable: ";

  document.getElementById("LLNText").innerHTML = q_text_lln;
  document.getElementById("LLNTable").innerHTML = table_text;

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
  jsonData.data[bucket].frequency += 1;

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
  .domain([0, d3.max(jsonData['data'], function(d) { return d.frequency; })])
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
  .data(jsonData['data'])
  .enter().append("g")
  .attr("key",function(d,i){ return i;})
  ;

  /* populate the bar chart with correct positioning and heights */
  var bar = svg.selectAll(".bar")
  .data(jsonData['data'])
  .enter().append("g")
  .attr("class", "bar")
  .attr("transform", function(d,i) { return "translate(" + x((i/5 + 1) - 1/10  ) + "," + y(d.frequency) + ")"; });

  /* create the rectangles in the visualization */
  bar.append("rect")
  .attr("x", 1)
  .attr("width", width/bins)
  .attr("height", function(d) { return height - y(d.frequency); })
  .attr("fill", "rgb(126, 232, 107)")
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



function genLLNData(maxSamp){
  let sampSize = 5;
  let expMean = 0;
  let TheoMean = 2;

  jData = [];

  //generate samples means
  for (let i = 0; i < maxSamp; i++){
    currSamp = 0;
    //generate samples within a sample mean
    for (let j = 0; j < sampSize; j++){
      currSamp += getRandomInt(1, 3);
    }
    currMean = currSamp/sampSize;
    expMean = (i/(i+1)) * expMean + (1/(i+1)) * currMean;

    jData.push({"x": i+1, "y": expMean, "z": TheoMean});
  }

}


function genLLN(){

  //read in the desired number of samples
  let numSamps = Number(document.getElementById("numLLNSamps").value);

  //generate the data for the visualization
  genLLNData(numSamps);

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


svg.append('path') // add a path to the existing svg
  .datum(jData)
  .attr('d', lineSamp)
  .attr("fill", "none")
  .attr("stroke", "rgb(0,0,0)")

  svg.append('path') // add a path to the existing svg
  .datum(jData)
  .attr('d', lineTheo)
  .attr("fill", "none")
  .attr("stroke", "rgb(126, 232, 107)")


  
// call the x axis
svg.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(xScale));

//call the y axis
svg.append("g")
              .call(d3.axisLeft(yScale))


svg.append("text")
              .attr("class", "x label")
              .attr("text-anchor", "middle")
              .attr("x", width/2)
              .attr("y", height * 1.09)
              .text("Number of Sample Means Considered");
              
//add the legend
svg.append("g")
              .attr("class", "legend")
              .attr("transform","translate(50,30)")
              .style("font-size","12px")
              .call(d3.legend)



}
















  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }




}