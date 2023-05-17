import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    // run whenever category or categoriesMap changes, so it does not render if not required;
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap,category])

    return (
        <div className='category-container'>
            {   //if products is undefined since, the app has not retrieved from firebase - Don't run it
                products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </div>
    );
}

export default Category;