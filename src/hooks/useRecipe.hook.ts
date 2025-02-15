/* eslint-disable @typescript-eslint/no-explicit-any */


    
  import { createRecipe, getAllPublicRecipes } from "@/services/RecipeApi";
import { useMutation, useQuery } from "@tanstack/react-query";
  import { FieldValues } from "react-hook-form";
  import { toast } from "react-toastify";
  
  export const useCreateRecipe = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["RECIPE_CREATE"],
      mutationFn: async (userData) => await createRecipe(userData),
      onSuccess: (data) => {
        if (data) {
          if (data.success) {
            toast.success(data.message);
          }
          if (!data.success) {
            console.log(data.errorSources);
  
            data.errorSources.map((e: { message: string }) =>
              toast.error(e.message)
            );
          }
        } else {
          toast.error("Something went wrong");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };


 export const useGetAllPublicRecipes = (query:any) => {
    return useQuery<any, Error>({
      queryKey: ["GET_ALL_PUBLIC_RECIPES", query],
      queryFn: async () => await getAllPublicRecipes(query),

    });
  };
  
 
  