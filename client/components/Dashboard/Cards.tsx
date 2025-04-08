import { Card, CardContent } from "@/components/ui/card";
import type { StatisticsType } from "../../lib/types";
import {
  Dots,
  NewUsers,
  OtherUsers,
  TopUsers,
  TotalUsers,
} from "../Icons/Icons";
interface StatCardsProps {
  statistics: StatisticsType;
}

export function Cards({ statistics }: StatCardsProps) {
  const stats = [
    {
      title: "Total Users",
      value: statistics.totalUsers,
      icon: <TotalUsers />,
    },
    {
      title: "New Users",
      value: statistics.newUsers,
      icon: <NewUsers />,
    },
    {
      title: "Top Users",
      value: statistics.topUsers,
      icon: <TopUsers />,
    },
    {
      title: "Other Users",
      value: statistics.otherUsers,
      icon: <OtherUsers />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border border-[#5F5F5F] rounded-xl">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                {stat.icon}
              </div>
              <div>
                <p className="text-[16px] text-[#BABABA] font-bold">
                  {stat.title}
                </p>
                <p className="text-sm font-normal text-[#FCFCFC]">
                  {stat.value}
                </p>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-white">
              <Dots />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
