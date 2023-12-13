import * as React from "react";
import axios from "axios";

export async function generateMetadata({ params }, parent) {
  const productId = params?.productId;
  let config = {
    method: "get",
    url: `https://api-stg.sllr.co/products/v2/${productId}`,
  };
  const response = await axios(config);
  const productDetails = response?.data?.data;
  const category = productDetails?.category;
  return {
    metadataBase: new URL(
      `http://localhost:3000/${params.storeName}/${productId}`
    ),
    title: productDetails?.name,
    description: productDetails?.description || "Test description",
    icons: {
      icon:
        productDetails?.productsVariances?.[0]?.variantDefaultImage ||
        productDetails?.defaultImage,
      shortcut:
        productDetails?.productsVariances?.[0]?.variantDefaultImage ||
        productDetails?.defaultImage,
    },
    image:
      productDetails?.productsVariances?.[0]?.variantDefaultImage ||
      productDetails?.defaultImage,
    keywords: [
      category?.categoryName,
      category?.categoryNameAr,
      category?.subCategoryName,
    ],
    alternates: {
      canonical: `https:sllr.co/${params.storeName}/${productId}`,
      languages: {
        en: "?lang=en",
        ar: "?lang=ar",
      },
    },
    openGraph: {
      title: productDetails?.name,
      url: `https:sllr.co/${params.storeName}/${productId}`,
    },
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
