import UserList from "@/app/(withOutLayout)/(dashboard)/_components/UserList/UserList";
import { getUserList } from "@/services/UserApi";


const page = async() => {
    const userData = await getUserList().catch((error) => {
        console.log(error);
    });
    return (
        <>
            <UserList users={userData?.data?.result} />
        </>
    );
};

export default page;