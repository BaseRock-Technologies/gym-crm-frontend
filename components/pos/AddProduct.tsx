import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { CustomSelect } from "../custom-select";
import {
  type FieldsToAddInOptions,
  type GroupedSelectOption,
  Product,
  type SelectOption,
} from "@/types/form";
import { productCustomAddOptionForm } from "./constants";

export interface AddProductProps {
  fieldName: string;
  value: SelectOption[];
  options: GroupedSelectOption[];
  handleFieldChange: (
    fieldName: string,
    value: any,
    customOptionsOfField: GroupedSelectOption[]
  ) => void;
}

export function AddProduct({
  fieldName,
  value = [],
  options = [],
  handleFieldChange,
}: AddProductProps) {
  const [products, setProducts] = useState<SelectOption[]>(
    value.length
      ? value
      : [
          {
            id: typeof window !== "undefined" && window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            label: "",
            value: "",
            price: "0",
            quantity: "0",
            total: "0",
          },
        ]
  );

  const handleTheUpdatedValue = (updatedOptions: SelectOption[]) => {
    const val = updatedOptions.map((product) => ({
      name: product.value,
      salesPrice: Number.parseFloat(product.price),
      quantity: Number.parseFloat(product.quantity),
      total: Number.parseFloat(product.total),
    }));
    handleFieldChange(fieldName, val, [
      { group: "default", options: updatedOptions },
    ]);
  };

  const handleAddProduct = () => {
    const newProduct: SelectOption = {
      id: typeof window !== "undefined" && window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      label: "",
      value: "",
      price: "0",
      quantity: "0",
      total: "0",
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    handleTheUpdatedValue(updatedProducts);
  };

  const handleRemoveProduct = (label: string) => {
    const updatedProducts = products.filter((p) => p.label !== label);
    setProducts(updatedProducts);
    handleTheUpdatedValue(updatedProducts);
  };

  const handleProductChange = (
    label: string,
    field: keyof SelectOption,
    newValue: string
  ) => {
    const updatedProducts = products.map((p, index) => {
      if (p.label === label) {
        const updatedProduct = { ...p, [field]: newValue };
        if (field === "price" || field === "quantity") {
          const price =
            field === "price"
              ? Number.parseFloat(newValue) || 0
              : Number.parseFloat(p.price) || 0;
          const quantity =
            field === "quantity"
              ? Number.parseInt(newValue, 10) || 0
              : Number.parseInt(p.quantity, 10) || 0;
          updatedProduct.total = (price * quantity).toFixed(2);
        }
        if (field === "value") {
          const selectedProduct = options
            .flatMap((option) => option.options)
            .find((ele) => ele.value === newValue);
          if (selectedProduct) {
            const productSalesPrice = selectedProduct.productSalesPrice ?? "0";
            updatedProduct.label = `${
              selectedProduct.label
            }-${crypto.randomUUID()}`;
            updatedProduct.value = selectedProduct.value;
            updatedProduct.price = productSalesPrice;
            updatedProduct.quantity = "1";
            updatedProduct.total = (
              Number.parseFloat(productSalesPrice) * 1
            ).toFixed(2);
          }
        }
        return updatedProduct;
      }
      return p;
    });
    setProducts(updatedProducts);
    handleTheUpdatedValue(updatedProducts);
  };

  const handleAddCustomOption = (fields: string[], value: string[]) => {
    const fieldsObject = fields.reduce((acc, field, index) => {
      acc[field] = value[index];
      return acc;
    }, {} as Record<string, string>);
    const id = crypto.randomUUID();
    const newProduct: SelectOption = {
      id,
      label: `${fieldsObject.productName}-${id}`,
      value: fieldsObject.productName,
      price: fieldsObject.productSalesPrice.toString(),
      quantity: "1",
      total: fieldsObject.productSalesPrice.toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    handleTheUpdatedValue(updatedProducts);
  };

  return (
    <div className="relative w-full space-y-4 shadow-md pb-4 rounded-md overflow-hidden">
      <div className="overflow-x-auto scrollbar-none">
        <div className="w-full min-w-[640px] grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center bg-tertriary text-white p-4 rounded-t-md">
          <div className="font-bold">Product</div>
          <div className="font-bold">Price</div>
          <div className="font-bold">Quantity</div>
          <div className="font-bold">Total</div>
          <div className="w-8"></div>
        </div>

        {products.map((product, index) => (
          <div
            key={product.label || index}
            className="w-full min-w-[640px] grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-4 py-2 mt-4"
          >
            <CustomSelect
              fieldName={`product-${product.label}`}
              options={options}
              value={product.value}
              onChange={(value) =>
                handleProductChange(product.label, "value", value)
              }
              placeholder="Select Product"
              disabled={false}
              allowAddCustomOption={true}
              customAddOptionsGroups={["default"]}
              addCustomOptionForm={{
                default: productCustomAddOptionForm,
              }}
              primaryFields={{
                default: [
                  "productName",
                  "productMrp",
                  "productSalesPrice",
                  "productBarcode",
                ],
              }}
              apiData={{
                apiPath: "product/create",
                method: "POST",
              }}
              onAddCustomOption={(
                fieldName: string,
                fields: string[],
                value: string[],
                group: string,
                fieldsInOptions: FieldsToAddInOptions,
                additionalFieldsToFocus: Array<string>,
                additionalValuesToFocus: Array<string | number>
              ) => handleAddCustomOption(fields, value)}
            />
            <Input
              type="number"
              value={product.price}
              onChange={(e) =>
                handleProductChange(product.label, "price", e.target.value)
              }
              className="text-left"
              readOnly
              placeholder="0.00"
            />
            <Input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                handleProductChange(product.label, "quantity", e.target.value)
              }
              className="text-left"
              placeholder="0"
            />
            <Input
              type="text"
              value={product.total}
              readOnly
              className="text-left"
              placeholder="0.00"
            />
            <div className="w-8">
              {products.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveProduct(product.label)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="relative w-full flex justify-end items-center px-4">
        <Button
          type="button"
          onClick={handleAddProduct}
          className="bg-primary text-white ml-auto"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
