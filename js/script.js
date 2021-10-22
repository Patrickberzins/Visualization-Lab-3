d3.csv('cities.csv', d3.autoType).then(data=>{
console.log(data)

const filtered = data.filter(d=>d.eu == true)

console.log('filtered', filtered)

d3.select('.city-count').text(`Number of Cities: ${filtered.length}`)


const margin = ({top: 20, right: 20, bottom: 60, left: 50})

const width = 770 - margin.left - margin.right,
height = 630 - margin.top - margin.bottom;

const svg = d3.select('.population-plot').append("svg")
    .attr("width", width)
    .attr("height", height)
    
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll('.scatter')
    .data(filtered)
    .enter()
    .append('circle')
    .attr('cx', d=> d.x)
    .attr('cy', d=> d.y)
    .attr('r', a => (a.population > 1000000) ? 8 : 4)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2')
    .attr('class', 'scatter')
    
    const big = filtered
    .filter(a => a.population > 1000000)
    
    console.log ('big', big)

    svg.selectAll('.text')
    .data(big)
    .enter()
    .append('text')
    .text(d => d.city)
    .attr("y", d=> d.y - 15)
    .attr("x", d=> d.x)
    .attr("font-size", 11)
    .attr('text-anchor', 'middle')

    d3.csv('buildings.csv', d3.autoType).then(data=>{

        const svg_2 = d3.select('.bar-chart').append("svg")
        .attr("width", 400 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        //.attr("transform", "translate(" + "," + margin.top + ")");

        data.sort((a,b) => b.height_ft - a.height_ft)
        const max = d3.max(data.map(d=>d.height_ft))
        console.log(max)

        var yScale = d3.scaleBand()
        .range ([0, height-30])
        .domain(data.map(d=>d.building))
        .padding(0.1),

        xScale = d3.scaleLinear()
        .range ([width, 0])
        .domain([0,max]);


        svg_2.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 170)
        .attr('y', d=> yScale(d.building))
        .attr('width', d=> d.height_px)
        .attr('height', yScale.bandwidth()-10)
        .attr('fill', '#69a3b2')
        .attr('class', 'bar')
        .on("click", (event,d) => {// event is passed first from D3

            d3.select('.height').text(d.height_ft);
            d3.select('.city').text(d.city);
            d3.select('.country').text(d.country);
            d3.select('.floors').text(d.floors);
            d3.select('.completed').text(d.completed);
            d3.select(".image").attr("src", "../assets/" + d.image);
          });

        svg_2.selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .text(d => d.building)
        .attr("y", d=> yScale(d.building)+23)
        .attr("x", 0)
        .attr("font-size", 11)

        svg_2.selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .text(d => `${d.height_ft} ft.`)
        .attr("y", d=> yScale(d.building)+23)
        .attr("x", d=> d.height_px + 155)
        .attr("font-size", 11)
        .attr('text-anchor', 'end')
        .attr('fill', 'white')


    })





    





})