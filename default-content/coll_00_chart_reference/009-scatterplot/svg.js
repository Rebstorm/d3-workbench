(function() {

    // d3wb.setGermanLocale()
    var cv = d3wb.config()
        .attr("margin", {
            top: 10,
            right: 50,
            bottom: 50,
            left: 80
        })
        .data("data.csv")
        .toCanvas()

    d3.csv(cv.data, function(error, data) {
        if (error) throw error;
        data.forEach(function(d) {
            d["x"] = +d["Market value $m"]
            d["y"] = +d["Employees"]
            d["Country code"] = +d["Country code"]
        });
        // Remove outliers «Hon Hai precision» and «Wal-Mart»
        data = data.filter(function(d) {
            return d["Employees"] <= 1100000
        })

        var plot = wbScatterPlot()
            .height(cv.hei)
            .width(cv.wid)
            .xAxisScale(d3.scaleLog())
            .zDataPoints("Country code")
            .colorLow(d3wb.color.blue)
            .colorHigh(d3wb.color.red)
            .axisColor(d3wb.color.foreground)

        cv.datum(data).call(plot)

        cv.selectAll("rect")
            .call(wbCooltip().selector(function(d) {
                return d["Company"] + " (" + d["Country"] +
                    ")\n" + d["Market value $m"] + " M$\n"
            }))

        cv.call(d3wb.add.xAxisLabel("Market value $m").color(d3wb.color.foreground).orientation("bottom"))
        cv.call(d3wb.add.yAxisLabel("Employees").color(d3wb.color.foreground))

    });


}())