import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker/locale/en";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Users Registered Per Month",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
const data = {
    labels,
    datasets: [
        {
            label: "Users",
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: "rgba(0, 200, 83, 0.7)", // Green
        },
        {
            label: "Admins",
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            backgroundColor: "rgba(41, 98, 255, 0.7)", // Blue
        },
    ],
    
};

  return <Bar options={options} data={data} />;
}
