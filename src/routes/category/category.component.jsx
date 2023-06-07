import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    // run whenever category or categoriesMap changes, so it does not render if not required;
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap,category])

    return (
        <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
            {   //if products is undefined since, the app has not retrieved from firebase - Don't run it
                products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </div>
        </Fragment>
        
    );
}

export default Category;