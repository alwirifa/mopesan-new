"use client"

import React, { useCallback, useEffect, useState } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: React.ReactElement;
  body?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, body, title, disabled }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
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
    
    "
      >
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
      "
        >
          {/*content*/}
          <div className={`
        translate
        duration-300
        h-full
        ${showModal ? 'translate-y-0' : 'translate-y-full'}
        ${showModal ? 'opacity-100' : 'opacity-0'}
      `}>
            <div className="translateh-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              {/*header*/}
              <div className="flex items-center p-6 rounded-t justify-start relative">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute right-4"
                  onClick={handleClose}
                >
                  <div  className="h-10 w-10 hover:bg-zinc-100 rounded-full p-2 cursor-pointer">
                    <img src="/icons/close.svg" alt="close" className="h-full w-full" />
                  </div>
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/*body*/}
              <div className="relative px-6 pb-6 flex-auto">
                {body}
              </div>
              {/*footer*/}
              {/* <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                flex 
                flex-row 
                items-center 
                gap-4 
                w-full
              "
                >

                </div>
                footer
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
