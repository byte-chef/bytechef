import { ChatMessage, CreateChatRequest } from './openai';

const examplePrompt = {
  ingredients: ['eggs', 'milk', 'heavy cream', 'flour'],
  allowOtherIngredients: true,
  cuisine: 'breakfast',
  servings: 10,
  theme: 'any',
};

const exampleResponse = {
  name: 'Cinnamon Baked French Toast',
  description:
    'This baked french toast is perfect for brunch or any special weekend breakfast.',
  ingredients: [
    'butter, for greasing',
    '1 loaf crusty sourdough or French bread',
    '8 whole eggs',
    '2 cups whole milk',
    '1/2 cup whipping (heavy) cream',
    '1/2 cup granulated sugar',
    '1/2 cup brown sugar',
    '2 tablespoons vanilla extract',
    '1/2 cup all-purpose flour',
    '1/2 cup firmly packed brown sugar, for topping',
    '1 teaspoon ground cinnamon',
    '1/4 teaspoon salt',
    'Freshly grated nutmeg',
    '1 stick cold butter, cut into pieces, plus more for serving',
    'warm pancake syrup, for serving',
    '1 cup fresh blueberries, for serving',
  ],
  instructions: [
    'For the French toast: Grease the baking pan with butter. Tear the bread into chunks, or cut into cubes, and evenly distribute in the pan. Crack the eggs in a big bowl. Whisk together the eggs, milk, cream, granulated sugar, brown sugar and vanilla. Pour evenly over the bread. Cover the pan tightly and store in the fridge until needed (overnight preferably).',
    'For the topping: Mix the flour, brown sugar, cinnamon, salt and some nutmeg in a separate bowl. Stir together using a fork. Add the butter and with a pastry cutter, and mix it all together until the mixture resembles fine pebbles. Store in a re-sealable plastic bag in the fridge.',
    "When you're ready to bake the casserole, preheat the oven to 350 degrees F. Remove the casserole from the fridge and sprinkle the topping over the top. Bake for 45 minutes for a softer, more bread pudding texture or for 1 hour or more for a firmer, crisper texture.",
    'Scoop out individual portions. Top with butter and drizzle with warm pancake syrup and sprinkle with blueberries.',
  ],
  servings: 12,
  time: 60,
  imagePrompt:
    'A piece of thick yellow bread covered in chunks of brown sugar, syrup, cinnamon, and blueberries, on a decorative plate set with a fork on a rustic table.',
};

const examplePrompt2 = {
  ingredients: [
    '1lb chicken breast',
    'lemons',
    'garlic',
    'olive oil',
    'oregano',
    'parsley',
    'salt',
    'pepper',
    'paprika',
  ],
  allowOtherIngredients: false,
  cuisine: 'any',
  servings: 2,
  theme: 'any',
};

const exampleResponse2 = {
  name: 'Simple Lemon Herb Chicken',
  description:
    'This lemon-herb chicken is a simple, quick, and delicious dish. All you need are a few herbs, a lemon, and of course, the chicken! The amount of spices is completely up to you. You can add more or less according to your taste.',
  ingredients: [
    ' 2 (5 ounce) skinless, boneless chicken breast halves',
    '1 medium lemon, juiced, divided',
    'salt and freshly ground black pepper to taste',
    '1 tablespoon olive oil',
    '1 pinch dried oregano',
    '2 sprigs fresh parsely, chopped, for garnish',
  ],
  instructions: [
    'Place chicken in a bowl; pour 1/2 of the lemon juice over chicken and season with salt.',
    'Heat olive oil in a medium skillet over medium-low heat. Place chicken into hot oil. Add remaining lemon juice and oregano; season with black pepper. Cook chicken until golden brown and the juices run clear, 5 to 10 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).',
    'Garnish chicken with parsley to serve.',
  ],
  servings: 2,
  time: 15,
  imagePrompt:
    'A piece of chicken breast on a plate with some lemon slices and a sprig of parsley, on a white table with a napkin and green glass of water.',
};

const defaultMessagesPrompt: ChatMessage[] = [
  {
    role: 'system',
    content:
      'You are a recipe generation bot. You will be given a JSON object with the following properties: ingredients (a list of ingredients desired in the recipe by the user), allowOtherIngredients (if true you must use all the provided ingredients but may also use others not listed by the user, if false the generated recipe must only include the listed ingredients (but not necessarily all of them) and not others (except for basic spices like salt, pepper, etc)), cuisine (the type of cuisine requested), servings (the desired number of servings, the recipe may differ slightly from this if necessary), theme (if provided, try and base the recipe title and description off this theme). You will then generate a recipe based on these parameters. Your response must be provided in JSON only. Your response will contain the following fields: name (the name of the recipe, make it fun and interesting), description (a short description of the recipe), ingredients (a list of ingredients), instructions (a list of instructions), imagePrompt (a detailed description of an image of the recipe for an image generation AI to generate an image for the recipe), servings (the number of servings), and time (the total time in minutes it takes to make the recipe).',
  },
  {
    role: 'user',
    content: JSON.stringify(examplePrompt),
  },
  { role: 'assistant', content: JSON.stringify(exampleResponse) },
  {
    role: 'user',
    content: JSON.stringify(examplePrompt2),
  },
  { role: 'assistant', content: JSON.stringify(exampleResponse2) },
];

export const createPrompt = (userContent: string): ChatMessage[] => {
  return [...defaultMessagesPrompt, { role: 'user', content: userContent }];
};
