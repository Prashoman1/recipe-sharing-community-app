import { getMyRatings } from '@/services/RatingApi';
import RecipeDetails from '../../_components/RecipeDetails/RecipeDetails';

const page = async() => {
    const resMyRating = await getMyRatings().then((res) => {
        return res?.data;
    }).catch((error) => {
        return error;
    });
    return (
        <>
            <RecipeDetails myRating={resMyRating}/>
        </>
    );
};

export default page;