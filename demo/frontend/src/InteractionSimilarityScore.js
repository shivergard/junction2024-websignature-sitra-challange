import * as echarts from 'echarts';
import { useEffect, useMemo, useRef, useState } from 'react';

const InteractionSimilarityScore = ({ events }) => {
    const chartDomRef = useRef(null);
    const [chart, setChart] = useState(null);
    const lastEvents = events.slice(-50);
    const option = useMemo(() => ({
        xAxis: {
            type: 'value',
            show: false,
        },
        yAxis: {
            type: 'value'
        },
        visualMap: {
            top: 50,
            right: 10,
            pieces: [
                {
                    gt: 0,
                    lte: 40,
                    color: 'green'
                },
                {
                    gt: 40,
                    lte: 70,
                    color: 'orange'
                },
                {
                    gt: 70,
                    color: 'red'
                }
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: [{
            type: 'line',
            data: lastEvents.map((event, i) => [i, event.interactionSimilarityScore])
        }],
    }), [lastEvents]);

    useEffect(() => {
        const chartDom = chartDomRef.current;
        if (chartDomRef.current === null) {
            return
        }

        if (chart) return;

        setChart(echarts.init(chartDom, null, { renderer: 'svg' }));
        const resizeListener = () => {
            chart?.resize();
        };
        window.addEventListener('resize', resizeListener, true);

        return () => {
            window.removeEventListener('resize', resizeListener, true);
            chart?.dispose();
        }
    }, [chartDomRef, chart]);

    useEffect(() => {
        if (!option) return;

        chart?.setOption(option);
    }, [chart, option]);

    return (
        <figure className="C2">
            <div ref={chartDomRef} style={{ width: "100%", height: "auto" }}></div>
            <legend>Interaction similarity score (last 50 events)</legend>
        </figure>
    );
}

export default InteractionSimilarityScore;
