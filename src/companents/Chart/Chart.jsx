import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ data, method }) => {
  const options = {
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
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;