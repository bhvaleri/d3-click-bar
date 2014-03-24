window.onload = function () {
  var data = [
    {id: 1, count: 4, color: "red"},
    {id: 2, count: 8, color: "blue"},
    {id: 3, count: 15, color: "green"},
    {id: 4, count: 16, color: "orange"},
    {id: 5, count: 23, color: "purple"},
    {id: 6, count: 42, color: "steelblue"}
  ];

  var width = 500,
      height = 500;

  var y = d3.scale.linear()
      .domain([0, 42])
      .range([height, 0]);

  var svg = d3.select("body")
              .append("svg");

  svg.attr("width", width)
     .attr("height", height);

  var barWidth = width / data.length;

  var refresh = function () {
    var bars = svg.selectAll("rect")
        .data(data, function(d) { return d.id ; });

    bars.enter().append("rect")
        .attr("transform", function(d) { return "translate(" + data.indexOf(d) * barWidth + ",0)"; });

    bars.attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); })
        .attr("width", barWidth - 1);

    bars.style("fill", function(d) { return d.color; });

    bars.exit().remove();

    bars.on("click", function(d) {
      data[data.indexOf(d)].count += 1;
      var sortedData = data.sort(function (a,b) { return d3.ascending(a.count, b.count); });
      bars.attr("transform", function(d) { return "translate(" + sortedData.indexOf(d) * barWidth + ",0)"; });
      refresh();
    });
  };

  refresh();
};
