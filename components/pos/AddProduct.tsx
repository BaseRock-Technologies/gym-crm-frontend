import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { CustomSelect } from "../custom-select";
import type { GroupedSelectOption } from "@/types/form";

interface Product {
  id: string;
  product: string;
  price: string;
  quantity: string;
  total: string;
}

interface AddProductProps {
  value: Product[];
  options: GroupedSelectOption[];
}

export function AddProduct({ value = [], options = [] }: AddProductProps) {
  const [products, setProducts] = useState<Product[]>(
    value.length
      ? value
      : [
          {
            id: "1",
            product: "",
            price: "",
            quantity: "",
            total: "",
          },
        ]
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: `product-${products.length + 1}`,
      product: "",
      price: "",
      quantity: "",
      total: "",
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  };

  const handleRemoveProduct = (id: string) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
  };

  const handleProductChange = (
    id: string,
    field: keyof Product,
    value: string
  ) => {
    const updatedProducts = products.map((p) => {
      if (p.id === id) {
        const updatedProduct = { ...p, [field]: value };
        if (field === "price" || field === "quantity") {
          const price =
            Number.parseFloat(field === "price" ? value : p.price) || 0;
          const quantity =
            Number.parseInt(field === "quantity" ? value : p.quantity) || 0;
          updatedProduct.total = (price * quantity).toFixed(2);
        }
        if (field === "product") {
          const salesPrice =
            options
              .flatMap((option) => option.options)
              .find((ele) => ele.value === value)?.productSalesPrice || 0;
          updatedProduct.price = salesPrice;
          updatedProduct.quantity = "1";
          updatedProduct.total = (salesPrice * 1).toFixed(2);
        }
        return updatedProduct;
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="relative w-full space-y-4 shadow-md pb-4 rounded-md">
      <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center bg-primary text-white p-4 rounded-t-md">
        <div className="font-bold">Product</div>
        <div className="font-bold">Price</div>
        <div className="font-bold">Quantity</div>
        <div className="font-bold">Total</div>
        <div className="w-8"></div>
      </div>

      {products.map((product, index) => (
        <div
          key={product.id}
          className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-4"
        >
          <CustomSelect
            fieldName={`product-${product.id}`}
            options={options}
            value={product.product}
            onChange={(value) =>
              handleProductChange(product.id, "product", value)
            }
            placeholder="Select Product"
            disabled={false}
          />
          <Input
            type="number"
            value={product.price}
            onChange={(e) =>
              handleProductChange(product.id, "price", e.target.value)
            }
            className="text-left"
            readOnly
            placeholder="0.00"
          />
          <Input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              handleProductChange(product.id, "quantity", e.target.value)
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
                onClick={() => handleRemoveProduct(product.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
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
