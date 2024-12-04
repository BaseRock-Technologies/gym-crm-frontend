import { backendApiPath } from "@/env";

type customObject = { [key: string]: any };


const getSession = (key: string): string | null => localStorage.getItem(key);

const setSession = (key: string, value: string) => localStorage.setItem(key, value);

const authTokenAppend = (data: customObject) => {
  const token = getSession('authtoken');
  const newData = { ...data };

  if (!('authtoken' in newData) && token) {
    newData.authtoken = token;
  } else if ('authtoken' in newData) {
    setSession('authtoken', newData.authtoken);
  }

  return newData;
};

const post = async (postData: customObject, apiPath: string, validateResponse: boolean = true) => {
  try {
      const jsonData = authTokenAppend(postData);
      console.log(backendApiPath);

      const response = await fetch(`${backendApiPath}/${apiPath}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ myData: jsonData }),
      });

      if (!response.ok) {
          if (response.status === 401) {
              localStorage.clear();
              setTimeout(() => {
                  window.location.href = "/signin";
              }, 6000);
              throw new Error('Unauthorized');
          }
          throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      if (validateResponse && responseData.message === 'access_denied') {
          localStorage.clear();
          throw new Error('Access denied');
      }

      return responseData;
  } catch (error) {
      console.error('Error:', error);
  }
};


export {
  getSession,
  setSession,
  post,
}