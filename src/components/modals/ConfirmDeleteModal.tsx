import { Button } from "../common/Button";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function ConfirmDeleteModal({
  onClose,
  onConfirm,
  isDeleting,
}: ConfirmDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">
          Delete Task?
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="secondary"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}