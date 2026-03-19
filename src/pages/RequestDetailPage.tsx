import { motion } from "framer-motion";
import { ArrowLeft, FileText, Calendar, DollarSign, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockRequests, getStatusLabel, getStatusStep } from "@/lib/mock-data";
import { StatusBadge } from "@/components/RequestCard";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";

const steps = ["Pending Payment", "Processing", "Ready to Claim", "Completed"];

const RequestDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const request = mockRequests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Request not found.</p>
      </div>
    );
  }

  const currentStep = getStatusStep(request.status);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-md mx-auto flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-body font-semibold text-foreground">
              {request.referenceId}
            </h1>
          </div>
          <div className="ml-auto">
            <StatusBadge status={request.status} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <Card className="p-5">
            <h3 className="text-ui-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
              Status Tracker
            </h3>
            <div className="space-y-0">
              {steps.map((stepLabel, i) => {
                const isActive = i <= currentStep;
                const isCurrent = i === currentStep;
                return (
                  <div key={stepLabel} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                          isActive
                            ? "bg-primary border-primary"
                            : "bg-background border-border"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                      />
                      {i < steps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            i < currentStep ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p
                        className={`text-ui-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {stepLabel}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Current status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
          <Card className="p-5 space-y-4">
            <h3 className="text-ui-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Request Details
            </h3>
            <DetailRow
              icon={FileText}
              label="Documents"
              value={request.documentType.join(", ")}
            />
            <DetailRow
              icon={MapPin}
              label="Purpose"
              value={request.purpose}
            />
            <DetailRow
              icon={DollarSign}
              label="Amount"
              value={`₱${request.amount.toFixed(2)}`}
              mono
            />
            <DetailRow
              icon={Calendar}
              label="Submitted"
              value={new Date(request.createdAt).toLocaleDateString("en-PH", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            />
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className="h-8 w-8 rounded-[8px] bg-muted flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-ui-sm font-medium text-foreground ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  </div>
);

export default RequestDetailPage;
