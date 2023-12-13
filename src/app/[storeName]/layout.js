import * as React from "react";
import axios from "axios";

export async function generateMetadata({ params }, parent) {
  const storeName = params?.storeName;
  let config = {
    method: "get",
    url: `https://api-stg.sllr.co/business/${storeName}`,
  };
  const response = await axios(config);
  const storeInfo = response?.data?.data?.storeInfo;
  const storeDesignData = response?.data?.data?.storeDesignData;
  return {
    // businessInfo.storeDesignData.variables.favIcon
    metadataBase: new URL(`http://localhost:3000/${storeName}`),
    title: storeInfo?.storeName,
    description: storeInfo?.description || "Test description",
    icons: {
      icon: storeDesignData?.variables?.favIcon || storeInfo?.profileImage,
      shortcut: storeDesignData?.variables?.favIcon || storeInfo?.profileImage,
    },
    image: storeDesignData?.variables?.favIcon || storeInfo?.profileImage,
    keywords: ["Next.js", "React", "JavaScript"],
    alternates: {
      canonical: "/",
      languages: {
        en: "?lang=en",
        ar: "?lang=ar",
      },
    },
    openGraph: {
      title: storeInfo?.storeName,
      url: storeInfo?.storeLink,
    },
    // keywords: blog.keywords,
  };
}

export default function layout({ children }) {
  return <>{children}</>;
}
