# Plotly: Belly Button Biodiversity

![](https://spencers.scene7.com/is/image/Spencers/belly%2Dpeircing?$fullsize1200$)


A dashboard is created to show the amount and type of bacteria colonies found in the individual's belly button. The test group had more than 140 individuals with different demographic data. 

Additionally,  individuals were asked about their belly button was frequency per week. 

## Workflow
* Used "d3" to read the *.json file
* Assigned functions to filter depending on the variable to be extracted from the dataset. 
* Created a function able to plot the three type of charts. Inside this function, all the plotting operation is conducted: bar, buble and gauge chart. By doing this, all the dashboard initialization for all the plots can be achieved by calling a single function. 
* A second function is created to populate the demographic table. 
* A third function was coded to account for changes in the dropdown menu when selecting a different individual. 
* Another function was created to populate the dropdown menu that allows selecting each tested individual. 


### The html file only works under a local server environment. A screenshot of the working page can be found in the images folder as "capture.png"