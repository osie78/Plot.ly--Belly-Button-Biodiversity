d3.json("samples.json").then((data)=> {
  var metadata = data.metadata;
  console.log(metadata);
})