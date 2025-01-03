import { backendApiPath } from "@/env";
import Cookies from "js-cookie";
import { showToast } from "./toast";


type customObject = { [key: string]: any };


const authTokenAppend = (data: customObject) => {
  const userData = Cookies.get('user');
  const newData = { ...data };
  if (userData) {
    const { authToken } = JSON.parse(userData)
    if (!('authtoken' in newData) && authToken) {
      newData.authToken = authToken;
    } 
    return newData;
  }
  // newData.authToken = null;
  return data;
};

const post = async (postData: customObject, apiPath: string, validateResponse: boolean = true) => {
  try {
      const jsonData = authTokenAppend(postData);

      const response = await fetch(`${backendApiPath}/${apiPath}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ myData: jsonData }),
      });

      if (!response.ok) {
          if (response.status === 401) {
              Cookies.remove('user');
              setTimeout(() => {
                  window.location.href = "/signin";
              }, 6000);
              throw new Error('Unauthorized');
          }
          throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      if (validateResponse && responseData.status === 'unauthorized') {
          Cookies.remove('user');
          showToast("error", "Access Denied");
      }

      return responseData;
  } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: 'Failed to fetch' };
  }
};

const get = async (apiPath: string, validateResponse: boolean = true) => {
  try {
      const response = await fetch(`${backendApiPath}/${apiPath}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          if (response.status === 401) {
              Cookies.remove('user');
              setTimeout(() => {
                  window.location.href = "/signin";
              }, 6000);
              throw new Error('Unauthorized');
          }
          throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      if (validateResponse && responseData.status === 'unauthorized') {
          Cookies.remove('user');
          showToast("error", "Access Denied");
      }

      return responseData;
  } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: 'Failed to fetch' };
  }
};


export {
  post,
  get,
}