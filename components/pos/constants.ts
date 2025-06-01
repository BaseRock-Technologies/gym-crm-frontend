import type { FormConfig } from "@/types/form"
import { ClientCustomAddOptionForm } from "../custom-form-options-constants"

export const productCustomAddOptionForm: FormConfig = {
  id: "add-product",
  title: "Add Product",
  fields: [
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      required: true,
      placeholder: "product",
    },
    {
      name: "productMrp",
      label: "MRP Price",
      type: "number",
      required: true,
      placeholder: "0.00",
    },
    {
      name: "productSalesPrice",
      label: "Sale Price",
      type: "number",
      required: true,
      placeholder: "0.00",
    },
    {
      name: "productBarcode",
      label: "Barcode",
      type: "text",
      required: true,
      placeholder: "Barcode",
    },
  ],
};

export const purchaseCustomAddOptionForm: FormConfig = {
  id: "add-vendor",
  title: "Add Vendor",
  fields: [
    {
      name: "vendorName",
      label: "Vendor Name",
      type: "text",
      required: true,
      placeholder: "Vendor Name",
    },
    {
      name: "contact",
      label: "Contact",
      type: "phone",
      required: true,
      placeholder: "Contact",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Address",
    },
    {
      name: "gstNumber",
      label: "GST Number",
      type: "text",
      placeholder: "GST Number",
    },
    {
      name: "companyDetails",
      label: "Company Details",
      type: "textarea",
      placeholder: "Company Details",
    },


    
  ],
};


export const ProductFormConfig: FormConfig = {
  id: "product-form",
  title: "Create Bill",
  fields: [
    {
      name: "invoiceNo",
      label: "Invoice No.",
      type: "text",
      editable: false,
      placeholder: "Enter Invoice Number",
    },
    {
      name: "billDate",
      label: "Bill Date",
      type: "date",
    },
    {
        name: "clientName",
        label: "Client",
        options: [],
        type: "select",
        required: true,
        placeholder: "Select Client Name",
        allowAddCustomOption: true,
        customAddOptionsGroups: ["default"],
        addCustomOptionForm: {
          "default": ClientCustomAddOptionForm,
        },
        primaryFieldValues: {
          "default": ["clientName", "contactNumber"]
        },
        combinePrimaryFields: true,
        apiConfig: {
          apiPath: "client/create",
          method: "POST",
        },
    },
    {
      name: "productDetails",
      label: "",
      type: "products",
      options: [],
    },
    {
      name: "subTotal",
      label: "Subtotal",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "productDetails",
        formula: (_, options) => {
          const calculatedValue = options?.reduce(
            (acc: number, product: any) =>
              acc + parseFloat(product.total || "0"),
            0
          );
          return calculatedValue ?? 0;
        },
      }
    },
    {
      name: "discount",
      label: "Discount",
      type: "decimal",
      required: false,
      defaultValue: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "taxName",
      label: "Tax (in %)",
      type: "select",
      required: false,
      placeholder: "Select Taxes",
      options: [
        {
          group: "Exclusive Taxes",
          options: [
            { label: "Goods and service tax (0%)", value: "Goods and service tax (0%)", chargesPercentage: 0}
          ],
        },
        {
          group: "Inclusive Taxes",
          options: [
            { label: "Goods and service tax (18%)", value: "Goods and service tax (18%)", chargesPercentage: 18}
          ],
        },
      ],
    },
    {
      name: "misc",
      label: "Misc",
      type: "decimal",
      required: false,
      defaultValue: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "totalAmount",
      label: "Total amount",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "misc, taxName, discount, subTotal, productDetails",
        formula: (values, options) => {
          const taxPercentage = options?.find((opt) => opt.value === values.taxName)?.chargesPercentage ?? 0;
          const { misc = "0", discount = "0", subTotal = "0" } = values;
          
          let totalAmount = parseFloat(misc)  + (parseFloat(subTotal) - parseFloat(discount));
          if (taxPercentage > 0) {
            totalAmount += totalAmount * (taxPercentage / 100);
          }
          return totalAmount.toFixed(2);
        },
      }
    },
    {
      name: "amountPaid",
      label: "Amount paid",
      type: "decimal",
      placeholder: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "paymentMode",
      label: "Payment method",
      type: "select",
      placeholder: "Select payment method",
      options: [],
    },
    {
      name: "pendingPayment",
      label: "Pending payment",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "misc, taxName, discount, subTotal, totalAmount, amountPaid, productDetails",
        formula: (values, _) => {
          const calculatedValue = (Number.parseInt(values.totalAmount || "0") - Number.parseInt(values.amountPaid || "0"))
          return calculatedValue.toFixed(2)
        },
      }
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Write notes here...",
    },
    {
      name: "sendWhatsApp",
      label: "Send WhatsApp",
      type: "checkbox",
      defaultValue: false,
      labelPos: "left"
    },
  ],
  groups: [
    {
      id: "productInvoice",
      title: "Products",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: ["invoiceNo", "billDate", "clientName" ],
    },
    {
      id: "products",
      title: "Products",
      type: "single-line",
      fields: ["productDetails"],
    },
    {
      id: "payment",
      title: "Payment Details",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: [
        "subTotal",
        "discount",
        "taxName",
        "misc",
        "totalAmount",
        "amountPaid",
        "paymentMode",
        "pendingPayment",
        "notes",
      ],
    },
    {
      id: "action",
      title: "whatsappAction",
      type: "action-group",
      fields: [
        "sendWhatsApp",
      ],
    },
  ],
}

export const PosPurchaseFormConfig: FormConfig = {
  id: "pos-product-form",
  title: "Purchase from vendor / Add stock",
  fields: [
    {
      name: "vendorName",
      label: "Product vendor name",
      type: "select",
      required: true,
      placeholder: "Select Vendor",
      allowAddCustomOption: true,
      customAddOptionsGroups: ["default"],
      addCustomOptionForm: {
        "default": purchaseCustomAddOptionForm,
      },
      primaryFieldValues: {
        "default": ["vendorName"]
      },
      apiConfig: {
        apiPath: "product/vendor/create",
        method: "POST",
      },
    },
    {
      name: "invoiceByVendor",
      label: "Invoice give by vendor",
      type: "text",
      required: true,
    },
    {
      name: "purchaseDate",
      label: "Date of purchase",
      type: "date",
    },
    {
      name: "productDetails",
      label: "",
      type: "products",
      options: [],
    },
    {
      name: "subTotal",
      label: "Subtotal",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "productDetails",
        formula: (_, options) => {
          const calculatedValue = options?.reduce(
            (acc: number, product: any) =>
              acc + parseFloat(product.total || "0"),
            0
          );
          return calculatedValue ?? 0;
        },
      }
    },
    {
      name: "discount",
      label: "Discount",
      type: "decimal",
      required: false,
      defaultValue: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "taxName",
      label: "Tax (in %)",
      type: "select",
      required: false,
      placeholder: "Select Taxes",
      options: [
        {
          group: "Exclusive Taxes",
          options: [
            { label: "Goods and service tax (0%)", value: "Goods and service tax (0%)", chargesPercentage: 0}
          ],
        },
        {
          group: "Inclusive Taxes",
          options: [
            { label: "Goods and service tax (18%)", value: "Goods and service tax (18%)", chargesPercentage: 18}
          ],
        },
      ],
    },
    {
      name: "misc",
      label: "Misc",
      type: "decimal",
      required: false,
      defaultValue: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "shippingCharges",
      label: "Shipping Charges",
      type: "decimal",
      required: false,
      defaultValue: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "totalCharges",
      label: "Total Charges",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "misc,shippingCharges, taxName, discount, subTotal, productDetails",
        formula: (values, options) => {
          console.log(values)
          const taxPercentage = options?.find((opt) => opt.value === values.taxName)?.chargesPercentage ?? 0;
          const { misc = "0", discount = "0", subTotal = "0", shippingCharges = "0" } = values;
          
          let totalAmount =  (parseFloat(subTotal) - parseFloat(discount)) + parseFloat(misc) + parseFloat(shippingCharges) ;
          if (taxPercentage > 0) {
            totalAmount += totalAmount * (taxPercentage / 100);
          }
          return totalAmount.toFixed(2);
        },
      }
    },
    {
      name: "amountPaid",
      label: "Amount paid",
      type: "decimal",
      placeholder: "0.00",
      validation: {
        min: 0,
      },
    },
    {
      name: "paymentMode",
      label: "Payment method",
      type: "select",
      placeholder: "Select payment method",
      options: [],
    },
    {
      name: "cerdit",
      label: "Credit",
      type: "decimal",
      editable: false,
      defaultValue: "0.00",
      dependsOn: {
        field: "misc, shippingCharges, taxName, discount, subTotal, totalCharges, amountPaid, productDetails",
        formula: (values, _) => {
          const calculatedValue = (Number.parseInt(values.totalCharges || "0") - Number.parseInt(values.amountPaid || "0"))
          return calculatedValue.toFixed(2)  
        },
      }
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Write notes here...",
    },
  ],
  groups: [
    {
      id: "vendorInvoice",
      title: "Vendor Details",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: ["vendorName", "invoiceByVendor", "purchaseDate" ],
    },
    {
      id: "products",
      title: "Products",
      type: "single-line",
      fields: ["productDetails"],
    },
    {
      id: "payment",
      title: "Payment Details",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: [
        "subTotal",
        "discount",
        "taxName",
        "misc",
        "shippingCharges",
        "totalCharges",
        "amountPaid",
        "paymentMode",
        "cerdit",
        "notes",
      ],
    },
  ],
}

export const CreateNewProductFormConfig: FormConfig = {
  id: "new-product-form",
  title: "Add New Product",
  fields: [
    {
      name: "productName",
      label: "Product Name",
      required: true,
      type: "text",
      placeholder: "product Name",
    },
    {
      name: "productImage",
      label: "Product Image",
      type: "image",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "productMrp",
      label: "MRP Price",
      required: true,
      type: "number",
      placeholder: "5000",
    },
    {
      name: "productMrpImage",
      label: "MRP Image",
      type: "image",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "productSalesPrice",
      label: "Sales Price",
      required: true,
      type: "number",
      placeholder: "5000",
    },
    {
      name: "productSalesImage",
      label: "Sales Price Image",
      type: "image",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "productBarcode",
      label: "Barcode",
      required: true,
      type: "text",
      placeholder: "5000",
    },
    {
      name: "productBarcodeImage",
      label: "Barcode Image",
      type: "image",
      maxSize: 5 * 1024 * 1024,
    },
    {
      name: "description",
      label: "description",
      type: "textarea",
    },
    {
      name: "manageInventory",
      label: "Manage Inventory",
      type: "checkbox",
      defaultValue: true,
      labelPos: "left"
    },
  ],
  groups: [
    {
      id: "productPrice",
      title: "Price Details",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: [
        "productName",
        "productMrp",
        "productSalesPrice",
        "productBarcode",
      ],
    },
    {
      id: "description",
      title: "Description",
      type: "single-line",
      fields: ["description"],
    },
    {
      id: "productPriceImages",
      title: "Price Image Details",
      type: "background",
      backgroundColor: "bg-transparent",
      fields: [
        "productImage",
        "productMrpImage",
        "productSalesImage",
        "productBarcodeImage",
      ],
    },
    {
      id: "action",
      title: "manageInventory",
      type: "action-group",
      fields: [
        "manageInventory",
      ],
    },
  ],
}