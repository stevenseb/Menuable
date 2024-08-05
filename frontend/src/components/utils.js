import axios from 'axios';

const REGION = 'ny';
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = 'comideria-russa';
const ACCESS_KEY = import.meta.env.VITE_BUNNY_CDN_ACCESS_KEY; // Use Vite's import.meta.env for environment variables

const uploadFile = async (file, fileName) => {
  const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${fileName}`;
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.put(url, formData, {
    headers: {
      'AccessKey': ACCESS_KEY,
      'Content-Type': 'application/octet-stream',
    },
  });

  return response.data;
};

export default uploadFile;
