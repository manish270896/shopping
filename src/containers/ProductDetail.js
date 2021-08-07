import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectedProducts, removeSelectedProducts } from '../redux/action/productAction';

const ProductDetails = () => {
    const { productId } = useParams();
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    const fetchProductDetail = async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`).catch((err) => {
            console.log("Err", err);
        });
        console.log(response.data);
        dispatch(selectedProducts(response.data));
    };
    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail();
        return (() => {
            dispatch(removeSelectedProducts());
        })
    }, [productId]);
    const { title, image, price, category, description } = product;
    return (
        <div className="ui grid container">
            {
                Object.keys(product).length === 0 ? (
                    <div>...Loading</div>
                ) : (
                    <div className="ui placeholder segment">
                        <div className="ui two column stackable center aligned grid">
                            <div className="ui vertical divider">AND</div>
                            <div className="middle aligned row">
                                <div className="column lp">
                                    <img src={image} className="ui fluid image"></img>
                                </div>
                                <div className="column rp">
                                    <h1>{title}</h1>
                                    <h2>
                                        <a className="ui teal tag label">Rs {price}</a>
                                    </h2>
                                    <h3 className="ui brown block header">{category}</h3>
                                    <p>{description}</p>
                                    <div className="ui vertical animated button red" tabIndex="0">
                                        <div className="hidden content">
                                            <i className="shop icon"></i>
                                        </div>
                                        <div className="visible content">Add to Cart</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetails;