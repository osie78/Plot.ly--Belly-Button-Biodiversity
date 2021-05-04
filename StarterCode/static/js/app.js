function plots(initial) {
    d3.json("samples.json").then((data) => {
        
        var sample = data.samples;

        var list = sample.filter(x => x.id == initial);
      
        var result = list[0];
        console.log(result);
  
        var otu_ids = result.otu_ids;
        console.log (otu_ids);
  
        var otu_labels = result.otu_labels;
        console.log(otu_labels);
  
        var sample_values = result.sample_values;
        console.log(sample_values);
  
  
     //horizontal bar chart
  
        // var sortedBysampleValues=samples.sort((a,b) => b.sample_values-a.sample_values);
        // slicedData= sortedBysampleValues.slice(0,10);     
     
        var trace1= {
            x:sample_values,
            y:otu_ids.slice(0,10),
            text:otu_labels.slice(0,10),
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
             
 
   });
}  
     
  // Initialize the dashboard
  function init() {
    
    // d3.selectAll("#selDataset").on("change", updatePlotly);
    
    // function updatePlotly() {
    
    
    // Get data selecting from dropdown
    var selectDropdown = d3.select("#selDataset");
  
    // Populating the dropdown menue by using the list of initial names
    d3.json("samples.json").then((data) => {
      var name = data.names;
  
      name.forEach((initial) => {
        selectDropdown
          .append("option")
          .text(initial)
          .property("value", initial);
      })
  
      // Use the initial data from the list to build the plots
      var sample = name[0];
      plots(sample);
      
    });

   
 
   
  };

  init();