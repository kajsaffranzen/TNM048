function map(){

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

    var mapDiv = $("#map");

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = mapDiv.width() - margin.right - margin.left,
        height = mapDiv.height() - margin.top - margin.bottom;

    //initialize color scale
    // var colors = ["#FF922D", "#FF5252", "#2AC0D4", "#7CD7BB", "#FECD40", "#A626AA"];
    var colors = d3.scale.category20();
    
    //initialize tooltip
     var tooltip = d3.select("#map").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    

    var projection = d3.geo.mercator()
        .center([50, 60 ])
        .scale(250);

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    var path = d3.geo.path()
        .projection(projection);

    g = svg.append("g");

    // load data and draw the map
    d3.json("../data/world-topo.json", function(error, world) {
    // d3.json("data/se.topojson", function(error, world) {
        console.log(world);
        var countries = topojson.feature(world, world.objects.countries).features;
        
        //load summary data
        d3.csv("data/OECD-better-life-index-hi.csv", function(error, data) {
            draw(countries, data);
        });

        draw(countries);
        
    });

    function draw(countries,data)
    {
        var country = g.selectAll(".country").data(countries);

        //initialize a color country object	
        var cc = {};
		
        //...
        data.forEach(function(d){
            cc[d["Country"]] = colors(d["Country"]);
        });

        country.enter().insert("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("id", function(d) { 
                // console.log(d.id);
                return d.id; })
            .attr("title", function(d) { return d.properties.name; })
            //country color
            .style("fill", function(d){ 
                return cc[d.properties.name]; 
            })
            //...
            //tooltip
            .on("mousemove", function(d) {
                console.log(d.properties.name)
                
                tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 40) + "px")
                // tooltip.html(d.properties.name)
                //     .style("left", (d3.event.pageX - 40) + "px")
                //     .style("top", (d3.event.pageY - 100) + "px");
            })
            .on("mouseout",  function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);  
            })
            //selection
            .on("click",  function(d) {
                //...
            });

    }
    
    //zoom and panning method
    function move() {

        var t = d3.event.translate;
        var s = d3.event.scale;
        

        zoom.translate(t);
        g.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");

    }
    
    //method for selecting features of other components
    function selFeature(value){
        //...
    }
}

