import UserList from "@/app/(withOutLayout)/(dashboard)/_components/UserList/UserList";
import { getSystemUserList } from "@/services/UserApi";

const page = async () => {
  const systemUser = await getSystemUserList().catch((error) => {
    console.log(error);
  });
  return (
    <div>
      <UserList users={systemUser?.data} />
    </div>
  );
};

export default page;
