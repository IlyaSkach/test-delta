import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.scss'; // Подключаем стили

const Chart = ({ data, method }) => {
  const chartComponentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('Data:', data);
    console.log('Method:', method);
  }, [data, method]);

	useEffect(() => {
		const handleResize = () => {
			if (chartComponentRef.current) {
				const chart = chartComponentRef.current.chart;
				const width = containerRef.current.clientWidth;
				const height = containerRef.current.clientHeight;
				setTimeout(() => {
					chart.setSize(width, height, false);
				}, 0);
			}
		};
	
		const resizeObserver = new ResizeObserver(handleResize);
		const container = containerRef.current;
		if (container) {
			resizeObserver.observe(container);
		}
	
		return () => {
			if (container) {
				resizeObserver.unobserve(container);
			}
		};
	}, []);

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: `Данные по ${method}`
    },
    xAxis: {
      categories: ['Сегодня', 'Прошлая неделя', 'Этот месяц']
    },
    yAxis: {
      title: {
        text: 'Значения'
      }
    },
    series: [{
      name: 'Значения',
      data: data
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  return (
    <div className="chart-container" ref={containerRef}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default Chart;