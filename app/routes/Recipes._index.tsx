import { Link } from "react-router";
import Sidebar from "../components/Sidebar";
import { recipes, formatTags } from "~/components/RecipesData";
import '~/styles/tailwind.css';

export default function RecipesIndex() {
    const groupedRecipes = recipes.reduce((acc, recipe) => {
        if (!acc[recipe.category]) {
            acc[recipe.category] = [];
        }
        acc[recipe.category].push(recipe);
        return acc;
    }, {} as Record<string, typeof recipes>);

    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-content overflow-y-auto">
                <div className="max-w-4xl">
                    <div className="space-y-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Recipes
                            </h1>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                VG = Vegan, VT = Vegetarian, MO = Meat option
                            </p>
                        </div>

                        {Object.entries(groupedRecipes).map(([category, categoryRecipes]) => (
                            <section key={category}>
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    {category}
                                </h2>
                                <ul className="space-y-4 list-none p-0">
                                    {categoryRecipes.map((recipe) => {
                                        const tags = formatTags(recipe);
                                        return (
                                            <li key={recipe.id} className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                                                <h3 className="text-lg font-semibold mb-2">
                                                    {tags.map((t) => (
                                                        <span key={t} className="inline-flex items-center justify-center rounded px-2 py-0.5 text-xs font-semibold mr-2 border border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-400/20 dark:text-emerald-200">
                                                            {t}
                                                        </span>
                                                    ))}
                                                    <Link to={`/Recipes/${recipe.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                                        {recipe.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                                    {recipe.description}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Servings: {recipe.servings}
                                                </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
