import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Name = styled.h3`
  color: white;
  font-size: 18px;
  margin: 0px 15px;
  text-align: center;
`;

const Price = styled.h3`
  color: #eda3b5;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  background-color: white;
  font-family: sans serif;
  margin-top: 2px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #eda3b5;
    text-decoration: underline;
  }
`;

const Product = ({ item }) => {
  const fontSize = useSelector((state) => state.fontSize);

  return (
    <Container>
      <Circle />
      <Image src={item.img_link} />
      <Info>
        <Name
          style={{
            fontSize: `${20 + fontSize.fontSize}px`,
          }}
        >
          {item.product_name}
        </Name>
        <Price
          style={{
            fontSize: `${20 + fontSize.fontSize}px`,
          }}
        >
          Price: {item.price} THB
        </Price>
        <Icon>
          <Link to={`/product/${item.product_id}`}>
            <SearchOutlined style={{ color: "black" }} />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
