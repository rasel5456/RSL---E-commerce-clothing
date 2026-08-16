"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const availableSizes = ["S", "M", "L", "XL", "XXL"];

interface ColorVariant {
  color: string;
  image: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("unisex");
  const [stock, setStock] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  const [newColorName, setNewColorName] = useState("");
  const [uploadingColorImage, setUploadingColorImage] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/products/${id}`);
      const data = await res.json();

      if (data.success) {
        const p = data.product;
        setName(p.name);
        setDescription(p.description);
        setPrice(String(p.price));
        setDiscountPrice(p.discount_price ? String(p.discount_price) : "");
        setCategory(p.category);
        setGender(p.gender || "unisex");
        setStock(String(p.stock));
        setSelectedSizes(p.sizes || []);

        const colorImagesObj = p.color_images || {};
        const variants: ColorVariant[] = Object.keys(colorImagesObj).map((colorName) => ({
          color: colorName,
          image: colorImagesObj[colorName],
        }));
        setColorVariants(variants);
      } else {
        setError("Product not found");
      }
      setFetching(false);
    };

    fetchProduct();
  }, [id]);

  const handleColorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!newColorName.trim()) {
      setError("Please type a color name before uploading its image");
      e.target.value = "";
      return;
    }

    setUploadingColorImage(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadingColorImage(false);

    if (data.success) {
      setColorVariants((prev) => [...prev, { color: newColorName.trim(), image: data.url }]);
      setNewColorName("");
    } else {
      setError(data.message || "Image upload failed");
    }

    e.target.value = "";
  };

  const removeColorVariant = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (colorVariants.length === 0) {
      setError("Please add at least one color with an image");
      return;
    }

    setLoading(true);

    const colorImagesObj: { [key: string]: string } = {};
    colorVariants.forEach((v) => {
      colorImagesObj[v.color] = v.image;
    });

    const payload = {
      name,
      description,
      price: Number(price),
      discount_price: discountPrice ? Number(discountPrice) : null,
      category,
      gender,
      stock: Number(stock),
      sizes: selectedSizes,
      colors: colorVariants.map((v) => v.color),
      color_images: colorImagesObj,
      images: colorVariants.map((v) => v.image),
    };

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/products");
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/products");
    } else {
      setError(data.message || "Delete failed");
    }
  };

  if (fetching) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Price (Taka)</label>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Discount Price (Taka) - optional</label>
          <input
            type="text"
            inputMode="numeric"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value.replace(/[^0-9]/g, ""))}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Stock (Quantity)</label>
          <input
            type="text"
            inputMode="numeric"
            value={stock}
            onChange={(e) => setStock(e.target.value.replace(/[^0-9]/g, ""))}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Sizes</label>
          <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
            {availableSizes.map((size) => (
              <label
                key={size}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  border: selectedSizes.includes(size) ? "2px solid #9C7A44" : "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "15px", border: "1px solid #ddd", borderRadius: "8px", padding: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Colors & Their Photos</label>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px", marginBottom: "12px" }}>
            Type a color name, then choose a photo of the product in that color.
          </p>

          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="e.g. Black"
              style={{ flex: 1, padding: "8px" }}
            />
            <label
              style={{
                padding: "8px 14px",
                backgroundColor: uploadingColorImage ? "#ccc" : "#9C7A44",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {uploadingColorImage ? "Uploading..." : "+ Add Photo"}
              <input type="file" accept="image/*" onChange={handleColorImageUpload} style={{ display: "none" }} disabled={uploadingColorImage} />
            </label>
          </div>

          {colorVariants.length > 0 ? (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
              {colorVariants.map((variant, index) => (
                <div key={index} style={{ position: "relative", textAlign: "center" }}>
                  <img
                    src={variant.image}
                    alt={variant.color}
                    style={{ width: "70px", height: "88px", objectFit: "cover", borderRadius: "5px", border: "1px solid #ddd" }}
                  />
                  <p style={{ fontSize: "12px", margin: "4px 0 0 0" }}>{variant.color}</p>
                  <button
                    type="button"
                    onClick={() => removeColorVariant(index)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#c0392b",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {error ? <p style={{ color: "red" }}>{error}</p> : null}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading || uploadingColorImage}
            style={{
              padding: "10px 20px",
              backgroundColor: "#9C7A44",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Saving..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: "10px 20px",
              backgroundColor: "#c0392b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}
