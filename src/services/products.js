const API_URL =
  "https://www.mkcosmetics.com.pk/products.json?limit=250";

let productsCache = null;
let productsPromise = null;

// ========================================
// NORMALIZE IMAGE URL
// ========================================

function normalizeImageUrl(url) {
  if (!url) return "";

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return url;
}

// ========================================
// GET PRODUCT IMAGE
// ========================================

function getProductImage(product) {
  // Shopify images array
  if (Array.isArray(product.images)) {
    const firstImage = product.images[0];

    if (typeof firstImage === "string") {
      return normalizeImageUrl(firstImage);
    }

    if (firstImage?.src) {
      return normalizeImageUrl(firstImage.src);
    }

    if (firstImage?.url) {
      return normalizeImageUrl(firstImage.url);
    }
  }

  // Shopify main image
  if (typeof product.image === "string") {
    return normalizeImageUrl(product.image);
  }

  if (product.image?.src) {
    return normalizeImageUrl(product.image.src);
  }

  if (product.image?.url) {
    return normalizeImageUrl(product.image.url);
  }

  // Other possible image fields
  if (product.image_link) {
    return normalizeImageUrl(product.image_link);
  }

  if (product.thumbnail) {
    return normalizeImageUrl(product.thumbnail);
  }

  return "";
}

// ========================================
// GET ALL PRODUCTS
// ========================================

export async function getProducts(signal) {
  // Return cached products
  if (productsCache) {
    return productsCache;
  }

  // Prevent duplicate requests
  if (productsPromise) {
    return productsPromise;
  }

  productsPromise = fetch(API_URL, {
    signal,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products: ${response.status}`
        );
      }

      return response.json();
    })

    .then((data) => {
      const rawProducts = Array.isArray(data.products)
        ? data.products
        : [];

      const products = rawProducts.map((product) => {
        const variant = product.variants?.[0];

        const mainImage =
          getProductImage(product);

        const allImages =
          Array.isArray(product.images)
            ? product.images
                .map((image) => {
                  if (typeof image === "string") {
                    return normalizeImageUrl(image);
                  }

                  return normalizeImageUrl(
                    image?.src || image?.url
                  );
                })
                .filter(Boolean)
            : [];

        return {
          id: product.id,

          title:
            product.title ||
            "Unnamed Product",

          description:
            product.body_html ||
            "No description available.",

          price:
            Number(variant?.price) || 0,

          oldPrice:
            Number(variant?.compare_at_price) || 0,

          image: mainImage,

          images:
            allImages.length > 0
              ? allImages
              : mainImage
              ? [mainImage]
              : [],

          category:
            product.product_type ||
            product.tags?.[0] ||
            "Other",

          brand:
            product.vendor ||
            "MK Cosmetics",

          tags:
            Array.isArray(product.tags)
              ? product.tags
              : [],

          handle:
            product.handle || "",

          variants:
            product.variants || [],

          available:
            product.variants?.some(
              (variant) =>
                variant.available
            ) || false,

          stock:
            product.variants?.reduce(
              (total, variant) =>
                total +
                (Number(
                  variant.inventory_quantity
                ) || 0),
              0
            ) || 0,
        };
      });

      // ========================================
      // PRODUCTS WITH IMAGES FIRST
      // ========================================

      const sortedProducts = [
        ...products.filter(
          (product) => product.image
        ),
        ...products.filter(
          (product) => !product.image
        ),
      ];

      productsCache = sortedProducts;

      // ========================================
      // CONSOLE INFORMATION
      // ========================================

      console.log(
        "================================="
      );

      console.log(
        "TOTAL PRODUCTS:",
        sortedProducts.length
      );

      console.log(
        "PRODUCTS WITH IMAGES:",
        sortedProducts.filter(
          (product) => product.image
        ).length
      );

      console.log(
        "PRODUCTS WITHOUT IMAGES:",
        sortedProducts.filter(
          (product) => !product.image
        ).length
      );

      console.log(
        "================================="
      );

      return sortedProducts;
    })

    .finally(() => {
      productsPromise = null;
    });

  return productsPromise;
}

// ========================================
// GET SINGLE PRODUCT
// ========================================

export async function getProductById(
  id,
  signal
) {
  const products =
    await getProducts(signal);

  return products.find(
    (product) =>
      String(product.id) ===
      String(id)
  );
}