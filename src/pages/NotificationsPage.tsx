import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";

const notifications = [
  {
    id: "1",
    title: "Request RT-8842 is now Processing",
    message: "Your Transcript of Records request has been verified and is now being processed.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Request RT-8801 is Ready to Claim",
    message: "Your Good Moral Certificate is ready for pick-up at the Registrar's Office.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    title: "Request RT-8790 Completed",
    message: "Your certificates have been claimed. Thank you!",
    time: "5 days ago",
    read: true,
  },
];

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-md mx-auto flex items-center gap-3 px-4 h-14">
          <h1 className="text-body font-semibold text-foreground">Notifications</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-3">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
          >
            <Card className={`p-4 ${!notif.read ? "border-l-2 border-l-primary" : ""}`}>
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {notif.read ? (
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Bell className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ui-sm font-medium text-foreground">{notif.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{notif.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
