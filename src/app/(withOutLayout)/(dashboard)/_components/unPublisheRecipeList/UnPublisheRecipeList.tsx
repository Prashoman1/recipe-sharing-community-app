/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RecipeTableList from "@/app/_components/shared/RecipeTableList/RecipeTableList";
import { deleteRecipeApi, getAllUnPublishedRecipes, RecipePublicUnPublishAPi } from "@/services/RecipeApi";
import { handleDelete } from "@/utils/handleDelete";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UnPublishedRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [showPage, setShowPage] = useState(1);

  const fetchRecipes = async () => {
    try {
      const query = {
        page,
        limit,
        // searchTerm
      };
      console.log({ query });

      setLoading(true);
      const recipes = await getAllUnPublishedRecipes(query);
      const { meta } = recipes?.data;
      setRecipes(recipes?.data?.result);
      setTotalPages(meta.total);
      setShowPage(meta.totalPage);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const deleteRecipe = async (id: string) => {
      const res = await handleDelete(id, deleteRecipeApi);
      if (res) {
        fetchRecipes();
      }
    };
  
    const UpdateRecipePublishStatus = async (id: string) => {
      const res = await RecipePublicUnPublishAPi(id);
      console.log(res);
  
      if (res?.success) {
        fetchRecipes();
        toast.success(res.message);
      }
    };

  return (
    <>
      <RecipeTableList
        recipes={recipes}
        loading={loading}
        page={page}
        setPage={setPage}
        limit={limit}
        showPage={showPage}
        deleteRecipe={deleteRecipe}
        UpdateRecipePublishStatus={UpdateRecipePublishStatus}
      />
    </>
  );
};

export default UnPublishedRecipeList;
