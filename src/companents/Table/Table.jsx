import React, { useState } from "react";
import "./Table.scss";
import Chart from '../Chart/Chart';




const dataFirst = [
  { method: "Выручка, руб", today: 500521, lastWeek: 480521, thisMonth: 4805121 },
  { method: "Наличные", today: 300000, lastWeek: 300000, thisMonth: 300000 },
  { method: "Безналичный расчет", today: 100000, lastWeek: 100000, thisMonth: 100000 },
  { method: "Кредитные карты", today: 100521, lastWeek: 100000, thisMonth: 100521 },
  { method: "Средний чек, руб", today: 1300, lastWeek: 900, thisMonth: 900 },
  { method: "Средний гость, руб", today: 1200, lastWeek: 800, thisMonth: 800 },
  { method: "Удаления из чека (после оплаты), руб", today: 1000, lastWeek: 1100, thisMonth: 900 },
  { method: "Удаления из чека (до оплаты), руб", today: 1300, lastWeek: 1100, thisMonth: 1200 },
  { method: "Количество чеков", today: 34, lastWeek: 36, thisMonth: 34 },
  { method: "Количество гостей", today: 34, lastWeek: 36, thisMonth: 32 },
];

const dataSecond = [
  { method: "Выручка, руб", today: 600521, lastWeek: 700521, thisMonth: 5805121 },
  { method: "Наличные", today: 400000, lastWeek: 500000, thisMonth: 400000 },
  { method: "Безналичный расчет", today: 200000, lastWeek: 100000, thisMonth: 200000 },
  { method: "Кредитные карты", today: 200521, lastWeek: 100000, thisMonth: 200521 },
  { method: "Средний чек, руб", today: 2300, lastWeek: 1900, thisMonth: 1900 },
  { method: "Средний гость, руб", today: 2200, lastWeek: 1800, thisMonth: 1800 },
  { method: "Удаления из чека (после оплаты), руб", today: 2000, lastWeek: 2100, thisMonth: 1900 },
  { method: "Удаления из чека (до оплаты), руб", today: 2300, lastWeek: 2100, thisMonth: 2200 },
  { method: "Количество чеков", today: 44, lastWeek: 46, thisMonth: 44 },
  { method: "Количество гостей", today: 44, lastWeek: 46, thisMonth: 42 },
];

const Table = () => {
  const [data, setData] = useState(dataFirst);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFirstMonthClick = () => {
    setData(dataFirst);
  };

  const handleSecondMonthClick = () => {
    setData(dataSecond);
  };

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const calculatePercentageChange = (today, yesterday) => {
    if (yesterday === 0) return 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="month-button" onClick={handleFirstMonthClick}>Первый месяц</button>
        <button className="month-button" onClick={handleSecondMonthClick}>Второй месяц</button>
      </div>
      <table id="data-table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th className="today">Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const percentageChange = calculatePercentageChange(row.today, row.lastWeek);
            let changeClass = '';
            if (percentageChange > 0) {
              changeClass = 'positive';
            } else if (percentageChange < 0) {
              changeClass = 'negative';
            }

            return (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(index)}>
                  <td className="name">{row.method}</td>
                  <td className="today">{formatNumber(row.today)}</td>
                  <td className={`change-cell ${changeClass}`}>
                    <span className="number">{formatNumber(row.lastWeek)}</span>
                    <span className="percentage">{Math.round(percentageChange)} %</span>
                  </td>
                  <td className="number">{formatNumber(row.thisMonth)}</td>
                </tr>
                {selectedRow === index && (
                  <tr>
                    <td colSpan="4">
                      <div className="chart">
                        <Chart data={[row.today, row.lastWeek, row.thisMonth]} method={row.method} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;