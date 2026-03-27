import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const StaffLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/staff/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-[10px] bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold text-subhead text-foreground">RegisTrack</span>
                <p className="text-xs text-muted-foreground">Staff Portal</p>
              </div>
            </div>
            <h1 className="text-display font-semibold text-foreground leading-tight">
              Staff Sign In
            </h1>
            <p className="text-body text-muted-foreground mt-2">
              Access the registrar management dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-ui-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="staff@university.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-[8px] pl-10 bg-card"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-ui-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-[8px] pl-10 bg-card"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2">
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-ui-sm text-muted-foreground mt-6">
            Student?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-primary font-medium hover:underline"
            >
              Go to student login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffLoginPage;
