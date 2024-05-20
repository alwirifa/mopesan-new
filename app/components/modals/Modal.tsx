"use client"

"use client";

import React, { useCallback, useEffect, useState } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
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
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [secondaryAction, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    // onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-hidden
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/70
      ">
        <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
        ">
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-start relative">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute right-4"
                  onClick={handleClose}
                >
                  <div className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
                    <img src="/icons/close.svg" alt="close" className="h-full w-full" />
                  </div>
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              <div className="relative px-6 pb-6 flex-auto">
                {body}
                {showAlert && (
                  <div className="text-red-500 text-sm mt-2">
                    Please fill in all required fields.
                  </div>
                )}
              </div>
              {onSubmit !==undefined && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                {secondaryAction && secondaryActionLabel && (
                  <button
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    {secondaryActionLabel}
                  </button>
                )}
                <button
                  disabled={disabled}
                  onClick={handleSubmit}
                  className={`rounded-md px-4 py-2 ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
                >
                  {actionLabel}
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
