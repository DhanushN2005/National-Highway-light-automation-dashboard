import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { CloudFog, CloudRain, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Override {
  id: string;
  mode: string;
  zones: string[];
  activatedAt: string;
  activatedBy: string;
}

const availableZones = [
  "NH-1-KM-045",
  "NH-44-KM-150",
  "NH-2-KM-089",
  "NH-8-KM-201",
  "NH-3-KM-112",
  "NH-48-KM-067",
  "NH-16-KM-234",
  "NH-7-KM-156",
];

export default function EmergencyOverride() {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [activeOverrides, setActiveOverrides] = useState<Override[]>([
    {
      id: "1",
      mode: "Fog Mode",
      zones: ["NH-1-KM-045", "NH-2-KM-089"],
      activatedAt: "2026-02-10 06:30 AM",
      activatedBy: "Officer Kumar",
    },
  ]);

  const toggleZone = (zone: string) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const activateMode = (mode: string) => {
    if (selectedZones.length === 0) {
      alert("Please select at least one zone");
      return;
    }

    const newOverride: Override = {
      id: Date.now().toString(),
      mode,
      zones: [...selectedZones],
      activatedAt: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      activatedBy: "Control Room Officer",
    };

    setActiveOverrides((prev) => [...prev, newOverride]);
    setSelectedZones([]);
  };

  const deactivateOverride = (id: string) => {
    setActiveOverrides((prev) => prev.filter((override) => override.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Emergency & Weather Override</h1>
        <p className="text-slate-600 mt-1">
          Quick controls for adverse conditions and emergencies
        </p>
      </div>

      {/* Active Overrides Banner */}
      {activeOverrides.length > 0 && (
        <Card className="p-4 mb-6 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-900">
                {activeOverrides.length} Active Override{activeOverrides.length > 1 ? "s" : ""}
              </p>
              <p className="text-sm text-orange-700">
                {activeOverrides.map((o) => o.mode).join(", ")} currently active
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Emergency Mode Controls</h2>

          <div className="space-y-4 mb-8">
            <Button
              onClick={() => activateMode("Fog Mode")}
              className="w-full h-20 bg-slate-700 hover:bg-slate-800 text-white"
              disabled={selectedZones.length === 0}
            >
              <CloudFog className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Fog Mode</div>
                <div className="text-xs opacity-90">Set brightness to 100%, increase visibility</div>
              </div>
            </Button>

            <Button
              onClick={() => activateMode("Heavy Rain Mode")}
              className="w-full h-20 bg-blue-700 hover:bg-blue-800 text-white"
              disabled={selectedZones.length === 0}
            >
              <CloudRain className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Heavy Rain Mode</div>
                <div className="text-xs opacity-90">Enhanced lighting for wet conditions</div>
              </div>
            </Button>

            <Button
              onClick={() => activateMode("Accident / Emergency Mode")}
              className="w-full h-20 bg-red-600 hover:bg-red-700 text-white"
              disabled={selectedZones.length === 0}
            >
              <AlertTriangle className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="font-semibold">Accident / Emergency Mode</div>
                <div className="text-xs opacity-90">Maximum illumination for incident response</div>
              </div>
            </Button>
          </div>

          {/* Zone Selection */}
          <div>
            <h3 className="font-medium text-slate-900 mb-4">
              Select Zones ({selectedZones.length} selected)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {availableZones.map((zone) => (
                <div
                  key={zone}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <Checkbox
                    id={zone}
                    checked={selectedZones.includes(zone)}
                    onCheckedChange={() => toggleZone(zone)}
                  />
                  <label
                    htmlFor={zone}
                    className="text-sm text-slate-700 cursor-pointer flex-1"
                  >
                    {zone}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Active Overrides List */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Active Override Status</h2>

          {activeOverrides.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-slate-600">No active overrides</p>
              <p className="text-sm text-slate-500 mt-1">All zones operating normally</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOverrides.map((override) => (
                <div
                  key={override.id}
                  className="p-4 rounded-lg border-2 border-orange-200 bg-orange-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{override.mode}</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Activated: {override.activatedAt}
                      </p>
                      <p className="text-xs text-slate-600">By: {override.activatedBy}</p>
                    </div>
                    <Badge variant="destructive">Active</Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-slate-600 mb-2">Affected Zones:</p>
                    <div className="flex flex-wrap gap-1">
                      {override.zones.map((zone) => (
                        <Badge key={zone} variant="outline" className="text-xs">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deactivateOverride(override.id)}
                    className="w-full"
                  >
                    Deactivate Override
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
