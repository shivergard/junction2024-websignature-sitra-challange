import * as echarts from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';

const MouseCurvatureChart = ({ events }) => {
    const chartDomRef = useRef(null);
    const [chart, setChart] = useState(null);
    const lastEvents = events.slice(-5);
    const option = useMemo(() => ({
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'value'
        },
        series: lastEvents.map((event) => ({
            type: 'line',
            data: event.mouseCurvatureAnglePdf.reduce((acc, cv, i) => { acc.push([i, (acc[acc.length - 1]?.[1] || 0) + cv]); return acc; }, [])
        }))
    }), [lastEvents]);

    useEffect(() => {
        const chartDom = chartDomRef.current;
        if (chartDomRef.current === null) {
            return
        }

        if (chart) return;

        setChart(echarts.init(chartDom));

        return () => {
            chart?.dispose();
        }
    }, [chartDomRef, chart]);

    useEffect(() => {
        if (!option) return;

        chart?.setOption(option);
    }, [chart, option]);

    return (
        <figure className="C1">
            <div ref={chartDomRef} style={{ width: "100%", height: "auto" }}></div>
            <legend>Mouse events angle of curvature CDF (last 5 events)</legend>
        </figure>
    );
}

export default MouseCurvatureChart;
