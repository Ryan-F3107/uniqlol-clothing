import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';
import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const getCategoriesMap = async () =>  {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap();
    },[dispatch])//[dispatch] not needed, included to remove warning as React is strict and assumes a warning
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category/>} />
        </Routes>
    );
}

export default Shop;