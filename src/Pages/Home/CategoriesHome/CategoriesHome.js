import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import ProductShort from '../../../Components/ProductShort/ProductShort';
import { AuthContext } from '../../../Context/AurhProvider/AuthProvider';
import CategoriesCard from './CategoriesCard';





const CategoriesHome = () => {

    const { doFetch, setDoFetch} = useContext(AuthContext);

    const [Categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);


    useEffect(() => {
        fetch('https://stoves-world-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])


    const handleLoadProduct = (CategoryName) => {
        setSelectedCategory(CategoryName);
    };


    useEffect(() => {
        fetch(`https://stoves-world-server.vercel.app/category/${selectedCategory}`)
            .then(res => res.json())
            .then(data => setCategoryProducts(data))
    }, [selectedCategory])





    return (
        <div>
            <div className='mb-10'>
                <h1 className='text-3xl font-bold text-center mb-5 text-green-500'>Category</h1>
                <p className='text-xl font-semibold text-center text-yellow-500'>Which type of stove do you looking for????</p>
            </div>

            <div className=' lg:mx-20 grid grid-cols-3 gap-10 mx-auto my-10'>
                {
                    Categories.map(category => <CategoriesCard
                        key={category._id}
                        category={category}
                        handleLoadProduct={handleLoadProduct}
                    ></CategoriesCard>)
                }

            </div>


            <div className="">
                {
                    categoryProducts ?
                        <>
                            <div className=' lg:mx-20 grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto my-10'>
                                {
                                    categoryProducts.map(products => <ProductShort
                                        key={products._id}
                                        products={products}
                                    ></ProductShort>)
                                }

                            </div>
                        </>
                        :
                        <>
                            <p>Select a category for show product</p>
                        </>
                }
            </div>



        </div>
    );
};

export default CategoriesHome;