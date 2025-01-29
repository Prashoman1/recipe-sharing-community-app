import React from 'react';
import RecipeDetails from '../../_components/RecipeDetails/RecipeDetails';

const page = ({ params: { id } }: { params: { id: string } }) => {
    console.log({id});
    
    return (
        <>
            <RecipeDetails />
        </>
    );
};

export default page;