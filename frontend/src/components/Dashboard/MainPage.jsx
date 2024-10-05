// MainPage.js
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import EditMenu from './EditMenu';
import Inventory from './Inventory';
import Routes from './Routes';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [currentView, setCurrentView] = useState(() => {
    // Try to get the stored view from localStorage, default to 'addItem' if not found
    return localStorage.getItem('currentView') || 'addItem';
  });

  useEffect(() => {
    // Update localStorage whenever currentView changes
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.viewButton} ${currentView === 'addItem' ? styles.activeButton : ''}`}
          onClick={() => handleViewChange('addItem')}
        >
          Add Item
        </button>
        <button
          className={`${styles.viewButton} ${currentView === 'editMenu' ? styles.activeButton : ''}`}
          onClick={() => handleViewChange('editMenu')}
        >
          Edit Menu
        </button>
        <button
          className={`${styles.viewButton} ${currentView === 'inventory' ? styles.activeButton : ''}`}
          onClick={() => handleViewChange('inventory')}
        >
          Inventory
        </button>
        <button
          className={`${styles.viewButton} ${currentView === 'routes' ? styles.activeButton : ''}`}
          onClick={() => handleViewChange('routes')}
        >
          Routes
        </button>
      </div>
      <div className={styles.contentContainer}>
        {currentView === 'addItem' && <AddItem />}
        {currentView === 'editMenu' && <EditMenu />}
        {currentView === 'inventory' && <Inventory />}
        {currentView === 'routes' && <Routes />}
      </div>
    </div>
  );
};

export default MainPage;
