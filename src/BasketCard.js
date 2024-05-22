import './css/basket.css';

import React from 'react';
import likeEmpty from './img/icons/like empty.svg';
import editIcon from './img/icons/edit.svg';
import trashIcon from './img/icons/trashBtn.svg';

const BasketCard = ({ product, quantity, increaseQuantity, decreaseQuantity, deleteProduct }) => {
    return (
        <div className="basket__card card">
            <div className="card__img">
                <img src={product.image} alt="product"/>
            </div>
            <div className="card__info">
                <h3 className="card__title">{product.product_name}</h3>
                <div className="card__vertical">
                    <div className="card__price">{product.price} $</div>
                </div>
                <div className="card__buttons">
                    <a href="/" className="card__like">
                        <img src={likeEmpty} alt="Like"/>
                    </a>
                    <a href="/" className="card__edit">
                        <img src={editIcon} alt="Edit"/>
                    </a>
                    <a href="/" className="card__delete"
                       onClick={(e) => {e.preventDefault(); deleteProduct();}}>
                        <img src={trashIcon} alt="Delete"/>
                    </a>
                    <div className="quantity-changer">
                        <a href="/" className="decrease"
                           onClick={(e) => {e.preventDefault(); decreaseQuantity();}}>
                            -</a>
                        <label htmlFor="quantity"></label>
                        <input className="quality" type="text" id="quantity" value={quantity} readOnly/>
                        <a href="/" className="increase"
                           onClick={(e) => {e.preventDefault(); increaseQuantity();}}>
                            +</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasketCard;