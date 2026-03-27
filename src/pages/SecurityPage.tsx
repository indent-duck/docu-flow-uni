import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SecurityPage = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-primary-foreground">Security</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-medium text-foreground">Change Password</h2>
            </div>

            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                Password updated successfully.
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">Current Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-12 rounded-[8px] bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 rounded-[8px] bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">Confirm New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-[8px] bg-background"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                Update Password
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityPage;
