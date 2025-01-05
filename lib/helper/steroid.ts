import { backendApiPath } from "@/env";
import Cookies from "js-cookie";
import { showToast } from "./toast";
import { FormConfig, FormField, GroupedSelectOption } from "@/types/form";


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

const updateFormConfigOptions = (
  formConfig: FormConfig,
  fieldName: string,
  options: Record<string, any[]>,
  labelField: string,
  valueField: string,
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
                value: filteredOption[valueField],
            };
          delete filteredOption[labelField];
          delete filteredOption[valueField];

          if (fieldsToDelete && Array.isArray(fieldsToDelete)) {
              fieldsToDelete.forEach(fieldToDelete => {
                delete filteredOption[fieldToDelete];
              });
          }
          return { ...data, ...filteredOption };
        });

        tempOptions.push({
          group,
          options: groupOptions,
        });
      }
    }

    field.options = tempOptions;
  }
};

export {
  post,
  get,
  updateFormConfigOptions,
}