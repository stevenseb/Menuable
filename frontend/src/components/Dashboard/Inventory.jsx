import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../../store/item'; // Assuming this fetches all items
import styles from './Inventory.module.css';
import BackToTopButton from '../UI/BackToTopButton';

const Inventory = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.menu.items);
  const status = useSelector(state => state.menu.status);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, status]);

  const inventoryItems = items.filter(item => item.quantityOnHand > 0);

  const sortedItems = [...inventoryItems].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.quantityOnHand - b.quantityOnHand
      : b.quantityOnHand - a.quantityOnHand;
  });

  const handleSortToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className={styles.inventory}>
      <h2 className={styles.heading}>Inventory</h2>
      <button onClick={handleSortToggle} className={styles.sortButton}>
        Sort by Quantity: {sortOrder === 'asc' ? 'Least First' : 'Most first'}
      </button>
      <div className={styles.itemList}>
        {sortedItems.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <img src={item.imageUrl} alt={item.name} className={styles.thumbnail} />
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.quantity}>Available: {item.quantityOnHand}</span>
          </div>
        ))}
      </div>
      <BackToTopButton />
    </div>
  );
};

export default Inventory;
