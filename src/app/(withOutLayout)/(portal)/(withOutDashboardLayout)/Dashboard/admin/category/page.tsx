import CategoryList from "@/app/_components/shared/CategoryList/CategoryList";
import { getAllCategory } from "@/services/CategoryApi";

const page =async () => {
    const res = await getAllCategory()
    return (
        <>
           <CategoryList categories={res?.data}/> 
        </>
    );
};

export default page;