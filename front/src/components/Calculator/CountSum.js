// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';

function CountSum(nalog, toplivo, summa) {    
  return (
    <div className="">
        <div className='container'>
            <p>Налог: {nalog}</p>
            <p>Топливо {toplivo}</p>
            <p>Итоговая стоимость {summa}</p>
        </div>
        

    </div>
  );
  }

export default CountSum;