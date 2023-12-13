"use client"; // This is a client component
import React, { useEffect } from "react";
import useSWR from "swr";
import { Card, Layout } from "antd";
import Link from "next/link";

import IntlWrapper from "../../utils/intl-wrapper";

import Footer from "../../components/Footer/Footer";

const { Header, Content } = Layout;

const useSharedState = (key, initial) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: state, isLoading, mutate: setState } = useSWR(key, fetcher);

  if (isLoading) return { isLoading };
  return state?.data;
};

export default function StoreLayout({ params }) {
  const { storeName } = params;
  const businessInfo = useSharedState(
    storeName && `https://api-stg.sllr.co/business/${storeName}`
  );
  const products = useSharedState(
    businessInfo?._id &&
      `https://api-stg.sllr.co/products/v2/trending-products/${businessInfo._id}`
  );

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: "auto",
    paddingInline: 48,
    lineHeight: "30px",
    backgroundColor: "#4096ff",
  };

  return (
    <IntlWrapper>
      {businessInfo?.isLoading ? (
        <div>....Loading</div>
      ) : (
        <div>
          <Header style={headerStyle}>
            <div>{businessInfo?.storeInfo?.storeName}</div>
            <div>{businessInfo?.storeInfo?.description || "description"}</div>
            <img
              src={businessInfo?.storeInfo?.profileImage}
              style={{ maxWidth: 100 }}
            />
          </Header>
          <Content>
            <div className="content">
              {products?.products?.map((product, index) => (
                <Link href={`/${storeName}/${product.id}`}>
                  <Card
                    hoverable
                    className="br-product-card"
                    cover={
                      <div className="br-product-card-image">
                        <img
                          alt="product image"
                          src={
                            product?.images?.[0] || "/assets/icons/Product.svg"
                          }
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={product?.name || "-"}
                      description={`${product?.defaultPrice || 0} EGP`}
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </Content>
          <Footer businessInfo={businessInfo} />
        </div>
      )}
    </IntlWrapper>
  );
}
