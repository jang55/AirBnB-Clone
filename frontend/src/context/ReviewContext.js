import { createContext, useContext } from 'react';
import { useState } from 'react';


export const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);


function ReviewProvider(props) {
    
    const [newReview, setNewReview] = useState(false);
    const [deleteReview, setDeleteReview] = useState(false);
   
    // console.log(sign)
    return (
        <ReviewContext.Provider 
            value={{
                newReview,
                setNewReview,
                deleteReview,
                setDeleteReview
                }}>
            {props.children}
        </ReviewContext.Provider>
    )
}

export default ReviewProvider;