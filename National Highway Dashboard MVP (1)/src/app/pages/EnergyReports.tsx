import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingDown, Zap, Leaf } from "lucide-react";

const energyData = [
  { month: "Aug 2025", conventional: 45600, smart: 29800 },
  { month: "Sep 2025", conventional: 44800, smart: 29200 },
  { month: "Oct 2025", conventional: 46200, smart: 30100 },
  { month: "Nov 2025", conventional: 47100, smart: 30800 },
  { month: "Dec 2025", conventional: 48500, smart: 31500 },
  { month: "Jan 2026", conventional: 47800, smart: 31200 },
];

export default function EnergyReports() {
  const totalSaved = 98450; // kWh
  const carbonReduced = 73.8; // Tonnes
  const costSavings = 8.9; // Lakhs
  const efficiency = 34.2; // Percentage

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Energy & Carbon Reports</h1>
        <p className="text-slate-600 mt-1">
          Track energy consumption, savings, and environmental impact
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-green-700 mb-1">Total Energy Saved</p>
          <p className="text-3xl font-semibold text-green-900">{totalSaved.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">kWh (Last 6 months)</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm text-blue-700 mb-1">CO₂ Reduction</p>
          <p className="text-3xl font-semibold text-blue-900">{carbonReduced}</p>
          <p className="text-xs text-blue-600 mt-1">Tonnes of CO₂</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <span className="text-2xl">₹</span>
          </div>
          <p className="text-sm text-purple-700 mb-1">Cost Savings</p>
          <p className="text-3xl font-semibold text-purple-900">₹{costSavings}L</p>
          <p className="text-xs text-purple-600 mt-1">Lakhs saved</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
            <TrendingDown className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm text-orange-700 mb-1">Energy Efficiency</p>
          <p className="text-3xl font-semibold text-orange-900">{efficiency}%</p>
          <p className="text-xs text-orange-600 mt-1">vs conventional</p>
        </Card>
      </div>

      {/* Energy Comparison Chart */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Energy Consumption Comparison</h2>
            <p className="text-sm text-slate-600 mt-1">
              Smart lighting vs conventional systems (Monthly kWh)
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Chart
          </Button>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: "12px" }} />
            <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="conventional" fill="#94a3b8" name="Conventional System" radius={[4, 4, 0, 0]} />
            <Bar dataKey="smart" fill="#10b981" name="Smart Lighting System" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-slate-700">Trees Equivalent</p>
                <p className="text-2xl font-semibold text-green-700">1,230</p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-slate-700">Cars Off Road Equivalent</p>
                <p className="text-2xl font-semibold text-blue-700">16</p>
              </div>
              <div className="text-3xl">🚗</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-slate-700">Households Powered</p>
                <p className="text-2xl font-semibold text-purple-700">89</p>
              </div>
              <div className="text-3xl">🏠</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">System Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-700">Average Uptime</p>
                <p className="font-semibold text-slate-900">98.2%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "98.2%" }}></div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-700">Peak Load Reduction</p>
                <p className="font-semibold text-slate-900">41%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "41%" }}></div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-700">Response Efficiency</p>
                <p className="font-semibold text-slate-900">95.7%</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "95.7%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Download Report */}
      <Card className="p-6 mt-6 bg-slate-50 border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">Monthly Consolidated Report</h3>
            <p className="text-sm text-slate-600 mt-1">
              Download comprehensive energy and performance analytics
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </Card>
    </div>
  );
}
