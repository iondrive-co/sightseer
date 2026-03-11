import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import Sidebar from "~/components/Sidebar";
import { getRecipeById, formatTags, type Recipe } from "~/components/RecipesData";
import '~/styles/tailwind.css';

export function loader({ params }: LoaderFunctionArgs) {
    const recipe = getRecipeById(params.id!);
    if (!recipe) {
        throw new Response("Recipe not found", { status: 404 });
    }
    return recipe;
}

export default function RecipePage() {
    const recipe = useLoaderData<Recipe>();
    const tags = formatTags(recipe);

    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-content overflow-y-auto">
                <div className="max-w-4xl space-y-6">
                    <nav>
                        <Link to="/Recipes" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Back to recipes
                        </Link>
                    </nav>

                    <article>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                            {tags.map((t) => (
                                <span key={t} className="inline-flex items-center justify-center rounded px-2 py-0.5 text-sm font-semibold mr-3 align-middle border border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-400/20 dark:text-emerald-200">
                                    {t}
                                </span>
                            ))}{recipe.title}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {recipe.description}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
                            Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Servings: {recipe.servings}
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    Ingredients
                                </h2>
                                <ul className="space-y-2">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">
                                            {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="md:col-span-2">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    Instructions
                                </h2>
                                <ol className="space-y-3 list-decimal list-inside">
                                    {recipe.instructions.map((instruction, index) => (
                                        <li key={index} className="text-gray-700 dark:text-gray-300">
                                            {instruction}
                                        </li>
                                    ))}
                                </ol>

                                {recipe.notes && (
                                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                            Note
                                        </h3>
                                        <p className="text-sm text-blue-800 dark:text-blue-200">
                                            {recipe.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}
