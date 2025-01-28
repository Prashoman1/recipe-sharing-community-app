/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode, JwtPayload } from "jwt-decode";

export const decodedToken = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
};

export const modelClose = (modalRef:any, modalForm?:any) => {
  modalRef.current?.close();
  // console.log("helpers",modalForm.current);
  if (modalForm.current) {
    modalForm.current.reset(); // Reset the form fields
  }
};

//model open
export const modelOpen = (modalRef:any) => {
  if (modalRef.current) modalRef.current.showModal();
}