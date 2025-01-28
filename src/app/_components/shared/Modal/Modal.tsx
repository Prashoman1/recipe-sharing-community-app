/* eslint-disable @typescript-eslint/no-explicit-any */
import { modelClose } from "@/helpers";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDialogElement>;
  formRef?: any;
}
const Modal = ({ children, modalRef, formRef = null }: ModalProps) => {
  return (
    <>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <button
            onClick={() => {
              if (modalRef?.current) {
                modelClose(modalRef, formRef);
              }
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div>{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
