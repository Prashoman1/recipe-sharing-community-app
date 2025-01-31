import React from 'react';
import ProfilePage from '../../_components/ProfilePage/ProfilePage';
import { getMyRecipeLikes } from '@/services/likeApi';
import { getMyFollowingUsers } from '@/services/FollowApi';

const page = async () => {
    const myLikes = await getMyRecipeLikes().then((res) => res.data).catch((err) => err);
    const myFollowingUsers = await getMyFollowingUsers().then((res) => res.data).catch((err) => err);
    return (
        <>
            <ProfilePage myLikes={myLikes} myFollowingUsers={myFollowingUsers}/>
        </>
    );
};

export default page;