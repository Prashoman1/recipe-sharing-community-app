/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const handleDelete = async (id: string, deleteUrl: any) => {
  if (!id) return;
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const deleteResponse = await deleteUrl(id); 
      // console.log(deleteResponse);
      if (deleteResponse?.success) {
        toast.success(deleteResponse.message);
        return deleteResponse;
      } else {
        toast.error("Failed to delete the item.");
        return deleteResponse;
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting.");
      return error;
    }
  }
};
