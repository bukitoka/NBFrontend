
const StarRating = ({ totalStars, onStarClick, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const starClassName = i <= rating ? 'star filled' : 'star';
      stars.push(
        <span
          key={i}
          className={starClassName}
          onClick={() => onStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}
    </div>
  );
};


export default StarRating;

// // Example usage
// function Rating() {
//   const [rating, setRating] = useState(0);

//   const handleStarClick = (newRating) => {
//     setRating(newRating);
//   };

//   return (
//     <div>
//       <h2>Rate this item:</h2>
//       <StarRating totalStars={5} rating={rating} onStarClick={handleStarClick} />
//       <p>Selected rating: {rating}</p>
//     </div>
//   );
// }

// export default Rating;
