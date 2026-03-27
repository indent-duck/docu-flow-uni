import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { mockRequests } from "@/lib/mock-data";
import { RequestCard } from "@/components/RequestCard";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const activeRequests = mockRequests.filter(
    (r) => r.status !== "completed"
  );
  const pastRequests = mockRequests.filter((r) => r.status === "completed");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto">
          <p className="text-primary-foreground/70 text-ui-sm">Good morning,</p>
          <h1 className="text-2xl font-semibold text-primary-foreground">Juan Dela Cruz</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Quick action — separate from header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
          className="mb-6"
        >
          <Button
            size="lg"
            className="w-full shadow-card-active"
            onClick={() => navigate("/new-request")}
          >
            <Plus className="h-5 w-5" />
            New Document Request
          </Button>
        </motion.div>

        {/* Active Requests */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-ui-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Active Requests
            </h2>
            <span className="text-ui-sm font-mono text-muted-foreground">
              {activeRequests.length}
            </span>
          </div>
          <div className="space-y-3">
            {activeRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-body">No active requests</p>
                <p className="text-muted-foreground text-ui-sm mt-1">
                  Tap the button above to get started.
                </p>
              </div>
            ) : (
              activeRequests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, ease: [0.2, 0, 0, 1] }}
                >
                  <RequestCard request={req} />
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Past Requests */}
        {pastRequests.length > 0 && (
          <section>
            <h2 className="text-ui-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Completed
            </h2>
            <div className="space-y-3">
              {pastRequests.map((req, i) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, ease: [0.2, 0, 0, 1] }}
                >
                  <RequestCard request={req} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardPage;
