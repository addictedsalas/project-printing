
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
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      toast({
        title: "Please select a location",
        description: "Choose where you need help with the design",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Design help requested!",
      description: `We'll help with your design for the ${selectedLocation.split('-').join(' ')}`,
      duration: 5000,
    });
    setIdea("");
    setSelectedLocation("");
  };

  const locations = [
    { value: "left-chest", label: "Left Chest", icon: "👕" },
    { value: "right-chest", label: "Right Chest", icon: "👕" },
    { value: "full-front", label: "Full Front", icon: "👕" },
    { value: "full-back", label: "Full Back", icon: "👕" },
    { value: "left-sleeve", label: "Left Sleeve", icon: "👔" },
    { value: "right-sleeve", label: "Right Sleeve", icon: "👔" },
    { value: "neck-label", label: "Neck Label", icon: "🏷️" },
    { value: "bottom-hem", label: "Bottom Hem", icon: "👕" },
    { value: "hood", label: "Hood", icon: "🧥" },
  ];

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
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select location for this design
            </label>
            <div className="grid grid-cols-3 gap-2">
              {locations.map(({ value, label, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedLocation(value)}
                  className={`p-2 border-2 rounded-md flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedLocation === value
                      ? "border-brand-navy bg-brand-blue-light/20 dark:border-brand-yellow dark:bg-brand-yellow/20"
                      : "border-gray-200 hover:border-brand-blue dark:border-gray-700 dark:hover:border-brand-yellow/50"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-xs mt-1 text-center">{label}</span>
                </button>
              ))}
            </div>
          </div>
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
