export type StorefrontProduct = {
  name?: unknown;
  price?: unknown;
  stock?: unknown;
  images?: unknown;
};

const blockedDemoNames = new Set(["dssa", "zxcv", "sdv", "sf", "ksj", "amkndsn", "ke koy", "layla"]);

export function isStorefrontReady(product: StorefrontProduct) {
  return Boolean(
    product &&
      typeof product.name === "string" &&
      product.name.trim().length >= 4 &&
      !blockedDemoNames.has(product.name.trim().toLowerCase()) &&
      Number(product.price) > 0 &&
      Number(product.stock) > 0 &&
      Array.isArray(product.images) &&
      product.images[0]
  );
}
