import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../../store/item';
import './DisplayMenu.css';

const DisplayMenu = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.menu.items);
  const status = useSelector((state) => state.menu.status);
  const error = useSelector((state) => state.menu.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="header">
      </div>
      <div className="menu-container">
        {items.length === 0 ? (
          <h2>CREATE YOUR FIRST BOARD!</h2>
        ) : (
          items.map((item) => (
            <div key={item.id} className="menu-card">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="menu-image" 
              />
              <div className="menu-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price} for {item.quantity} {item.measure}</p>
                <p>Quantity Available: {item.quantityOnHand}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayMenu;
