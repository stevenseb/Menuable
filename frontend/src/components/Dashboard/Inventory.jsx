import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems, updateItemQuantity } from '../../store/item';
import styles from './Inventory.module.css';
import BackToTopButton from '../UI/BackToTopButton';

const Inventory = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.menu.items);
  const status = useSelector(state => state.menu.status);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingItemId, setEditingItemId] = useState(null);
  const [quantityInput, setQuantityInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, status]);

  // Focus the input when editing starts
  useEffect(() => {
    if (editingItemId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingItemId]);

  const handleQuantityBlur = useCallback(async (itemId) => {
    console.log('Blur event triggered for item:', itemId);
    if (quantityInput !== '') {
      console.log('Dispatching update with quantity:', quantityInput);
      try {
        await dispatch(updateItemQuantity({ id: itemId, quantityOnHand: parseInt(quantityInput, 10) }));
        console.log('Update successful');
      } catch (error) {
        console.error('Update failed:', error);
      }
      setEditingItemId(null);
    } else {
      console.log('No changes made to quantity.');
    }
   }, [dispatch, quantityInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        console.log('Clicked outside, closing edit mode');
        handleQuantityBlur(editingItemId);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, editingItemId, handleQuantityBlur]);

  const inventoryItems = items.filter(item => item.quantityOnHand > 0);

  const sortedItems = [...inventoryItems].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.quantityOnHand - b.quantityOnHand
      : b.quantityOnHand - a.quantityOnHand;
  });

  const handleSortToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleQuantityClick = (itemId, currentQuantity) => {
    console.log(`Editing quantity for item ID: ${itemId}`);
    setEditingItemId(itemId);
    setQuantityInput(currentQuantity.toString());
  };

  const handleQuantityChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setQuantityInput(e.target.value);
    }
  };

  return (
    <div className={styles.inventory}>
      <h2 className={styles.heading}>Inventory</h2>
      <button onClick={handleSortToggle} className={styles.sortButton}>
        Sort by Quantity: {sortOrder === 'asc' ? 'Most First' : 'Least first'}
      </button>
      <div className={styles.itemList}>
        {sortedItems.map(item => (
          <div key={item.id} className={styles.itemRow}>
            <img src={item.imageUrl} alt={item.name} className={styles.thumbnail} />
            <span className={styles.itemName}>{item.name}</span>
            {editingItemId === item.id ? (
              <input
                ref={inputRef}
                type="text"
                value={quantityInput}
                onChange={handleQuantityChange}
                onBlur={() => handleQuantityBlur(item.id)}
                className={styles.quantityInput}
              />
            ) : (
              <span
                className={styles.quantity}
                onClick={() => handleQuantityClick(item.id, item.quantityOnHand)}
              >
                Available: {item.quantityOnHand}
              </span>
            )}
          </div>
        ))}
      </div>
      <BackToTopButton />
    </div>
  );
};

export default Inventory;
