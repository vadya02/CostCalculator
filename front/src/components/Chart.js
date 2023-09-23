import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Bar } from 'react-chartjs-2';

const Chart = () => {
    const data = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
        datasets: [
          {
            label: 'Продажи',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56],
          },
        ],
      };
      return (
        <div>
          <h2>График продаж</h2>
          <Bar data={data} />
        </div>
      );
};

export default Chart;