import axios from 'axios';

export const getImageBuffer = async (url: string): Promise<Buffer> => {
  const axiosResponse = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(axiosResponse.data, 'binary');
};
