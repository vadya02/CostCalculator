import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { Bar } from 'react-chartjs-2';

const Chart = () => {
    const chartData = [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ];
    
      return (
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: 'My Daily Activities',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      );
};

export default Chart;