import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, LogOut } from "lucide-react";
import { mockRequests, getStatusLabel, DocumentRequest, RequestStatus } from "@/lib/mock-data";
import { StatusBadge } from "@/components/RequestCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const STATUS_FILTERS: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending_payment" },
  { label: "Processing", value: "processing" },
  { label: "Ready", value: "ready" },
  { label: "Completed", value: "completed" },
];

const StaffDashboardPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");

  const filtered = mockRequests.filter((r) => {
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesSearch =
      search === "" ||
      r.referenceId.toLowerCase().includes(search.toLowerCase()) ||
      r.documentType.some((d) => d.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/70 text-ui-sm">Staff Portal</p>
            <h1 className="text-2xl font-semibold text-primary-foreground">RegisTrack</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {STATUS_FILTERS.filter((s) => s.value !== "all").map((s) => {
            const count = mockRequests.filter((r) => r.status === s.value).length;
            return (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card
                  className="p-3 text-center cursor-pointer hover:shadow-card-active transition-shadow"
                  onClick={() => setStatusFilter(s.value as RequestStatus)}
                >
                  <p className="text-display font-semibold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by reference or document..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-card"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value as RequestStatus | "all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === s.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Request list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No requests found.</p>
            </div>
          ) : (
            filtered.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:shadow-card-active transition-shadow"
                  onClick={() => navigate(`/staff/request/${req.id}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-body font-medium text-foreground font-mono">
                        {req.referenceId}
                      </p>
                      <p className="text-xs text-muted-foreground">Juan Dela Cruz</p>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-ui-sm text-muted-foreground">
                    {req.documentType.join(", ")} · ₱{req.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(req.createdAt).toLocaleDateString("en-PH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardPage;
