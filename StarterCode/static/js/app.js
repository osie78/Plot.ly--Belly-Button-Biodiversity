function plots(initial) {
  d3.json("samples.json").then((data) => {
    var sampleData = data.samples;
    var buildingArray = sampleData.filter(x => x.id == initial);
    var result = buildingArray[0];
    console.log(result)

    var otu_ids = result.otu_ids;
    console.log (otu_ids)

    var otu_labels = result.otu_labels;
    console.log(otu_labels)

    var sample_values = result.sample_values;
    console.log(sample_values)


   //Create a horizontal bar chart

   //  var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
  //  var barData = [
  //    {
  //      y: yticks,
  //      x: sample_values.slice(0, 10).reverse(),
  //      text: otu_labels.slice(0, 10).reverse(),
  //      type: "bar",
  //      orientation: "h",
  //    }
  //  ];

  // var sortedByvalue = sample_values((a,b) => b.sample_values - a.sample_values);
    // sliceData = sortedByvalue.slice(0,10);

    // reverseData=sliceData.reverse();
    
    var trace1={
      x:sample_values,
      y:otu_ids.slice(0,10),
      text:otu_labels.slice(0,10),
      type: "bar",
      orientation: "h"
    };
    
   var data=[trace1]
    
   var layout = {
     title: "Top 10 Bacterias",
     margin: {
       l: 100, 
       r: 100,
       t:100,
      b:100 }
   };

   Plotly.newPlot("bar", data, layout);
 });
   
   
    // Build a Bubble Chart
  var bubbleChart = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleChart);
    
    
};

function init() {
  // Grab a reference to the dropdown select element
  var selectDropdown = d3.select("#selDataset");

  // Populate the select options by using the list of initial names
  d3.json("samples.json").then((data) => {
    var name = data.names;

    name.forEach((initial) => {
      selectDropdown
        .append("option")
        .text(initial)
        .property("value", initial);
    })

    // Use the initial data from the list to build the plots
    var sampleData = name[0];
    plots(sampleData);
    buildMetaData(sampleData);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new initial is selected
  plots(newSample);
  buildMetaData(newSample);
};


// Initialize the dashboard
init()
