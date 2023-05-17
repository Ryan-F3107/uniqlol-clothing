import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    console.log("cM: ",categoriesMap);
    return (
        <Fragment>
            {   //object.keys() returns an array of keys
                Object.keys(categoriesMap).map((title) => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className="products-container">
                            {categoriesMap[title].map((product) => (
                                <ProductCard key={product.id} product={product}/>   //pass the whole product as a product prop
                            ))}
                        </div>
                    </Fragment>
                ))
            }
        </Fragment>
    );
}

export default Shop;