import type { FormConfig, Product } from "@/types/form"
import { ClientCustomAddOptionForm } from "../custom-form-options-constants"

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
          "default": ClientCustomAddOptionForm.fields.map(
            (item) => item.name
          )
        },
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
          const taxPercentage = options?.find((opt) => opt.value === values.taxName)
          ?.chargesPercentage ?? 0
            let totalAmount = (values.misc || 0) - (values.discount || 0) + (values.subTotal || 0 );
            if(taxPercentage  > 0) {
                totalAmount += totalAmount * (taxPercentage / 100)
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
      name: "paymentMethod",
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
          console.log(values)
            return (Number.parseInt(values.totalAmount || "0") - Number.parseInt(values.amountPaid || "0")).toFixed(2)
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
        "paymentMethod",
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

