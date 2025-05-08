import React from "react";

interface ConfirmDialogProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg p-6 shadow-lg max-w-sm w-full border border-border">
        <h3 className="text-lg font-semibold text-textSecondary mb-2">{title}</h3>
        {description && <p className="text-sm text-midGray mb-4">{description}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-muted text-darkGray hover:bg-lightGray transition"
          >
            Avbryt
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-accent text-white hover:bg-secondary transition"
          >
            Slett
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
