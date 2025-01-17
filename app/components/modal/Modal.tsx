"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  body,
  title,
  disabled,
  actionLabel,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  cancelLabel,
  onCancel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [secondaryAction, disabled]);

  const handleCancel = useCallback(() => {
    if (disabled || !onCancel) return;
    onCancel();
  }, [onCancel, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 h-full overflow-y-auto">
      <div className={onCancel ? "relative md:w-4/6 lg:w-1/3 xl:w-1/5 my-6 mx-auto  lg:h-auto md:h-auto" : "relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"}>
        <div
          className={`translate duration-300 h-full ${
            showModal ? "translate-y-0" : "translate-y-full"
          } ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center p-6 rounded-t justify-start relative">
              <button
                className="p-1 border-0 hover:opacity-70 transition absolute right-4"
                onClick={handleClose}
              >
                <div className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
                  <img
                    src="/icons/close.svg"
                    alt="close"
                    className="h-full w-full"
                  />
                </div>
              </button>
              <div className="text-[32px] font-semibold">{title}</div>
            </div>
            <div className="relative px-6 pb-6 flex-auto">{body}</div>

            <div
              className={
                onCancel
                  ? "flex items-center justify-between gap-4 px-6 pb-6"
                  : "flex items-center justify-end gap-4 px-6 pb-6"
              }
            >
              {onCancel && cancelLabel && (
                <button
                  disabled={disabled}
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded-md border-primary text-primary capitalize font-semibold text-sm"
                  type="button"
                >
                  {cancelLabel}
                </button>
              )}

              {secondaryAction && secondaryActionLabel && (
                <button
                  disabled={disabled}
                  onClick={handleSecondaryAction}
                  className="px-4 py-2 border rounded-md border-primary text-primary capitalize font-semibold text-sm"
                  type="button"
                >
                  {secondaryActionLabel}
                </button>
              )}

              <button
                disabled={disabled}
                onClick={handleSubmit}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${
                  disabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
              >
                {actionLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
