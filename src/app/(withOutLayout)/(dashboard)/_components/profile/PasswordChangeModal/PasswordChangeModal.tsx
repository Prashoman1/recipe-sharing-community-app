/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FieldValues } from "react-hook-form";
import Modal from "@/app/_components/shared/Modal/Modal";
import { useChangePassword } from "@/hooks/useAuth.hook";
import { useEffect } from "react";

interface PasswordModelProps {
  modalRef: any;
  formRef: any;
}

const PasswordChangeModal = ({ modalRef, formRef }: PasswordModelProps) => {
  const {
    mutate: passwordChangeHook,
    isPending,
    data,
    isSuccess,
  } = useChangePassword();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // Watch the values of "new-password" and "confirm-password"
  const newPassword = watch("new-password");
  const confirmPassword = watch("confirm-password");

  const changePasswordSubmit = (data: FieldValues) => {
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    const updatedInfo = {
      oldPassword: data["old-password"],
      newPassword: data["new-password"],
    };
    passwordChangeHook(updatedInfo);
  };

  useEffect(() => {
    if (!isPending && isSuccess && data?.success) {
      modalRef.current?.close();
      formRef.current?.reset();
    }
  }, [isPending, isSuccess, data?.success]);

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form
            onSubmit={handleSubmit(changePasswordSubmit)}
            className="space-y-4"
            ref={formRef}
          >
            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-2"
                htmlFor="old-password"
              >
                Old Password
              </label>
              <input
                id="old-password"
                type="password"
                {...register("old-password", {
                  required: "Old Password is required",
                })}
                placeholder="Enter old password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors["old-password"] && (
                <p className="text-red-500">
                  {errors["old-password"].message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                {...register("new-password", {
                  required: "New Password is required",
                })}
                placeholder="Enter new password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors["new-password"] && (
                <p className="text-red-500">
                  {errors["new-password"].message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-medium mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                {...register("confirm-password", {
                  required: "Confirm Password is required",
                })}
                placeholder="Confirm new password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors["confirm-password"] && (
                <p className="text-red-500">
                  {errors["confirm-password"].message as string}
                </p>
              )}
              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="text-red-500">Passwords do not match</p>
                )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PasswordChangeModal;
