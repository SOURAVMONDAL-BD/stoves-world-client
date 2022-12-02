import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AurhProvider/AuthProvider';
import BookingModal from '../BookingModal/BookingModal';
import tick from "../../img/check.png"

const ProductCard = ({ products }) => {
    const { user, userInfo } = useContext(AuthContext);
    const { productName, _id, isVarified, photoUrl, email, phone, resalePrice, originalPrice, condition, sellerName, usedYear, location, postingDate } = products;
    const [bookProduct, setBookProduct] = useState(null)
    const navigate = useNavigate();

    const [sellerInfo, setSellerInfo] = useState({})


    // useEffect(() => {
    //     fetch(`https://stoves-world-server.vercel.app/users/${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setSellerInfo(data[0])
    //         })
    // }, [user?.uid])


 



    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
            <figure><img src={photoUrl} alt="Stove" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{productName}</h2>
                <p className='font-semibold'>original Price : <span className=''>{originalPrice}</span></p>
                <p className='font-semibold'>Resale Price : <span className=''>{resalePrice}</span></p>
                <p className='font-semibold'>Uses Time : <span className=''>{usedYear} </span> years</p>
                <p className='font-semibold'>Product condition : <span className=''>{condition} </span></p>


                <div className='flex '>
                    <div>
                        <p className='font-semibold pr-2'>Seller : {sellerName}</p>
                    </div>
                    <div className=''>
                        {
                            sellerInfo?.isVerified && <img src={tick} className=" fill-current w-full" alt='tick'></img>
                        }
                    </div>

                </div>

                <p className='font-semibold'>Seller phone : <span className=''>{phone}</span></p>
                <p className='font-semibold'>Seller email : <span className=''>{email}</span></p>
                <p className='font-semibold'>Location : <span className=''>{location}</span></p>
                <p className='font-semibold'>Posted on : <span className=''>{postingDate}</span></p>

                {

                    !user?.uid ?
                        <p><Link className='text-violet-700' to="/login">Login </Link> or <Link className='text-violet-700' to="/signup">SignUp</Link> as a "Buyer" to book this product</p>
                        :
                        userInfo?.userRole !== "Buyer" ?

                            <>
                                <p>Note: It's not your Buyer account. <Link className='text-violet-700' to="/signup">SignUp</Link> as a "Buyer" to book this product</p>
                            </>

                            :

                            <div className="card-actions justify-end">
                                <label
                                    htmlFor="booking-modal"
                                    className="btn btn-sm btn-primary text-white rounded-lg bg-orange-500"
                                    onClick={() => setBookProduct(products)}
                                >Book Now</label>
                            </div>
                }
            </div>
            {
                bookProduct &&
                <BookingModal
                    selectedDate=""
                    bookProduct={bookProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default ProductCard;