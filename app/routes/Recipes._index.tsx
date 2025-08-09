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
}

const recipes: Recipe[] = [
    {
        id: 'vegan-pancakes',
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
            'Cooking oil (I use macadamia nut oil)',
        ],
        instructions: [
            'Blend ingredients on low until oats are blended',
            'Heat oil in large flat frying pan',
            'Pour batter as thinly as possible onto a pan. If you need multiple batches use more milk to keep waiting mix from thickening',
            'Cook for around 3 minutes per side',
            'As an alternative mix, replace the kimchi with honey and vanilla extract for sweet crepes',
        ],
    }
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