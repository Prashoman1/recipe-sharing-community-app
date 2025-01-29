import { getMyRecipeLikes } from "@/services/likeApi";
import RecipeSection from "./_components/RecipeSection/RecipeSection";

export default async function Home() {
  const myLikes = await getMyRecipeLikes().then((res) => res.data).catch((err) => err);

  return (
    <>
      <RecipeSection myLikes={myLikes}/>
    </>
  );
}
