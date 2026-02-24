import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Power, MapPin, Activity } from "lucide-react";

interface Zone {
  id: string;
  highway: string;
  status: "active" | "warning" | "fault";
  brightness: number;
  profile: "peak" | "night" | "low-traffic";
  healthScore: number;
  location: string;
}

const mockZones: Zone[] = [
  {
    id: "NH-1-KM-045",
    highway: "NH-1",
    status: "active",
    brightness: 80,
    profile: "peak",
    healthScore: 98,
    location: "Delhi - Panipat",
  },
  {
    id: "NH-44-KM-150",
    highway: "NH-44",
    status: "warning",
    brightness: 65,
    profile: "night",
    healthScore: 72,
    location: "Srinagar - Kanyakumari",
  },
  {
    id: "NH-2-KM-089",
    highway: "NH-2",
    status: "active",
    brightness: 75,
    profile: "peak",
    healthScore: 95,
    location: "Delhi - Kolkata",
  },
  {
    id: "NH-8-KM-201",
    highway: "NH-8",
    status: "active",
    brightness: 70,
    profile: "night",
    healthScore: 89,
    location: "Delhi - Mumbai",
  },
  {
    id: "NH-3-KM-112",
    highway: "NH-3",
    status: "fault",
    brightness: 0,
    profile: "low-traffic",
    healthScore: 45,
    location: "Agra - Mumbai",
  },
  {
    id: "NH-48-KM-067",
    highway: "NH-48",
    status: "active",
    brightness: 85,
    profile: "peak",
    healthScore: 96,
    location: "Delhi - Chennai",
  },
  {
    id: "NH-16-KM-234",
    highway: "NH-16",
    status: "active",
    brightness: 60,
    profile: "low-traffic",
    healthScore: 91,
    location: "Nizamabad - Chennai",
  },
  {
    id: "NH-7-KM-156",
    highway: "NH-7",
    status: "warning",
    brightness: 55,
    profile: "night",
    healthScore: 78,
    location: "Varanasi - Kanyakumari",
  },
];

export default function ZoneControl() {
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleBrightnessChange = (zoneId: string, brightness: number) => {
    setZones((prev) =>
      prev.map((zone) => (zone.id === zoneId ? { ...zone, brightness } : zone))
    );
  };

  const handleProfileChange = (zoneId: string, profile: Zone["profile"]) => {
    setZones((prev) =>
      prev.map((zone) => (zone.id === zoneId ? { ...zone, profile } : zone))
    );
  };

  const toggleZonePower = (zoneId: string) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === zoneId
          ? {
              ...zone,
              brightness: zone.brightness === 0 ? 75 : 0,
              status: zone.brightness === 0 ? "active" : "fault",
            }
          : zone
      )
    );
  };

  const getStatusColor = (status: Zone["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "fault":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Zone Control</h1>
        <p className="text-slate-600 mt-1">Manage lighting zones across national highways</p>
      </div>

      <div className="space-y-4">
        {zones.map((zone) => (
          <Card
            key={zone.id}
            className={`p-6 transition-shadow ${
              selectedZone === zone.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Zone Info */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <h3 className="font-semibold text-slate-900">{zone.id}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2">{zone.location}</p>
                <Badge variant="outline" className={`${getStatusColor(zone.status)}`}>
                  {zone.status.toUpperCase()}
                </Badge>
              </div>

              {/* Brightness Control */}
              <div className="lg:col-span-3">
                <label className="text-sm text-slate-600 mb-2 block">
                  Brightness Level: {zone.brightness}%
                </label>
                <Slider
                  value={[zone.brightness]}
                  max={100}
                  step={5}
                  onValueChange={(value) => handleBrightnessChange(zone.id, value[0])}
                  disabled={zone.status === "fault"}
                  className="w-full"
                />
              </div>

              {/* Profile Selector */}
              <div className="lg:col-span-2">
                <label className="text-sm text-slate-600 mb-2 block">Lighting Profile</label>
                <Select
                  value={zone.profile}
                  onValueChange={(value) =>
                    handleProfileChange(zone.id, value as Zone["profile"])
                  }
                  disabled={zone.status === "fault"}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peak">Peak Hours</SelectItem>
                    <SelectItem value="night">Night Mode</SelectItem>
                    <SelectItem value="low-traffic">Low Traffic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Health Score */}
              <div className="lg:col-span-2 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600">Health Score</span>
                </div>
                <p className={`text-2xl font-semibold ${getHealthColor(zone.healthScore)}`}>
                  {zone.healthScore}%
                </p>
              </div>

              {/* Power Control */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <Button
                  variant={zone.brightness === 0 ? "default" : "destructive"}
                  onClick={() => toggleZonePower(zone.id)}
                  className="w-full"
                >
                  <Power className="w-4 h-4 mr-2" />
                  {zone.brightness === 0 ? "Turn ON" : "Turn OFF"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
