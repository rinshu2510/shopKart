import React, { useEffect, useState } from 'react';
// import Carousel from "react-material-ui-carousel";
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader"
import ReviewCard from './ReviewCard.js';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';


const ProductDetails = ({ match }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true

    };

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart");
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id));

    }, [dispatch, match.params.id, error, alert]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`${product.name} --ECOMMERCE`} />
                    <div className="ProductDetails">
                        <div>

                            <Carousel fade  >

                                {product.images && product.images.map((item, index) => (

                                    <Carousel.Item key={index} id="banner" interval={5000} keyboard={true}>
                                        <img
                                            height={"50%"}
                                            className="d-block w-100 CarouselImage"

                                            id="bannerImage"
                                            src={item.url}
                                            alt={`${index} Slide`}
                                        />
                                        {/* <Carousel.Caption>
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <p>{item.source}</p>
                                            <u>Read more</u>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>

                                ))}


                            </Carousel>

                            {/* <Carousel sx={{ width: "100%" }}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel> */}
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span> ({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>
                                        Add to Cart
                                    </button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "Instock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>


                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (<p className='noReviews' >No Reviews Yet</p>)}
                </>)}
        </>
    )
}

export default ProductDetails;