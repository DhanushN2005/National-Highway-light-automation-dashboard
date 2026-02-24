import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Activity, Lightbulb, AlertCircle, Leaf, Clock } from "lucide-react";
import HighwayMap from "../components/HighwayMap";
import KPICard from "../components/KPICard";

const mockAlerts = [
  {
    id: 1,
    zone: "NH-44-KM-150",
    type: "Fault Detected",
    message: "3 lighting units not responding",
    time: "12 mins ago",
    priority: "high",
  },
  {
    id: 2,
    zone: "NH-1-KM-89",
    type: "Manual Override",
    message: "Brightness increased to 100% by Officer Kumar",
    time: "35 mins ago",
    priority: "medium",
  },
  {
    id: 3,
    zone: "NH-8-KM-201",
    type: "SLA Breach Warning",
    message: "Response time approaching threshold",
    time: "1 hour ago",
    priority: "medium",
  },
  {
    id: 4,
    zone: "NH-2-KM-67",
    type: "Maintenance Complete",
    message: "Zone restored to normal operation",
    time: "2 hours ago",
    priority: "low",
  },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Control Room Dashboard</h1>
        <p className="text-slate-600 mt-1">National Highway Smart Lighting Management System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Zones"
          value="2,847"
          icon={Activity}
          color="blue"
          subtitle="Across all highways"
        />
        <KPICard
          title="Active Zones"
          value="2,791"
          icon={Lightbulb}
          color="green"
          subtitle="98.0% operational"
        />
        <KPICard
          title="Faulty Zones"
          value="56"
          icon={AlertCircle}
          color="red"
          subtitle="Under maintenance"
        />
        <KPICard
          title="Energy Saved"
          value="34.2%"
          icon={Leaf}
          color="emerald"
          subtitle="vs conventional lighting"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Highway Map */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">National Highway Network</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-600">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-slate-600">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-slate-600">Fault</span>
              </div>
            </div>
          </div>
          <HighwayMap />
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Recent Alerts</h2>
          </div>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="pb-4 border-b border-slate-100 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={
                      alert.priority === "high"
                        ? "destructive"
                        : alert.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">{alert.zone}</p>
                <p className="text-xs text-slate-600">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
