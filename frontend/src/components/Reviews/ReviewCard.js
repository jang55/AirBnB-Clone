


function ReviewCard({ review }) {
    const createdDate = (() => {
        return (new Date(review?.createdAt).toString().slice(4, 15))
    })()

  return (
    <>
      <h4>{review.User?.firstName}</h4>
      <p>{createdDate}</p>
      <p>{review?.review}</p>
    </>
  );
}

export default ReviewCard;
