import React, { useState } from "react";
import "./Table.scss";
import Chart from '../Chart/Chart';

const Table = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const calculatePercentageChange = (today, yesterday) => {
    if (yesterday === 0) return 0;
    return ((today - yesterday) / yesterday) * 100;
  };

  return (
    <>
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
                  <td className="today">{row.today}</td>
                  <td className={changeClass}>
                    {row.lastWeek} <span>{Math.round(percentageChange)} %</span>
                  </td>
                  <td>{row.thisMonth}</td>
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
    </>
  );
};

const data = [
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

export default Table;