/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import TableSkeleton from "@/app/_components/shared/Skeleton/Skeleton";
import Table from "@/app/_components/shared/Table/Table";
// import { deleteRecipeApi, RecipePublicUnPublishAPi } from "@/services/RecipeApi";
import { TTableHeader } from "@/type";
// import { handleDelete } from "@/utils/handleDelete";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

type TUserListProps = {
  users: any;
};

const UserList = ({ users }: TUserListProps) => {
  //  const [loading,setLoading] = useState(false);
  //  const [recipes, setRecipes] = useState<any[]>([]);
  const pathName = usePathname();
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "UserName", key: "title" },
    { title: "Image", key: "image" },
    { title: "Email", key: "email" },
    { title: "MemberShip", key: "memberShip" },
    { title: "Status", key: "status" },
    { title: "ExpiryDate", key: "expiryDate" },
    { title: "Options", key: "options" },
  ];
  //   const fetchRecipes = async () => {
  //     try {
  //       setLoading(true);
  //       const recipes = await getRecipesByAdmin();
  //       setRecipes(recipes?.data);
  //     } catch (error: any) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchRecipes();
  //   }, []);

  //   const deleteRecipe = async (id: string) => {
  //     const res = await handleDelete(id, deleteRecipeApi);
  //     if (res) {
  //       fetchRecipes();
  //     }
  //   };

  //   const UpdateRecipePublishStatus = async (id: string) => {

  //     const res = await RecipePublicUnPublishAPi(id);
  //     console.log(res);

  //     if (res?.success) {
  //       fetchRecipes();
  //       toast.success(res.message);
  //     }
  //   }


  return (
    <>
      <div className="w-full">
        {pathName.endsWith("user-list") ? (
          <div className="flex justify-between items-start pb-4">
            <h1 className="text-2xl font-semibold">User List</h1>
          </div>
        ) : (
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-2xl font-semibold">Admin List</h1>
            <Link
              href="/dashboard/admin/manage-admin/add"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Add Admin
            </Link>
          </div>
        )}
       
        <div className="w-full overflow-x-auto">
          <Table data={tableHeadings}>
            {users?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.userName}</td>
                <td>
                  <Image
                    src={item?.profileImage}
                    width={40}
                    height={40}
                    alt={item.email}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td>{item.email}</td>
                <td>{item.memberShip ? "Premium" : "free"}</td>
                <td>Expire</td>
                <td>01-01-2025</td>

                <td>
                  <div className="flex items-center gap-2">
                    <button
                      // onClick={() => deleteRecipe(recipe._id)}
                      // href={`/dashboard/admin/recipe/delete/${recipe._id}`}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserList;
