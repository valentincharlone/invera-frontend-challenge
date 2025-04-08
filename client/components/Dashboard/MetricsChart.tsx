"use client";

import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { UserTypesType } from "@/lib/types";
import { formattedTotal } from "@/utils/formatters";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MetricsChartProps {
  data: UserTypesType;
}

const COLORS = {
  Organic: "#7b99ff",
  Social: "#4353ff",
  Direct: "#28e384",
};

export function MetricsChart({ data }: MetricsChartProps) {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ["#7b99ff", "#4353ff", "#28e384"],
        borderColor: ["#7b99ff", "#4353ff", "#28e384"],
        borderWidth: 1,
        cutout: "75%",
      },
    ],
  });

  const [userTypes, setUserTypes] = useState<
    {
      name: string;
      percentage: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    if (data && data.distribution) {
      const labels = data.distribution.map((item) => item.type);
      const values = data.distribution.map(
        (item) => (item.percentage / 100) * data.totalUsers
      );
      const backgroundColors = data.distribution.map(
        (item) => COLORS[item.type as keyof typeof COLORS] || "#cccccc"
      );

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
            cutout: "80%",
          },
        ],
      });

      setUserTypes(
        data.distribution.map((item) => ({
          name: item.type,
          percentage: item.percentage,
          color: COLORS[item.type as keyof typeof COLORS] || "#cccccc",
        }))
      );
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0">
      <div className="relative flex h-64 items-center justify-center">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold text-[#FFFFFF]">
            {formattedTotal(data.totalUsers)}
          </p>
          <p className="text-xl text-[#FFFFFF]">users</p>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-8 max-w-[400px] m-auto w-full ">
        {userTypes.map((type) => (
          <div key={type.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: type.color }}
              />
              <span className="text-sm text-muted-foreground">{type.name}</span>
            </div>
            <span className="text-sm font-medium text-[#FFFFFF]">
              {type.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
