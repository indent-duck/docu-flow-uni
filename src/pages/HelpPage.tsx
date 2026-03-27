import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const faqs = [
  {
    question: "How do I submit a document request?",
    answer: "Tap the '+' button on the dashboard or go to New Request. Fill in the required details and submit. You'll receive a confirmation once it's received.",
  },
  {
    question: "How long does processing take?",
    answer: "Processing times vary by document type. Typically 3–5 business days for most requests. You'll be notified when your document is ready.",
  },
  {
    question: "How do I track my request?",
    answer: "All your requests are visible on the Dashboard. Tap any request to see its current status and history.",
  },
  {
    question: "Can I cancel a request?",
    answer: "You can cancel a request while it's still in 'Pending' status. Open the request detail and tap 'Cancel Request'.",
  },
  {
    question: "Who do I contact for urgent concerns?",
    answer: "For urgent matters, visit the Registrar's Office directly or email registrar@university.edu.ph.",
  },
];

const HelpPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pt-12 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="text-primary-foreground/80 hover:text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-primary-foreground">Help & Support</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.2, 0, 0, 1] }}
        >
          <p className="text-sm text-muted-foreground mb-4">Frequently asked questions</p>
          <Card className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="flex items-center gap-3 w-full p-4 hover:bg-muted/50 transition-colors text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-body text-foreground flex-1">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
          <Card className="p-4">
            <h2 className="font-medium text-foreground mb-1">Contact the Registrar</h2>
            <p className="text-sm text-muted-foreground">registrar@university.edu.ph</p>
            <p className="text-sm text-muted-foreground">Mon–Fri, 8:00 AM – 5:00 PM</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
