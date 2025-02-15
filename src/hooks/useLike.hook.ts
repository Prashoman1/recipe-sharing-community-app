/* eslint-disable @typescript-eslint/no-explicit-any */

import { createLikeByRecipe } from "@/services/likeApi";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
  import { toast } from "react-toastify";
  
  export const useCreateLike = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, any>({
      mutationKey: ["RECIPE_LIKE"],
      mutationFn: async (recipeId) => await createLikeByRecipe(recipeId),
      onSuccess: (data, recipeId) => {
        if (data?.success) {
          toast.success(data.message);
  
          // ✅ Step 1: Update the cache manually
          queryClient.setQueryData(["GET_ALL_PUBLIC_RECIPES"], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              recipes: oldData.recipes.map((recipe: any) =>
                recipe.id === recipeId
                  ? { ...recipe, likes: (recipe.likes || 0) + 1 } // Increase like count locally
                  : recipe
              ),
            };
          });
  
          // ✅ Step 2: Ensure fresh data by invalidating & refetching
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_PUBLIC_RECIPES"] });
          queryClient.refetchQueries({ queryKey: ["GET_ALL_PUBLIC_RECIPES"] });
  
        } else {
          console.log(data?.errorSources);
          data?.errorSources?.forEach((e: { message: string }) => toast.error(e.message));
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  

//  export const useAllLikes = () => {
//     return useQuery<any, Error>({
//       queryKey: ["GET_ALL_Likes"],
//       queryFn: async () => await getAllPublicRecipes(query),
      
//     });
//   };
  
 
  