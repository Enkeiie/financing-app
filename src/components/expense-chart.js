import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ db }) => {
  var expenses = 0.0;
  var incomes = 0.0;
  db.map(item => {
    if(item.type === "expense"){
      expenses+=item.value;
    } else {
      incomes+=item.value;
    }
  });
  const data = {
    labels: ['Income','Expenses'],
    datasets: [{
      data: [incomes,expenses],
      backgroundColor: ['#0ea5e9','#ef4444'],
      hoverBackgroundColor: ['#0ea5e9','#ef4444'],
      borderColor: ['#262626'],
      borderWidth: 0.5,
    }]
  }

  if(db.length<=0){
      return (
        <div>
          <h2 className="text-center w-full">No data</h2>
        </div>
      );
  }
  return (
    <div>
      <h2 className="text-center w-full text-2xl">Income and Expense Chart</h2>
      <Pie data={data} className="text-base p-2"/>
    </div>
  );
};

export default ExpenseChart;
