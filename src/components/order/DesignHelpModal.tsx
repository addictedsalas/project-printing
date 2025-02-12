
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DesignHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignHelpModal = ({ isOpen, onClose }: DesignHelpModalProps) => {
  const [idea, setIdea] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Design help requested!",
      description: "We'll review your idea and get back to you soon.",
      duration: 5000,
    });
    setIdea("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-navy dark:text-white text-center flex items-center justify-center gap-2">
            <Wand2 className="w-6 h-6" />
            Design Assistance
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Tell us your idea, and our design team will help bring it to life
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe your design idea... (e.g., 'I want a vintage-style logo with a mountain and my company name')"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="min-h-[150px] resize-none"
            required
          />
          <Button 
            type="submit"
            className="w-full bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90"
          >
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
