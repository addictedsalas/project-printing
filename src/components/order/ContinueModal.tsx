
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Printer } from "lucide-react";

interface ContinueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onAddMore: () => void;
}

export const ContinueModal = ({ isOpen, onClose, onContinue, onAddMore }: ContinueModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-navy dark:text-white text-center">
            What would you like to do?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-300">
            Choose whether to continue with print locations or add more garments
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onAddMore}
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-white dark:bg-brand-navy-dark hover:bg-brand-blue-light/20 dark:hover:bg-brand-navy-light/20"
            >
              <ShoppingCart className="w-8 h-8" />
              <span className="text-sm font-medium">Add More Garments</span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={onContinue}
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy"
            >
              <Printer className="w-8 h-8" />
              <span className="text-sm font-medium">Continue to Print Locations</span>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
