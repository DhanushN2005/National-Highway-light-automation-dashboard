import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Clock, AlertCircle, CheckCircle2, Download } from "lucide-react";

interface Fault {
  id: string;
  zoneId: string;
  faultType: string;
  detected: string;
  slaTimer: string;
  slaStatus: "safe" | "warning" | "breach";
  contractor: string;
  status: "pending" | "in-progress" | "resolved";
  priority: "high" | "medium" | "low";
}

const mockFaults: Fault[] = [
  {
    id: "F-2401",
    zoneId: "NH-44-KM-150",
    faultType: "Communication Failure",
    detected: "2026-02-10 05:15 AM",
    slaTimer: "2h 45m remaining",
    slaStatus: "safe",
    contractor: "Siemens India Ltd.",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "F-2398",
    zoneId: "NH-3-KM-112",
    faultType: "Power Supply Issue",
    detected: "2026-02-10 03:30 AM",
    slaTimer: "45m remaining",
    slaStatus: "warning",
    contractor: "L&T Infrastructure",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "F-2395",
    zoneId: "NH-7-KM-156",
    faultType: "Sensor Malfunction",
    detected: "2026-02-09 11:20 PM",
    slaTimer: "15m remaining",
    slaStatus: "breach",
    contractor: "Tata Projects Ltd.",
    status: "pending",
    priority: "medium",
  },
  {
    id: "F-2392",
    zoneId: "NH-8-KM-087",
    faultType: "Dimming Control Error",
    detected: "2026-02-09 08:45 PM",
    slaTimer: "Resolved",
    slaStatus: "safe",
    contractor: "Bajaj Electricals",
    status: "resolved",
    priority: "low",
  },
  {
    id: "F-2389",
    zoneId: "NH-16-KM-234",
    faultType: "Zone Controller Offline",
    detected: "2026-02-09 06:10 PM",
    slaTimer: "5h 30m remaining",
    slaStatus: "safe",
    contractor: "Philips Lighting India",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "F-2387",
    zoneId: "NH-2-KM-045",
    faultType: "Network Connectivity",
    detected: "2026-02-09 04:25 PM",
    slaTimer: "Resolved",
    slaStatus: "safe",
    contractor: "Siemens India Ltd.",
    status: "resolved",
    priority: "low",
  },
];

export default function Maintenance() {
  const getSLAColor = (status: Fault["slaStatus"]) => {
    switch (status) {
      case "safe":
        return "text-green-700 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "breach":
        return "text-red-700 bg-red-50 border-red-200";
    }
  };

  const getStatusColor = (status: Fault["status"]) => {
    switch (status) {
      case "pending":
        return "bg-slate-100 text-slate-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
    }
  };

  const getPriorityColor = (priority: Fault["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
    }
  };

  const pendingCount = mockFaults.filter((f) => f.status === "pending").length;
  const inProgressCount = mockFaults.filter((f) => f.status === "in-progress").length;
  const breachCount = mockFaults.filter((f) => f.slaStatus === "breach").length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Maintenance & SLA Monitoring</h1>
        <p className="text-slate-600 mt-1">
          Track faults, contractor performance, and SLA compliance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-orange-200 bg-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 mb-1">Pending Issues</p>
              <p className="text-3xl font-semibold text-orange-900">{pendingCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">In Progress</p>
              <p className="text-3xl font-semibold text-blue-900">{inProgressCount}</p>
            </div>
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6 border-red-200 bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 mb-1">SLA Breaches</p>
              <p className="text-3xl font-semibold text-red-900">{breachCount}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Faults Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Fault Management</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fault ID</TableHead>
                <TableHead>Zone ID</TableHead>
                <TableHead>Fault Type</TableHead>
                <TableHead>Time Detected</TableHead>
                <TableHead>SLA Timer</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFaults.map((fault) => (
                <TableRow key={fault.id}>
                  <TableCell className="font-medium">{fault.id}</TableCell>
                  <TableCell>{fault.zoneId}</TableCell>
                  <TableCell>{fault.faultType}</TableCell>
                  <TableCell className="text-sm text-slate-600">{fault.detected}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSLAColor(fault.slaStatus)}>
                      {fault.slaTimer}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{fault.contractor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(fault.status)}>
                      {fault.status === "in-progress"
                        ? "In Progress"
                        : fault.status.charAt(0).toUpperCase() + fault.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(fault.priority)}>
                      {fault.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {fault.status !== "resolved" && (
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    )}
                    {fault.status === "resolved" && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
