import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { curveMonotoneX } from 'd3';

function LineChart() {
    const svgRef = useRef();

    const initialData = [
        {
            Hari: "Senin",
            Jumlah: 17
        },
        {
            Hari: "Selasa",
            Jumlah: 11
        },
        {
            Hari: "Rabu",
            Jumlah: 20
        },
        {
            Hari: "Kamis",
            Jumlah: 15
        },
        {
            Hari: "Jum'at",
            Jumlah: 12
        },
        {
            Hari: "Sabtu",
            Jumlah: 6
        },
        {
            Hari: "Ahad",
            Jumlah: 9
        },
    ]

    const [dataChart, setDataChart] = useState(initialData);

    const acakData = () => dataChart.map((data) => {
        data.Jumlah = Math.floor(
            Math.random() * 20 + 1
        )
        return data
    })

    useEffect(() => {

        let width = 1000;
        let height = 500;
        let padding = 30;

        const xScale = d3.scalePoint()
            .domain(dataChart.map((d) => d.Hari))
            .range([padding, width - padding])

        console.log('xScale', xScale('Senin'))

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataChart, (d) => d.Jumlah)])
            .range([height - padding, padding])

        console.log('yScale', yScale(0));

        const line = d3.line()
            .x((d) => xScale(d.Hari))
            .y((d) => yScale(d.Jumlah))
            .curve(curveMonotoneX)

        console.log(line(dataChart));

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        d3.select('path').remove()
        d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('style', `background: teal; margin-top: 40px;`)
            .append('path')
            .attr('d', (value) => line(dataChart))
            .attr('fill', 'none')
            .attr('stroke', 'yellow')

        d3.select('#x-axis').remove()
        d3.select(svgRef.current)
            .append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height - padding})`)
            .attr('color', 'white')
            .call(xAxis)

        d3.select('#y-axis').remove()
        d3.select(svgRef.current)
            .append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${padding}, 0)`)
            .attr('color', 'white')
            .call(yAxis)

    }, [dataChart])

    return (
        <div>
            <svg ref={svgRef}></svg>
            <div>
                <button onClick={() => setDataChart(acakData)}>Acak Data</button>
            </div>

            <div>
                {dataChart.map((data) => {
                    return (
                        <p key={data.Hari}>{data.Hari} : {data.Jumlah}</p>
                    )
                })
                }
            </div>
        </div>
    )
}

export default LineChart