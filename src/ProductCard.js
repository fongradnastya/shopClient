import React, {useState, useEffect} from 'react';
import likeEmpty from './img/icons/like empty.svg';
import editIcon from './img/icons/edit.svg';
import trashIcon from './img/icons/trashBtn.svg';

const ProductCard = ({ product, manufacturers, categories, colors }) => {

    const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')) || {});
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const addToBasket = () => {
        setBasket(prevBasket => {
            const newBasket = { ...prevBasket };
            newBasket[product.id] = (newBasket[product.id] || 0) + 1;
            return newBasket;
        });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleDelete = () => {
        deleteProduct();
        window.location.reload(false);

    }

    const handleSave = async (event) => {
        event.preventDefault();
        await updateProduct();
        window.location.reload(false);
        setEditMode(false);
    };

    const updateProduct = () => {
        fetch(`http://localhost:8000/products/${product.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProduct),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteProduct = () => {
        fetch(`http://localhost:8000/products/${product.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleChange = (event) => {
        setEditedProduct({
            ...editedProduct,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    return (
        <div className="products__card card">
            {editMode ? (
                <form className="cardForm">
                    <div className="form-group">
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <select className="form-control" id="manufacturer" name="manufacturer"
                                value={editedProduct.manufacturer} onChange={handleChange}>
                            {manufacturers.map((manufacturer, index) => (
                                <option key={index} value={manufacturer.id}>{manufacturer.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" id="category" name="category" value={editedProduct.category}
                                onChange={handleChange}>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_name">Product Name</label>
                        <input type="text" className="form-control" id="product_name" name="product_name"
                               value={editedProduct.product_name} onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" className="form-control" id="price" name="price"
                               value={editedProduct.price} onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <select className="form-control" id="color" name="color" onChange={handleChange}
                                value={editedProduct.color}>
                            {colors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="button save-button" onClick={handleSave}>Save</button>
                </form>
            ) : (
                <>
                    <a href="/" className="card__link">
                        <div className="card__img">
                            <img src={product.image} alt="product" />
                        </div>
                        <h3 className="card__title">{product.product_name}</h3>
                    </a>
                    <div className="card__vertical">
                        <div className="card__price">{product.price} $</div>
                    </div>
                    <div className="card__buttons">
                        <button onClick={addToBasket} className="card__buy">Buy</button>
                        <a href="/" className="card__like">
                            <img src={likeEmpty} alt="Like" />
                        </a>
                        <button onClick={handleEdit} className="card__edit">
                            <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={handleDelete} className="card__deleteedit">
                            <img src={trashIcon} alt="Delete" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};


export default ProductCard;
