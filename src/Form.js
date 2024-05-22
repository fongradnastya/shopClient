import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();

    const manufacturers = [
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
    const categories = [
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
    const colors = ['Black', 'White', 'Grey', 'Silver', 'Pink'];

    const [product, setProduct] = useState({
        manufacturer: manufacturers[0].id,
        category: categories[0].id,
        product_name: '',
        price: '',
        description: '',
        color: colors[0],
    });

    const handleChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <section className="main">
            <div className="container">
                <h1 className="main-header">Add new product</h1>
                <form className="fullForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <select className="form-control" id="manufacturer" name="manufacturer"
                                value={product.manufacturer} onChange={handleChange}>
                            {manufacturers.map((manufacturer, index) => (
                                <option key={index} value={manufacturer.id}>{manufacturer.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" id="category" name="category" value={product.category}
                                onChange={handleChange}>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_name">Product Name</label>
                        <input type="text" className="form-control" id="product_name" name="product_name" value={product.product_name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={product.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <select className="form-control" id="color" name="color" value={product.color} onChange={handleChange}>
                            {colors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        </section>
    );
}

export default Form