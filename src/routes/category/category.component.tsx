import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';
import Spinner from '../../components/spinner/spinner.component';
type CategoryRouteParams = {
    category: string;
}
const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category]);

    // run whenever category or categoriesMap changes, so it does not render if not required;
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap,category])

    return (
        <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {isLoading ? (<Spinner/>) : (
            <div className='category-container'>
                {   //if products is undefined since, the app has not retrieved from firebase - Don't run it
                    products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div> )
        }
        
        </Fragment>
        
    );
}

export default Category;