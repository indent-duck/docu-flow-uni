import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Juan Dela Cruz");
  const [email, setEmail] = useState("juan@university.edu.ph");
  const [studentId] = useState("2021-00001");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-primary-foreground">Edit Profile</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-3xl font-semibold text-primary">JD</span>
            </div>
          </div>

          <Card className="p-4">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 rounded-[8px] bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">Student ID</label>
                <Input
                  value={studentId}
                  disabled
                  className="h-12 rounded-[8px] bg-muted font-mono text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Student ID cannot be changed.</p>
              </div>
              <div className="space-y-2">
                <label className="text-ui-sm font-medium text-foreground">University Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-[8px] bg-background"
                />
              </div>
              <Button type="submit" className="w-full mt-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfilePage;
