import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Upload, QrCode, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DOCUMENT_TYPES, PURPOSES, PRICE_PER_DOCUMENT } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const TOTAL_STEPS = 4;

const NewRequestPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const totalAmount = selectedDocs.length * quantity * PRICE_PER_DOCUMENT;

  const refId = useMemo(
    () => `RT-${Math.floor(Math.random() * 9000 + 1000)}`,
    []
  );

  const toggleDoc = (doc: string) => {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-md mx-auto flex items-center gap-3 px-4 h-14">
          <button onClick={() => (step > 0 ? setStep(step - 1) : navigate(-1))}>
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-body font-semibold text-foreground">New Request</h1>
          <span className="ml-auto text-ui-sm text-muted-foreground font-mono">
            {step + 1}/{TOTAL_STEPS}
          </span>
        </div>
        <div className="h-0.5 bg-muted">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ ease: [0.2, 0, 0, 1] }}
          />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Step 0: Select documents & details */}
        {step === 0 && (
          <StepWrapper keyName="step0">
            <div>
              <h2 className="text-subhead font-semibold text-foreground mb-1">
                Select Documents
              </h2>
              <p className="text-ui-sm text-muted-foreground">
                Choose one or more document types.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DOCUMENT_TYPES.map((doc) => (
                <Card
                  key={doc}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedDocs.includes(doc)
                      ? "ring-2 ring-primary shadow-card-active"
                      : ""
                  }`}
                  onClick={() => toggleDoc(doc)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedDocs.includes(doc) && (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <span className="text-body font-medium text-foreground">{doc}</span>
                    </div>
                    <span className="text-ui-sm text-muted-foreground font-mono">
                      ₱{PRICE_PER_DOCUMENT}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <label className="text-ui-sm font-medium text-foreground mb-2 block">
                Copies per document
              </label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-subhead font-semibold font-mono w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-ui-sm font-medium text-foreground mb-2 block">Purpose</label>
              <div className="grid grid-cols-2 gap-2">
                {PURPOSES.map((p) => (
                  <Card
                    key={p}
                    className={`p-3 cursor-pointer text-center transition-all duration-200 ${
                      purpose === p ? "ring-2 ring-primary shadow-card-active" : ""
                    }`}
                    onClick={() => setPurpose(p)}
                  >
                    <span className="text-ui-sm font-medium text-foreground">{p}</span>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={selectedDocs.length === 0 || !purpose}
              onClick={() => setStep(1)}
            >
              Review Order
              <ArrowRight className="h-4 w-4" />
            </Button>
          </StepWrapper>
        )}

        {/* Step 1: Review summary */}
        {step === 1 && (
          <StepWrapper keyName="step1">
            <div>
              <h2 className="text-subhead font-semibold text-foreground mb-1">
                Review Your Request
              </h2>
              <p className="text-ui-sm text-muted-foreground">
                Please confirm the details before proceeding to payment.
              </p>
            </div>

            <Card className="p-5 space-y-4">
              <SummaryRow label="Documents" value={selectedDocs.join(", ")} />
              <SummaryRow label="Copies per document" value={String(quantity)} mono />
              <SummaryRow label="Purpose" value={purpose} />
              <div className="border-t border-border pt-3">
                <SummaryRow
                  label="Total Amount"
                  value={`₱${totalAmount.toFixed(2)}`}
                  mono
                  bold
                />
              </div>
            </Card>

            <div className="bg-muted/50 rounded-[8px] p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Estimated processing time:</strong>{" "}
                3–5 working days after payment verification. You'll be notified when your documents are ready for claiming.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(0)}>
                Edit
              </Button>
              <Button size="lg" className="flex-1" onClick={() => setStep(2)}>
                Proceed to Payment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </StepWrapper>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <StepWrapper keyName="step2">
            <div>
              <h2 className="text-subhead font-semibold text-foreground mb-1">
                Payment via GCash
              </h2>
              <p className="text-ui-sm text-muted-foreground">
                Scan the QR code or send to the reference number below.
              </p>
            </div>

            <div className="aspect-square w-full max-w-[240px] mx-auto bg-card p-6 rounded-[12px] shadow-card flex items-center justify-center">
              <div className="text-center space-y-3">
                <QrCode className="h-24 w-24 text-primary mx-auto" />
                <p className="text-xs text-muted-foreground">GCash QR Code</p>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-ui-sm text-muted-foreground">Total Amount</p>
              <p className="text-display font-semibold text-primary font-mono">
                ₱{totalAmount.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground font-mono">Ref: 0917-XXX-XXXX</p>
            </div>

            <div className="space-y-2">
              <label className="text-ui-sm font-medium text-foreground">
                Upload Proof of Payment
              </label>
              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-[12px] p-8 cursor-pointer transition-colors ${
                  receiptUploaded
                    ? "border-status-ready bg-status-ready/5"
                    : "border-border hover:border-primary"
                }`}
              >
                <Upload className={`h-8 w-8 mb-2 ${receiptUploaded ? "text-status-ready" : "text-muted-foreground"}`} />
                <p className="text-ui-sm text-muted-foreground">
                  {receiptUploaded ? "Receipt uploaded ✓" : "Tap to upload screenshot"}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => setReceiptUploaded(true)}
                />
              </label>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!receiptUploaded}
              onClick={() => setStep(3)}
            >
              Submit Payment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </StepWrapper>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: [0.2, 0, 0, 1] }}
            className="text-center py-12 space-y-6"
          >
            <div className="h-20 w-20 rounded-full bg-status-ready/15 flex items-center justify-center mx-auto">
              <svg className="h-10 w-10 text-status-ready" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-subhead font-semibold text-foreground mb-2">
                Request Submitted
              </h2>
              <p className="text-body text-muted-foreground">
                Your request has been submitted for verification. We'll notify you once payment is confirmed.
              </p>
            </div>
            <Card className="p-4 text-left space-y-2">
              <SummaryRow label="Reference" value={refId} mono />
              <SummaryRow label="Documents" value={selectedDocs.join(", ")} />
              <SummaryRow label="Copies" value={String(quantity)} mono />
              <SummaryRow label="Purpose" value={purpose} />
              <div className="border-t border-border pt-2">
                <SummaryRow label="Amount Paid" value={`₱${totalAmount.toFixed(2)}`} mono bold />
              </div>
            </Card>
            <div className="bg-muted/50 rounded-[8px] p-3 text-left">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">What's next?</strong> Our staff will verify your payment within 24 hours. You'll receive a notification once processing begins.
              </p>
            </div>
            <Button size="lg" className="w-full" onClick={handleSubmit}>
              Back to Dashboard
            </Button>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

/* Reusable animated step wrapper */
const StepWrapper = ({ keyName, children }: { keyName: string; children: React.ReactNode }) => (
  <motion.div
    key={keyName}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ ease: [0.2, 0, 0, 1] }}
    className="space-y-6"
  >
    {children}
  </motion.div>
);

/* Summary row component */
const SummaryRow = ({
  label,
  value,
  mono,
  bold,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) => (
  <div className="flex justify-between text-ui-sm gap-4">
    <span className={`text-muted-foreground ${bold ? "font-medium" : ""}`}>{label}</span>
    <span
      className={`text-right ${bold ? "font-semibold text-foreground" : "font-medium text-foreground"} ${
        mono ? "font-mono" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default NewRequestPage;
