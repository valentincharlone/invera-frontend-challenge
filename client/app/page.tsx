import { Suspense } from "react"
import { Dashboard } from "@/components/Dashboard/Dashboard"
import { DashboardSkeleton } from "@/components/Dashboard/DashboardSkeleton"

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 md:p-[60px]">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </main>
  )
}

