import { useState } from 'react';
import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

interface Recipe {
    id: string;
    title: string;
    category: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: number;
    ingredients: string[];
    instructions: string[];
    notes?: string;
}

const recipes: Recipe[] = [
    {
        id: 'beef-stroganoff',
        title: 'Beef Stroganoff',
        category: 'Main',
        description: 'My simplified version',
        prepTime: '5 minutes',
        cookTime: '30 minutes',
        servings: 2,
        ingredients: [
            '500g stir fry beef strips',
            '1 small onion, chopped',
            'Can of champignons',
            '2 tablespoons sour cream',
            'Beef stock',
            '1 teaspoon salt',
            '1 teaspoon paprika',
            '1 teaspoon onion powder',
        ],
        instructions: [
            'Mix onions, beef, and seasoning ingredients',
            'Fry until beef browns',
            'Add champignons and stock',
            'Once reduced, turn off heat and stir in cream',
        ],
    },
    {
        id: 'banana-and-coconut-cookies',
        title: 'Banana and Coconut Cookies',
        category: 'Dessert',
        description: 'Good use for slightly old bananas',
        prepTime: '10 minutes',
        cookTime: '15 minutes',
        servings: 4,
        ingredients: [
            'Overripe bananas',
            '1 cup shredded coconut per banana',
        ],
        instructions: [
            'Preheat oven to 160°C',
            'Mash bananas in bowl',
            'Stir through coconut',
            'Knead into small flat disks',
            'Bake for 15 minutes',
        ],
    },
    {
        id: 'bread-and-butter-pudding',
        title: 'Bread and Butter Pudding',
        category: 'Dessert',
        description: 'Good use for slightly old bread',
        prepTime: '10 minutes',
        cookTime: '45 minutes',
        servings: 3,
        ingredients: [
            '8 pieces of bread, buttered',
            '3 eggs',
            '1 cup milk',
            '1 cup sultanas',
        ],
        instructions: [
            'Preheat oven to 160°C',
            'Mix the eggs, milk, and sultanas',
            'Cut bread into triangles and soak in mixture for 5 minutes',
            'Stack in small oven proof container and cook for 45 minutes',
        ],
    },
    {
        id: 'cucumber-slices',
        title: 'Cucumber Slices',
        category: 'Sides',
        description: 'Goes well with Miso Salmon',
        prepTime: 'Overnight',
        cookTime: 'None',
        servings: 8,
        ingredients: [
            '2 lebanese cucumber',
            '3 tablespoons rice wine vinegar',
            '1 teaspoon sesame oil',
        ],
        instructions: [
            'Peel and thinly slice cucumber',
            'Put in jar and mix with with rice wine vinegar and sesame oil',
            'Leave in fridge overnight',
        ],
    },
    {
        id: 'lime-salmon',
        title: 'Lime Salmon',
        category: 'Main',
        description: 'Quicker and lighter alternative to Miso Salmon',
        prepTime: '15 minutes',
        cookTime: '25 minutes',
        servings: 2,
        ingredients: [
            '3 salmon fillets, skin on',
            '2 zucchini',
            '1 lime',
            '1 avocado in chunks',
            'Salt and oil',
        ],
        instructions: [
            'Preheat oven to 170°C',
            'Mix the salt, oil, and lime juice',
            'Dip each of the salmon and then add extra salt to the skin',
            'Bake the salmon for 25 minutes',
            'While cooking, slice the zucchini lengthwise. Dip and fry them until brown',
            'Serve with avocado chunks',
        ],
    },
    {
        id: 'mediterranean-salad',
        title: 'Mediterranean Salad',
        category: 'Sides',
        description: 'Goes well with the Moussaka',
        prepTime: '5 minutes',
        cookTime: '5 minutes',
        servings: 4,
        ingredients: [
            '300g mixed baby salad leaves',
            '100g black sliced olives',
            '200g broken feta',
            '100g sun-dried tomato, sliced',
            '100g halloumi',
            '100g anchovies',
        ],
        instructions: [
            'Fry halloumi and anchovies for 5 minutes',
            'Mix with remaining ingredients',
        ],
    },
    {
        id: 'miso-salmon',
        title: 'Miso Salmon',
        category: 'Main',
        description: 'Not as good as Nobu',
        prepTime: 'Overnight',
        cookTime: '25 minutes',
        servings: 2,
        ingredients: [
            '3 pieces skin on salmon',
            '2 carrots sliced julienne',
            '2 tablespoons aka miso paste',
            '3 tablespoons Mirin',
            '1 tablespoon of any nice tasting cheap sake',
            '1 teaspoon sesame oil',
            '1 teaspoon salt',
            'Oil or butter for greasing',
        ],
        instructions: [
            'Mix the mirin, sake, seasame oil, salt, and miso in a bowl',
            'Coat the bottom of each salmon piece in this mix, as well as the carrots, using 3/4 the mix',
            'Place the remaining mix in the fridge overnight, along with the salmon and carrots in a container to marinate',
            'When ready, preheat oven to 180°C',
            'Grease some foil and cook the salmon uncovered for 10 minutes with the bottom facing up',
            'Remove from oven, flip over, and thinly coat the skin on top with the remaining marinade and some extra salt',
            'Cook for another 15 minutes or until the skin is crispy',
        ],
    },
    {
        id: 'vegan-crepes',
        title: 'Vegan Crepes',
        category: 'Sides',
        description: 'Crepes made with tofu and oats rather than eggs, savoury but can be made sweet instead',
        prepTime: '10 minutes',
        cookTime: '10 minutes',
        servings: 2,
        ingredients: [
            '300g silken tofu',
            '2 cups rolled oats',
            '1/3 cup barista oat milk',
            '1/2 cup kimchi',
            'Cooking oil e.g. macadamia nut',
        ],
        instructions: [
            'Blend ingredients (other than oil) on low for a short time until there are no more whole oats',
            'Heat oil in large flat frying pan',
            'Pour batter as thinly as possible onto a pan (if you need multiple batches blend waiting mix with more oat milk to stop it from thickening)',
            'Cook for around 3 minutes per side',
        ],
        notes: 'As an alternative mix, replace the kimchi with honey and vanilla extract for sweet crepes'
    },
    {
        id: 'vegan-stuffed-eggplant',
        title: 'Vegan Stuffed Eggplant',
        category: 'Main',
        description: 'Makes 4 sides or 2 mains',
        prepTime: '20 minutes',
        cookTime: '25 minutes',
        servings: 2,
        ingredients: [
            '2 large eggplants',
            '500g impossible mince',
            '1 zucchini',
            'Pinch of cumin, paprika, onion powder, and salt',
            'Olive oil and brush',
        ],
        instructions: [
            'Slice the eggplant length-ways',
            'Scoop out the flesh. Chop and set aside',
            'Mix olive oil with onion powder and salt, and brush outside of eggplants',
            'Mix eggplant flesh with cumin and paprika',
            'Put eggplant shells into oven at 180°C',
            'Start frying impossible mince with onion powder',
            'Dice the zucchini',
            'Add the eggplant flesh mix to the pan, followed by the zucchini',
            'Add the mix to the cooking shells, and cook for another 15 minutes',
        ],
    },
    {
        id: 'vegan-moussaka',
        title: 'Vegan Moussaka',
        category: 'Main',
        description: 'Simple version of the modern Greek moussaka with lentils instead of beef',
        prepTime: '30 minutes',
        cookTime: '50 minutes',
        servings: 2,
        ingredients: [
            '5 cloves garlic',
            '2 medium eggplants',
            '120g raw cashews',
            '7g bakers yeast',
            'White onion',
            '1 can lentils',
            '1 can tomatoes',
            'Olive oil',
        ],
        instructions: [
            'Preheat oven to 200°C',
            'Slice ends off garlic and peel off outer layer',
            'Soak in a small amount of olive oil and salt',
            'Wrap in foil and place in oven on tray for 10 minutes',
            'Soak cashews in 1 cup boiling water',
            'Slice eggplant thinly and salt both sides of each slice',
            'Place on paper towels to dry out and then coat both sides with olive oil',
            'Remove the garlic from oven and put the eggplant in the oven for 10 minutes',
            'Place cashews and their water, yeast, and garlic mix in a blender and blend until smooth',
            'Remove eggplant from the oven and line the base of a deep dish with half of it',
            'Slice onion and combine with lentils and tomatoes from can',
            'Heat olive oil in pan and fry the tomato mixture until the juice reduces',
            'Place the mix on top of the eggplant in the deep dish',
            'Cover with the remaining eggplant, and then spread the cashew mix on top of this',
            'Bake for 30 minutes',
        ],
    },
    {
        id: 'vegan-nut-slice',
        title: 'Vegan Nut Slice',
        category: 'Dessert',
        description: 'Subtly sweet flour-less vegan dessert',
        prepTime: '20 minutes',
        cookTime: '35 minutes',
        servings: 8,
        ingredients: [
            '375g jar of nut butter e.g. ABC spread',
            '1 cup almond flour',
            '2 blocks of milk-less chocolate e.g. Lindt 85%',
            '1 cup barista oat or almond milk',
            'Greaser e.g. macadamia nut oil or vegan butter',
            '(optional) 2 tablespoons of thickener e.g. faba bean powder or ground flaxseed',
            '(optional) 2 tablespoons chopped walnuts or cacao nibs',
            '(optional) 1 teaspoon vanilla extract',
        ],
        instructions: [
            'Grease a medium size deep oven pan e.g. a Loaf Pan',
            'Preheat oven to 180°C',
            'Hand mix ingredients other than chocolate in a large bowl',
            'Heat chocolate in microwave on low heat in microwave safe container until mostly liquid',
            'Immediately mix it through other ingredients before it hardens',
            'Pour into pan and bake for approximately 35 minutes',
        ],
        notes: 'Best served with a plant based cream. It is quite cakey when warm but solidifies into a slice in fridge, either is nice.'
    },
    {
        id: 'vegetarian-shepherds-pie',
        title: 'Vegetarian Shepherd\'s Pie',
        category: 'Main',
        description: 'Cooked plant based mince meat (or lentils) topped with mashed potato',
        prepTime: '45 minutes',
        cookTime: '45 minutes',
        servings: 2,
        ingredients: [
            '1 onion',
            '500g plant based mince',
            '2 carrots',
            '120 grams frozen peas',
            '3 potatoes',
            '120g mozzarella',
            '3 tablespoons butter',
            'Vegetable stock powder',
            'Salt',
            'Garlic salt',
            'Cooking oil e.g. macadamia nut oil',
            'Oil or butter for greasing oven pan',
        ],
        instructions: [
            'Fill large pot half full with water and start boiling',
            'Cut carrots into small squares and combine with peas',
            'Chop onions finely. Add some salt to the boiling water',
            'Peel and quarter potatoes',
            'Add oil and and salt to a frying pan and turn it to high heat',
            'Add potatoes to boiling water',
            'Add mince (or lentils in alternative version) and a pinch of garlic salt to the saucepan',
            'Preheat oven to 180°C',
            'Once mince is heated (wait for brown if using beef mince, or straight away for lentils) add carrot and pea mix',
            'Add stock powder to 1 cup water, mix, and add to frying pan',
            'Mix  mozzarella and butter in microwave proof bowl',
            'Drain and finely mash potatoes. Spread out thinly on large plate',
            'Frying pan mix should now be reduced and heat can be turned off',
            'Microwave parmesan mix and then knead it into spread out potato mash',
            'Grease an oven proof container, pour in mince, and then top with the potato mash',
            'Bake for 45 minutes or until topping starts to brown',
        ],
        notes: 'For the meat based version low fat grass fed beef mince works best, or another vegetarian ' +
            'alternative is to substitute 2 cups of lentils for the mince'
    },
    {
        id: 'vegetarian-tacos',
        title: 'Vegetarian Tacos',
        category: 'Main',
        description: 'As easy as it gets',
        prepTime: '10 minutes',
        cookTime: '15 minutes',
        servings: 3,
        ingredients: [
            '1 corn cob, stripped',
            '1 carrot, grated',
            '5 mushrooms, chopped',
            '1 small zucchini, chopped',
            '1 tomato, chopped' +
            '12 taco shells + seasoning',
            '1/2 avocado, chopped',
            '1 can black beans',
            '1 can refried beans',
            'Mozzarella',
            'Sour Cream',
            'Oil for frying',
        ],
        instructions: [
            'Heat tacos in oven',
            'Mix avocado, cream, and mozzarella to make a topping',
            'Fry other ingredients',
            'Add to tacos, then add topping',
        ],
    },
];

export default function RecipesRoute() {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const groupedRecipes = recipes.reduce((acc, recipe) => {
        if (!acc[recipe.category]) {
            acc[recipe.category] = [];
        }
        acc[recipe.category].push(recipe);
        return acc;
    }, {} as Record<string, Recipe[]>);

    return (
        <div className="app">
            <Sidebar />
            <main className="main-content overflow-y-auto">
                <div className="max-w-4xl">
                    {!selectedRecipe ? (
                        <div className="space-y-8">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    Recipes
                                </h1>
                            </div>

                            {Object.entries(groupedRecipes).map(([category, categoryRecipes]) => (
                                <div key={category}>
                                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                        {category}
                                    </h2>
                                    <div className="space-y-4">
                                        {categoryRecipes.map((recipe) => (
                                            <div
                                                key={recipe.id}
                                                className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                                                onClick={() => setSelectedRecipe(recipe)}
                                            >
                                                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                                    {recipe.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                                    {recipe.description}
                                                </p>
                                                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                    <span>⏱ Prep: {recipe.prepTime}</span>
                                                    <span>🍳 Cook: {recipe.cookTime}</span>
                                                    <span>🍽 Servings: {recipe.servings}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="text-blue-600 dark:text-blue-400 hover:underline mb-4 flex items-center gap-2"
                            >
                                ← Back to recipes
                            </button>

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    {selectedRecipe.title}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {selectedRecipe.description}
                                </p>

                                <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
                                    <div>
                                        <span className="font-semibold">Prep Time:</span> {selectedRecipe.prepTime}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Cook Time:</span> {selectedRecipe.cookTime}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Servings:</span> {selectedRecipe.servings}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1">
                                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                            Ingredients
                                        </h2>
                                        <ul className="space-y-2">
                                            {selectedRecipe.ingredients.map((ingredient, index) => (
                                                <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start">
                                                    <span className="text-gray-400 mr-2">•</span>
                                                    {ingredient}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="md:col-span-2">
                                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                            Instructions
                                        </h2>
                                        <ol className="space-y-3">
                                            {selectedRecipe.instructions.map((instruction, index) => (
                                                <li key={index} className="text-gray-700 dark:text-gray-300 flex">
                                                    <span className="font-semibold text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0">
                                                        {index + 1}.
                                                    </span>
                                                    <span>{instruction}</span>
                                                </li>
                                            ))}
                                        </ol>

                                        {selectedRecipe.notes && (
                                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                                    💡 Note
                                                </h3>
                                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                                    {selectedRecipe.notes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}