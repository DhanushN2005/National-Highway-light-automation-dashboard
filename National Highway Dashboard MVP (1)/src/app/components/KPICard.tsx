import { LucideIcon } from "lucide-react";
import { Card } from "../components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "blue" | "green" | "red" | "emerald";
  subtitle?: string;
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export default function KPICard({ title, value, icon: Icon, color, subtitle }: KPICardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-2">{title}</p>
          <p className="text-3xl font-semibold text-slate-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
