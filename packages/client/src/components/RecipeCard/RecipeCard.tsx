import imgUrl from '../../assets/placeholder1.jpg';
const RecipeCard = () => {
  return (
    <div>
      <div className="drop-shadow-md w-60 h-96 bg-light">
        <img src={imgUrl} className=""></img>
        <p className="h-32 p-2 line-clamp-5">
          <p>Title</p>
          Honestly, if it weren’t for that Disney movie about the rat, I doubt
          my kids would have been so eager to try my ratatouille recipe. But
          once they did, they were delighted and now it’s a dish I love to make
          when I feel like we should have something meatless. Made with a bounty
          of fresh, colorful vegetables, you’ll love the garden-fresh flavors in
          this tasty meal!
        </p>
      </div>
    </div>
  );
};
export default RecipeCard;
