import TagList from "@/app/_components/shared/TagList/TagList";
import { getAllCategory } from "@/services/CategoryApi";
import { getAllTags } from "@/services/tagsApi";

const page = async () => {
  const res = await getAllTags();
  const catRes = await getAllCategory()
  return (
    <>
      <TagList tags={res?.data} categories={catRes?.data}/>
    </>
  );
};

export default page;
