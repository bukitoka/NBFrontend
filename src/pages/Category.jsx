import { useEffect } from 'react';
import useCategory from '../tools/store';

const Category = () => {

    const { categories, loading, error, fetchCategories } = useCategory();

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Category</h1>

            {categories.map((category) => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                </div>
            ))}

        </div>
    );
};

export default Category;
