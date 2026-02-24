// Simplified India highway map with zones
export default function HighwayMap() {
  const zones = [
    // North
    { id: "NH-1", x: 180, y: 80, status: "active" },
    { id: "NH-44", x: 220, y: 120, status: "warning" },
    { id: "NH-48", x: 140, y: 200, status: "active" },
    
    // Central
    { id: "NH-2", x: 280, y: 180, status: "active" },
    { id: "NH-3", x: 200, y: 240, status: "fault" },
    { id: "NH-47", x: 160, y: 320, status: "active" },
    
    // South
    { id: "NH-7", x: 200, y: 380, status: "active" },
    { id: "NH-16", x: 280, y: 420, status: "active" },
    { id: "NH-66", x: 140, y: 440, status: "warning" },
    
    // East
    { id: "NH-31", x: 340, y: 200, status: "active" },
    { id: "NH-6", x: 380, y: 280, status: "active" },
    
    // West
    { id: "NH-8", x: 100, y: 260, status: "active" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "fault":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="relative bg-slate-50 rounded-lg border border-slate-200" style={{ height: "500px" }}>
      <svg
        viewBox="0 0 500 520"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))" }}
      >
        {/* India outline - simplified */}
        <path
          d="M 200 50 
             L 240 60 L 280 80 L 320 100 L 340 120
             L 360 160 L 380 200 L 390 240 L 380 280
             L 360 320 L 340 360 L 300 400 L 260 440
             L 220 460 L 180 470 L 140 460 L 110 440
             L 90 400 L 80 360 L 90 320 L 100 280
             L 110 240 L 120 200 L 140 160 L 160 120
             L 180 80 Z"
          fill="white"
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        {/* Highway routes - simplified connections */}
        <g stroke="#e2e8f0" strokeWidth="2" fill="none" opacity="0.6">
          <line x1="180" y1="80" x2="220" y2="120" />
          <line x1="220" y1="120" x2="280" y2="180" />
          <line x1="140" y1="200" x2="200" y2="240" />
          <line x1="200" y1="240" x2="280" y2="180" />
          <line x1="280" y1="180" x2="340" y2="200" />
          <line x1="200" y1="240" x2="160" y2="320" />
          <line x1="160" y1="320" x2="200" y2="380" />
          <line x1="200" y1="380" x2="280" y2="420" />
          <line x1="100" y1="260" x2="200" y2="240" />
          <line x1="340" y1="200" x2="380" y2="280" />
        </g>

        {/* Zone markers */}
        {zones.map((zone) => (
          <g key={zone.id}>
            <circle
              cx={zone.x}
              cy={zone.y}
              r="12"
              fill={getStatusColor(zone.status)}
              opacity="0.2"
            />
            <circle
              cx={zone.x}
              cy={zone.y}
              r="6"
              fill={getStatusColor(zone.status)}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={zone.x}
              y={zone.y + 24}
              textAnchor="middle"
              className="text-[10px] fill-slate-700"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {zone.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
