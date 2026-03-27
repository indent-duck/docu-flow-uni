import { motion } from "framer-motion";
import { DocumentRequest, getStatusLabel, getStatusStep } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatusBadgeProps {
  status: DocumentRequest["status"];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variantMap: Record<string, "pending" | "processing" | "ready" | "completed"> = {
    pending_payment: "pending",
    processing: "processing",
    ready: "ready",
    completed: "completed",
  };
  return <Badge variant={variantMap[status]}>{getStatusLabel(status)}</Badge>;
};

interface StatusProgressProps {
  status: DocumentRequest["status"];
}

export const StatusProgress = ({ status }: StatusProgressProps) => {
  const step = getStatusStep(status);
  const progress = step === 0 ? 10 : step === 1 ? 45 : step === 2 ? 80 : 100;
  const colorClass =
    status === "pending_payment"
      ? "bg-status-pending"
      : status === "processing"
      ? "bg-status-processing"
      : status === "ready"
      ? "bg-status-ready"
      : "bg-muted-foreground";

  return (
    <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className={`absolute h-full rounded-full ${colorClass}`}
      />
    </div>
  );
};

interface RequestCardProps {
  request: DocumentRequest;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const navigate = useNavigate();
  const timeAgo = getTimeAgo(request.updatedAt);

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-card-active transition-shadow duration-200"
      onClick={() => navigate(`/request/${request.id}`, { state: { request } })}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[10px] bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-ui-sm font-medium text-foreground">
              {request.documentType.join(", ")}
            </p>
            <p className="text-xs text-muted-foreground font-mono">{request.referenceId}</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
      </div>
      <StatusProgress status={request.status} />
      <div className="flex items-center justify-between mt-3">
        <StatusBadge status={request.status} />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{timeAgo}</span>
        </div>
      </div>
    </Card>
  );
};

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
