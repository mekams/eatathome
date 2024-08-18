import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'

const Home = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/items/${activeCategory}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };

    fetchItems();
  }, [activeCategory]);

  return (

      <div className="container">
      
        <nav className="nav nav-pills flex-column flex-sm-row my-3">
          {['Pizza', 'Sandwich', 'Salad', 'Beverages', 'Extra'].map((category) => (
            // eslint-disable-next-line
            <a
              key={category}
              to={`/${category.toLowerCase()}`}
              className={`flex-sm-fill text-sm-center nav-link ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </a>
          ))}
        </nav>
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card">
                <img src={`/images/${item.photo}`} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">£{item.price}</p>
                  <button className='btn btn-primary' onClick={() => navigate(`/items/${item._id}`)}>Show Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
  );
};

export default Home;
