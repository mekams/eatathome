import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/item/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => {
      if (increment) {
        return prevQuantity + 1;
      }
      return prevQuantity > 1 ? prevQuantity - 1 : 1;
    });
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      // Optionally alert the user or just redirect to login page
      alert('Please log in to add items to the cart.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5500/cart', {
        userId,
        itemId: id,
        qty: quantity
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart', error);
      alert('Failed to add item to cart.');
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <br/><br/>
      <img src={`/images/${item.photo}`} alt={item.name} />
      <h2>{item.name}</h2>
      <p>Price: £{item.price}</p>
      <div className="quantity-controls">
        <button className='btn btn-primary' style={styles.button} onClick={() => handleQuantityChange(false)}>-</button>
        <input type="text" value={quantity} style={styles.input} readOnly />
        <button className='btn btn-primary' style={styles.button} onClick={() => handleQuantityChange(true)}>+</button>
      </div>
      <br/><br/>
      <button className='btn btn-primary' onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
};

const styles = {
  button: {
    margin: '0 5px',
  },
  input: {
    textAlign: 'center',
    width: '50px',
  }
};

export default ItemDetails;
