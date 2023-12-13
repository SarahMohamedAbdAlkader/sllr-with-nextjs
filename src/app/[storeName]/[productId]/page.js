"use client"; // This is a client component
import useSWR from "swr";
import { Card } from "antd";

const useSharedState = (key, initial) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  console.log({ key });
  const { data: state, isLoading, mutate: setState } = useSWR(key, fetcher);

  if (isLoading) return { isLoading };
  return state?.data;
};

const SlugPage = ({ params }) => {
  const { storeName, productId } = params;

  const product = useSharedState(
    productId && `https://api-stg.sllr.co/products/v2/${productId}`
  );

  return (
    <div>
      <Card
        hoverable
        className="br-product-card"
        cover={
          <div className="br-product-card-image">
            <img
              alt="product image"
              src={product?.images?.[0] || "/assets/icons/Product.svg"}
            />
          </div>
        }
      >
        <Card.Meta
          title={product?.name || "-"}
          description={`${product?.defaultPrice || 0} EGP`}
        />
      </Card>
    </div>
  );
};

export default SlugPage;
