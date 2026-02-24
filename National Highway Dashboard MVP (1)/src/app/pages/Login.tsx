import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"officer" | "engineer">("officer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">NHAI Smart Lighting</h1>
          <p className="text-sm text-slate-600 mt-2">National Highway Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label>Select Role</Label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setRole("officer")}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  role === "officer"
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                Control Room Officer
              </button>
              <button
                type="button"
                onClick={() => setRole("engineer")}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  role === "engineer"
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                Highway Engineer
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs text-center text-slate-500">
            Ministry of Road Transport & Highways, Government of India
          </p>
        </div>
      </Card>
    </div>
  );
}
