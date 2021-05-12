function plots(initial) {
    d3.json("samples.json").then((data) => {
        
        var sample = data.samples;

        var list1 = sample.filter(x => x.id == initial);
        var list3 = data.metadata.filter(j => j.id == initial);

        var y = list1[0];
        console.log(y);
  
        var otu_ids = y.otu_ids;
        console.log (otu_ids);
  
        var otu_labels = y.otu_labels;
        console.log(otu_labels);
  
        var sample_values = y.sample_values;
        console.log(sample_values);
        
        var w=list3[0];
        washf=w.wfreq;

  
     //horizontal bar chart
  
       
        var trace1= {
            x:sample_values.slice(0,10).reverse(),

            // the next line converts the data to strings with the map function. The values are integer and must be converted to string...that's what the map function does.
            // otherwise it won't sort

            y:otu_ids.slice(0,10).reverse().map(id=>`${id} otu_ids`),
            text:otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };
      
        var data1=[trace1]
      
        var layout1 = {
            title: "Top 10 Bacterias",
            margin: {
            l: 100, 
            r: 100,
            t:100,
            b:100 }
        };
  
        Plotly.newPlot("bar", data1, layout1);

    // Bubble Chart
        var layout2 = {
            title: "Bacteria per ID",
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
        };
        
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "RdBu"}
        };

        var data2=[trace2]
        

        Plotly.newPlot("bubble", data2, layout2);

     //Gauge chart
        var data = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: washf,
            title: {text: `Belly Button Washing Frequency`},
            type: "indicator",
        
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                    steps: [
                    {range: [0, 1], color: "black"},
                    {range: [1, 2], color: "gray"},
                    {range: [2, 3], color: "crimson"},
                    {range: [3, 4], color: "red"},
                    {range: [4, 5], color: "coral"},
                    {range: [5, 6], color: "orange"},
                    {range: [6, 7], color: "lime"},
                    {range: [7, 8], color: "lime"},
                    {range: [8, 9], color: "lime"},
                    ]}
                
            }
        ];
        var layout = { 
            width: 400, 
            height: 300, 
            margin: { t: 20, b: 40, l:100, r:100 } 
            };
        Plotly.newPlot("gauge", data, layout);         
 
   });
}  



function demoInfo(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);

    // Filter the data
    var list2 = metadata.filter(sampleObj => sampleObj.id == sample);
    var y = list2[0];
    // Use d3 to select the required panel
    var info = d3.select("#sample-metadata");

    // resets the table
    info.html("");

    // add each key and value 
    Object.entries(y).forEach(([key, value]) => {
      info.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}




//the html file is already wired up with the optionChanged and the .on function is not needed in this case (this is not recommended. It's better to use the .on("change") and then update)
function optionChanged(sample) {
    plots(sample);
    demoInfo(sample);
};

  // Initialize the dashboard
  function init() {
    
    // d3.selectAll("#selDataset").on("change", updatePlotly);
    
    // function updatePlotly() {
    
    
    // Get data selecting from dropdown
    var selectDropdown = d3.select("#selDataset");
  
    // Populating the dropdown menue by using the list1 of initial names
    d3.json("samples.json").then((data) => {
      var name = data.names;
  
    //   Using d3 to build the dropdown
      name.forEach((initial) => {
        selectDropdown
          .append("option")
          .text(initial)
          .property("value", initial);
      })
  
      // Use the initial data from the list1 to build the plots and populate the DemoInfo table
      var sample = name[0];
      plots(sample)
      demoInfo(sample);
      
    });

    

   
 
   
  };

  init();