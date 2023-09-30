import React from "react";

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
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'Стоимость владения',
      },
      title: {
        display: true,
        text: 'Стоимость владения',
      },
    },
  };
  
  const labels = ['Топливо', 'Налог'];
  
  export const data = {
    labels,
    // datasets: [
    //   {
    //     label: 'Топливо',
    //     data: labels.map(() => 1),
    //     borderColor: 'rgb(255, 99, 132)',
    //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //   },
    //   {
    //     label: 'Налог',
    //     data: labels.map(() => 1),
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },

    // ],
    datasets: [
        {
          label: '# of Votes',
          data: [10, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
  };
function ChartReact () {
    
    return ( 
        
            <Pie data={data} options={options}/>
        
     );
}

export default ChartReact;