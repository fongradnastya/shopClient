import React from 'react';
import axios from "axios";
import BasketCard from "./BasketCard";
import Payment from "./Payment";


class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basket: JSON.parse(localStorage.getItem('basket')) || {},
            details: []
        };
    }

    async componentDidMount() {
        // Get the basket from local storage
        const basket = JSON.parse(localStorage.getItem('basket')) || {};

        // Fetch product details for each product in the basket
        const detailsArray = await Promise.all(
            Object.keys(basket).map(productId =>
                axios.get(`http://localhost:8000/products/${productId}/`)
                    .then(res => (
                        { id: productId, data: res.data }))
                    .catch(err => console.log(err))
            )
        )
        const details = detailsArray.reduce((acc, { id, data }) => {
            acc[id] = data;
            return acc;
        }, {});
        this.setState({
            details: details
        });
        console.log(details);
        console.log(this.state);
        console.log(this.state.details);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.basket !== this.state.basket) {
            localStorage.setItem('basket', JSON.stringify(this.state.basket));
        }
    }

    increaseQuantity = (productId) => {
        this.setState(prevState => ({
            basket: {
                ...prevState.basket,
                [productId]: prevState.basket[productId] + 1
            }
        }));
    }

    decreaseQuantity = (productId) => {
        if (this.state.basket[productId] > 1) {
            this.setState(prevState => ({
                basket: {
                    ...prevState.basket,
                    [productId]: prevState.basket[productId] - 1
                }
            }));
        }
    }

    deleteProduct = (productId) => {
        this.setState(prevState => {
            const newBasket = { ...prevState.basket };
            delete newBasket[productId];
            return { basket: newBasket };
        });
    }

    getTotalPrice = () => {
        let totalPrice = 0;
        Object.entries(this.state.basket).forEach(([productId, quantity]) => {
            const product = this.state.details[productId];
            if (product) {
                totalPrice += product.price * quantity;
            }
        });
        return totalPrice;
    }


    render() {
        let subtotalPrice = this.getTotalPrice();
        let totalPrice = subtotalPrice + 22.5;
        let basketItems = Object.entries(this.state.basket);

        return (
            <section className="page__main-block main-block">
                <div className="main-block__container container">
                    <div className="main-block__body">
                        {basketItems.length > 0 ? (
                            <form action="#" className="basket-form">
                                <div className="products">
                                    {basketItems.map(([productId, quantity]) => {
                                        // Get the product details
                                        const product = this.state.details[productId];
                                        // If product details exist, render the BasketCard
                                        if (product) {
                                            return (
                                                <BasketCard
                                                    key={productId}
                                                    product={product}
                                                    quantity={quantity}
                                                    increaseQuantity={() => this.increaseQuantity(productId)}
                                                    decreaseQuantity={() => this.decreaseQuantity(productId)}
                                                    deleteProduct={() => this.deleteProduct(productId)}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                                <Payment subtotalPrice={subtotalPrice} totalPrice={totalPrice}/>
                            </form>
                        ) : (
                            <div className="empty__card">
                                <h3 className="empty__header">There are no items in your basket</h3>
                                <a href="/" className="empty__button">Start shopping</a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default Basket;