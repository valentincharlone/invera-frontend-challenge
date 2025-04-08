import { Suspense } from "react";
import { getStatistics, getUserTypes } from "@/lib/api";
import { AddUserButton } from "./AddUserButton";
import { Cards } from "./Cards";
import { MetricsChart } from "./MetricsChart";
import { MainTable } from "./Table/MainTable";

export async function Dashboard() {
  const statistics = await getStatistics();
  const userTypes = await getUserTypes();

  return (
    <div className="space-y-8 max-w-[1280px] w-full m-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <AddUserButton />
      </div>

      <Cards statistics={statistics} />

      <div className="rounded-xl border border-[#5F5F5F] bg-card px-6 py-8">
        <h2 className="mb-6 text-lg font-bold text-white">Estadístics</h2>
        <Suspense
          fallback={
            <div className="h-80 animate-pulse bg-muted/20 rounded-md" />
          }
        >
          <MetricsChart data={userTypes} />
        </Suspense>
      </div>

      <Suspense
        fallback={<div className="h-96 animate-pulse bg-muted/20 rounded-md" />}
      >
        <MainTable />
      </Suspense>
    </div>
  );
}
