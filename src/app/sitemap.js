import axios from "axios";

const fetchData = async ({ result, page }) => {
  try {
    let config = {
      method: "get",
      url: `https://api-stg.sllr.co/business/?page=${page}&limit=200`,
    };
    const {
      data: { data },
    } = await axios(config);
    const count = data.count;
    const stores = data.stores.map((store) => {
      return {
        url: `https://sllr.co/${store?.storeInfo?.storeLink || ""}`,
        lastModified: new Date(),
        priority: 1.0,
      };
    });
    result.push(...stores);
    if (result.length < count) {
      page += 1;
      await fetchData({ result, page });
    }
    return { count };
  } catch (error) {
    return {
      url: `https://sllr.co`,
      lastModified: new Date(),
    };
  }
};

export default async function Sitemap(params) {
  let result = [
    {
      url: `https://sllr.co`,
      lastModified: new Date(),
    },
  ];
  let page = 1;
  await fetchData({ result, page });
  console.log("he", result.length, page);
  return result;
}
