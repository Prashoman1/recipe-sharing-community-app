import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const imageUploadImageBB = async (image: any) => {
  const imageResponse = await fetch(
    `${process.env.NEXT_PUBLIC_IMAGE_HOST_API}`,
    {
      method: "POST",
      body: image,
    }
  );
  const imageData = await imageResponse.json();
  if (imageData.success) {
    return imageData.data.url;
  } else {
    toast.error("An error occurred while uploading image");
    return;
  }
};
