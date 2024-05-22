import './css/index.css';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios'
import ProductCard from "./ProductCard";

class Catalog extends React.Component{

    manufacturers = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Honor' },
        { id: 3, name: 'Samsung' },
        { id: 4, name: 'Google' },
        { id: 5, name: 'Xiaomi' },
        { id: 6, name: 'HUAWEI' },
        { id: 7, name: 'Oppo' },
        { id: 8, name: 'Vivo' },
        { id: 9, name: 'Realme' },
        { id: 10, name: 'Sony' },
    ];
    categories = [
        { id: 1, name: 'tablet' },
        { id: 2, name: 'laptop' },
        { id: 3, name: 'smart phone' },
        { id: 4, name: 'smart watch' },
        { id: 5, name: 'TV' },
        { id: 6, name: 'Smart speaker' },
        { id: 7, name: 'Earphones' },
        { id: 8, name: 'headphones' },
        { id: 9, name: 'Game console' },
    ];
    colors = ['Black', 'White', 'Grey', 'Silver', 'Pink'];

    state = {details: [],}
    componentDidMount () {
        axios.get('http://localhost:8000/products/')
            .then(res => {
                let data = res.data;
                console.log(data);
                this.setState({
                    details: data
                });
            })
            .catch(err => {console.log(err)});
    }

    render(){
        return (
            <section className="page__main-block main-block">
                <div className="main-block__container container">
                    <div className="main-block__body">
                        <h1 className="main-block__title">
                            Catalog
                        </h1>
                        <div className="products">
                            {this.state.details.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    manufacturers={this.manufacturers}
                                    categories={this.categories}
                                    colors={this.colors}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    };
}

export default Catalog