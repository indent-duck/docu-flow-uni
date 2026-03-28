import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-primary-foreground">About</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This prototype is made by{" "}
              <span className="text-foreground font-medium">Lee Johnrich H. Ramirez</span> and{" "}
              <span className="text-foreground font-medium">John Rheal P. Serdon</span> in compliance to{" "}
              <span className="text-foreground font-medium">ITEC 101 – Human Computer Interaction 2</span>.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
