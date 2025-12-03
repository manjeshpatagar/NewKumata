import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Check, Calendar } from 'lucide-react';

interface AdminApproveAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ad: any;
  onApprove: () => void;
}

export function AdminApproveAdDialog({ open, onOpenChange, ad, onApprove }: AdminApproveAdDialogProps) {
  const handleApprove = () => {
    onApprove();
    onOpenChange(false);
  };

  const getDurationText = (dur?: string) => {
    const map: Record<string, string> = {
      '1day': '1 Day',
      '3days': '3 Days',
      '1week': '1 Week',
      '1month': '1 Month',
    };
    return dur ? map[dur] || dur : 'Not specified';
  };

  if (!ad) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            Approve Advertisement
          </DialogTitle>
          <DialogDescription>
            Confirm approval for this advertisement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Ad Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Ad Title:</span>
              <p className="font-medium dark:text-white">{ad.title}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Owner:</span>
              <p className="font-medium dark:text-white">{ad.owner}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
              <p className="font-medium dark:text-white">{ad.category}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
              <p className="font-medium text-purple-600 dark:text-purple-400">{getDurationText(ad.duration)}</p>
            </div>
          </div>

          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-700 dark:text-green-400">
              ✅ After approval, the ad will be live immediately and will expire after the selected duration.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleApprove}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve Advertisement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
