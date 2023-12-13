"use client"; // This is a client component

import useSWR from "swr";
import { Button, Layout } from "antd";
import Footer from "../../components/Footer/Footer";

import IntlWrapper from "../../utils/intl-wrapper";
import React from "react";
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
            <img src={businessInfo?.storeInfo?.profileImage}/>
          </Header>
          <Footer businessInfo={businessInfo} />
        </div>
      )}
    </IntlWrapper>
  );
}
