import heart from '../../assets/love.png';

const RecipeCard = () => {
  return (
    <div className="mx-auto ">
      <div className="relative w-72 h-80 bg-custom_white">
        <img
          src="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"
          className="h-4/7 drop-shadow-md"
        ></img>
        <a>
          <img src={heart} className="absolute right-2 top-2" width="28"></img>
        </a>
        <p className="h-32 py-2 line-clamp-5 text-start">
          <div className="flex justify-between mb-2">
            <p className="text-custom_red font-semibold">Breakfast (55 mins)</p>
            <p>282 likes</p>
          </div>
          <h3 className="hover:border-custom_red hover:border-b-2">
            Best Shakshuka
          </h3>
        </p>
      </div>
    </div>
  );
};
export default RecipeCard;
