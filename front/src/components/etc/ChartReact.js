import React from "react";
import CarDescriptionStore from "../MobX/CarDescriptionStore";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    ArcElement,
    Legend,
  } from 'chart.js';
  import { Line, Pie } from 'react-chartjs-2';
//   import faker from 'faker';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  
  // export const options = {
  //   options: { labels: { scaleLabel: { fontSize: 30 } } },
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'Стоимость владения',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Стоимость владения',
  //     },
  //   },
  // };
  
  const labels = ['Топливо', 'Налог'];
  const data_chart = [CarDescriptionStore.Nalog, CarDescriptionStore.Toplivo]
  // export const data = {
  //   labels: ['Налог', 'Топливо'],
  //   datasets: [
  //       {

  //         // label: 'Стоимость владения',
  //         // data: data_chart,
  //         data: [CarDescriptionStore.Nalog, CarDescriptionStore.Toplivo],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)',
  //         ],
  //         borderColor: [
  //           'rgba(255, 99, 132, 1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  // };
  
function ChartReact ({render, data, options}) {
    const a = render
    return ( 
      <Pie data={data} options={options}/>
     );
}

export default ChartReact;