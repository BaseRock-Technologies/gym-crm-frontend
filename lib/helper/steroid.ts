import { backendApiPath } from "@/env";
import Cookies from "js-cookie";
import { showToast } from "./toast";
import { FieldDependency, FormConfig, FormField, GroupedSelectOption } from "@/types/form";


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

const post = async (postData: customObject, apiPath: string,  errorMsg: string = "Failed to process data", validateResponse: boolean = true) => {
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

      if(responseData.status === "error") {
        showToast("error", errorMsg, { toastId: "88f94e97-568d-4159-bd2d-a411c3407e9e"});
      }


      return responseData;
  } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: 'Failed to fetch' };
  }
};

const patch = async (postData: customObject, apiPath: string, errorMsg: string = "Failed to process data", validateResponse: boolean = true) => {
  try {
      const jsonData = authTokenAppend(postData);

      const response = await fetch(`${backendApiPath}/${apiPath}`, {
          method: 'PATCH',
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
          showToast("error", "Access Denied", { toastId: "ba3ed155-c109-43a8-b7d1-7fda55c3f3f2"});
      }

      if(responseData.status === "error") {
        showToast("error", errorMsg, { toastId: "88f94e97-568d-4159-bd2d-a411c3407e9e"});
      }

      return responseData;
  } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: 'Failed to fetch' };
  }
};

const get = async (apiPath: string,errorMsg: string = "Failed to process data",  validateResponse: boolean = true) => {
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

      if(responseData.status === "error") {
        showToast("error", errorMsg, { toastId: "88f94e97-568d-4159-bd2d-a411c3407e9e"});
      }


      return responseData;
  } catch (error) {
      console.error('Error:', error);
      return { status: 'error', message: 'Failed to fetch' };
  }
};

const updateFormConfigOptions = (
  formConfig: FormConfig,
  fieldName: string,
  options: Record<string, any[]>,
  labelField: string,
  fieldsToDelete?: string[]
) => {
  const field: FormField | undefined = formConfig.fields.find((item) => item.name === fieldName);
  if (field) {
    const tempOptions: GroupedSelectOption[] = [];

    for (const group in options) {
      if (options.hasOwnProperty(group)) {
        const groupOptions = options[group].map(option => {
            const { ...filteredOption } = option;
            const data = {
                label: filteredOption[labelField],
                value: filteredOption[labelField],
            };
          delete filteredOption[labelField];
          delete filteredOption[labelField];

          if (fieldsToDelete && Array.isArray(fieldsToDelete)) {
              fieldsToDelete.forEach(fieldToDelete => {
                delete filteredOption[fieldToDelete];
              });
          }
          return { ...data, ...filteredOption };
        });

        const uniqueGroupOptions = Array.from(new Set(groupOptions.map(item => item.value)))
          .map(value => groupOptions.find(item => item.value === value));

        tempOptions.push({
          group,
          options: uniqueGroupOptions,
        });
      }
    }

    field.options = tempOptions;
  }
};

function deepEqualObjs(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqualObjs(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export {
  post,
  get,
  patch,
  updateFormConfigOptions,
  deepEqualObjs
}