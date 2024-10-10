import axios from "axios";

const BASE_HOSTNAME = "storage.bunnycdn.com";
const HOSTNAME = BASE_HOSTNAME;
const STORAGE_ZONE_NAME = "comideria-russa";
const ACCESS_KEY = import.meta.env.VITE_BUNNY_CDN_ACCESS_KEY;

const uploadFile = async (file, fileName) => {
  const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${fileName}`;
  const payload = file;

  const response = await axios.put(url, payload, {
    headers: {
      AccessKey: ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
  });

  return response.data;
};

export default uploadFile;
