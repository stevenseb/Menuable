import { useState } from 'react';
import { useDispatch } from 'react-redux';
import uploadFile from '../utils';
import { addItem } from '../../store/item';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measure, setMeasure] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageFilename = '';

    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      await uploadFile(formData, image.name); // Removed the response variable
      imageFilename = image.name;
    }

    const newItem = {
      name,
      description,
      price,
      quantity,
      measure,
      quantityOnHand,
      costPerUnit,
      imageFilename,
    };

    dispatch(addItem(newItem));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
      <input type="text" value={measure} onChange={(e) => setMeasure(e.target.value)} placeholder="Measure" required />
      <input type="number" value={quantityOnHand} onChange={(e) => setQuantityOnHand(e.target.value)} placeholder="Quantity On Hand" required />
      <input type="number" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} placeholder="Cost Per Unit" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AdminPanel;
