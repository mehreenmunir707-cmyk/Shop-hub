export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    const url =
      "https://www.mkcosmetics.com.pk/collections/shop-all/products.json?limit=250";

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `MK Cosmetics returned ${response.status}`
      );
    }

    const data = await response.json();

    const products = Array.isArray(data.products)
      ? data.products
      : [];

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("MK Products API Error:", error);

    return res.status(500).json({
      error: "Unable to fetch MK Cosmetics products.",
      message: error.message,
    });
  }
}