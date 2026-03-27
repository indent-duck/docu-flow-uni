import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, FileText, CreditCard, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "status" | "payment" | "ready";
  requestId?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Payment Verified",
    message: "Your payment for RT-8842 (Transcript of Records) has been verified. Your request is now being processed.",
    time: "2 hours ago",
    read: false,
    type: "payment",
    requestId: "1",
  },
  {
    id: "2",
    title: "Ready to Claim",
    message: "Your Good Moral Certificate (RT-8801) is ready for pick-up at the Registrar's Office, Window 3.",
    time: "1 day ago",
    read: false,
    type: "ready",
    requestId: "2",
  },
  {
    id: "3",
    title: "Request Completed",
    message: "Your certificates (RT-8790) have been claimed successfully. Thank you for using RegisTrack!",
    time: "5 days ago",
    read: true,
    type: "status",
    requestId: "3",
  },
  {
    id: "4",
    title: "New Feature: Track in Real-time",
    message: "You can now track your document requests in real-time. Tap any request to see the full status timeline.",
    time: "1 week ago",
    read: true,
    type: "status",
  },
];

const ICON_MAP = {
  status: FileText,
  payment: CreditCard,
  ready: Package,
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(notifications.filter((n) => n.read).map((n) => n.id))
  );

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !readIds.has(n.id);
    return true;
  });

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  const handleTap = (notif: Notification) => {
    setReadIds((prev) => new Set([...prev, notif.id]));
    if (notif.requestId) {
      navigate(`/request/${notif.requestId}`);
    }
  };

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <h1 className="text-body font-semibold text-foreground">Updates</h1>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary font-medium hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? "All" : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-body text-muted-foreground">No updates yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              You're all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((notif, i) => {
              const isRead = readIds.has(notif.id);
              const Icon = ICON_MAP[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
                >
                  <Card
                    className={`p-4 cursor-pointer hover:shadow-card-active transition-all ${
                      !isRead ? "border-l-2 border-l-primary bg-primary/[0.02]" : ""
                    }`}
                    onClick={() => handleTap(notif)}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                          notif.type === "ready"
                            ? "bg-status-ready/10"
                            : notif.type === "payment"
                            ? "bg-status-processing/10"
                            : "bg-primary/10"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            notif.type === "ready"
                              ? "text-status-ready"
                              : notif.type === "payment"
                              ? "text-status-processing"
                              : "text-primary"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-ui-sm font-medium text-foreground ${
                              !isRead ? "font-semibold" : ""
                            }`}
                          >
                            {notif.title}
                          </p>
                          {!isRead && (
                            <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{notif.time}</span>
                          {notif.requestId && (
                            <span className="ml-2 text-primary font-medium">
                              View request →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
