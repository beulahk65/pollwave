import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PollResultsChart({ question, options, votes }) {
  const data = {
    labels: options,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: "#60a5fa",
        borderRadius: 6,
      },
    ],
  };

  const optionsConfig = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div style={{ marginBottom: "20px", maxWidth: "500px", margin: "auto" }}>
      <h4 style={{ fontSize: "20px", marginBottom: "10px" }}>{question}</h4>
      <Bar data={data} options={optionsConfig} />
    </div>
  );
}

export default PollResultsChart;
