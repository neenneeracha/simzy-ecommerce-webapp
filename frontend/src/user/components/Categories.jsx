/********************************************************************
 *
 * Categories.jsx
 *
 *    This file represents the product category components used
 *    on the homepage, which are female, male and kid.
 *
 ********************************************************************
 */

import React from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

const categories = [
  {
    id: 1,
    img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/fleece/22fw/img/men/mainImage_fluffyYarnFleeceFullZipJacket.jpg?20220812",
    title: "MEN",
    url: "/products?main_category=Men",
  },
  {
    id: 2,
    img: "https://im.uniqlo.com/global-cms/spa/res19d91b42311c47f14900d6959c70ae50fr.jpg",
    title: "WOMEN",
    url: "/products?main_category=Women",
  },
  {
    id: 3,
    img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/sweat/22fw/img/k-cotton-2.jpg?220805",
    title: "KIDS",
    url: "/products?main_category=Kids",
  },
];

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Container style={{ marginTop: "5%" }}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
