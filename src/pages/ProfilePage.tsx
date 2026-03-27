import { motion } from "framer-motion";
import { LogOut, ChevronRight, User, Shield, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-primary px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary-foreground">JD</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-primary-foreground">Juan Dela Cruz</h1>
            <p className="text-ui-sm text-primary-foreground/70 font-mono">2021-00001</p>
            <p className="text-xs text-primary-foreground/60">juan@university.edu.ph</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <Card className="divide-y divide-border">
            {[
              { icon: User, label: "Edit Profile", path: "/profile/edit" },
              { icon: Shield, label: "Security", path: "/profile/security" },
              { icon: HelpCircle, label: "Help & Support", path: "/profile/help" },
            ].map(({ icon: Icon, label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 w-full p-4 hover:bg-muted/50 transition-colors"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-body text-foreground flex-1 text-left">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
