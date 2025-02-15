/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RecipeForm from "@/app/(withOutLayout)/(dashboard)/_components/AddRecipe/AddRecipe";
import Modal from "../Modal/Modal";
import { useRef } from "react";

interface CreateRecipeModalProps {
  modalRef: any;
  stateProps: any;
}

const CreateRecipeModal = ({
  modalRef,
  stateProps,
}: CreateRecipeModalProps) => {
  const formModelRef = useRef(null);
  return (
    <>
      <Modal
        modalRef={modalRef}
           formRef={formModelRef}
      >
        <RecipeForm state={stateProps} modalRef={modalRef} formRef={formModelRef}/>
      </Modal>
    </>
  );
};

export default CreateRecipeModal;
