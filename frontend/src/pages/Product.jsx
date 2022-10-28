import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;
const GroupImage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const DetailImg = styled.img`
  width: 25%;
  height: 25%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 350;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  justify-content: space-between;
`;

const ColorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SizeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.h4`
  
`;

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
  margin: 5%;
  cursor: pointer;
  display: inline-block;
  width: 30px;
  height: 30px;

  &:hover {
    background-color: ${(props) => props.color};
    transform: scale(1.2);
  }
`;

const FilterSize = styled.div`
  padding: 15px;
  border: 2px solid #e9e9e9;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 5%;

  &:hover {
    background-color: #eda3b5;
    transform: scale(1.1);
    color: white;
  }
`;
const MaterialDetail = styled.div``;
const MaterialTitle = styled.h4`
  margin: 30px 0;
`;
const MaterialContent = styled.div``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  padding: 15px;
  border: 2px solid #e9e9e9;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 5%;
  margin-left: 10%;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #eda3b5;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 5%;
  margin-left: 10%;

  &:hover {
    background-color: #eda3b5;
    transform: scale(1.1);
    color: white;
  }
`;

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/item/thgoods_12_449878.jpg?width=1600&impolicy=quality_75" />
          <GroupImage>
            <DetailImg src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/sub/thgoods_449878_sub7.jpg?width=1600&impolicy=quality_75" />
            <DetailImg src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/sub/thgoods_449878_sub8.jpg?width=1600&impolicy=quality_75" />
            <DetailImg src="https://image.uniqlo.com/UQ/ST3/th/imagesgoods/449878/sub/thgoods_449878_sub9.jpg?width=1600&impolicy=quality_75" />
            <DetailImg src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449878/sub/goods_449878_sub12.jpg?width=1600&impolicy=quality_75" />
          </GroupImage>
        </ImgContainer>
        <InfoContainer>
          <Title>HEATTECH Pile Lined Sweat Full-Zip Long Sleeve Hoodie</Title>
          <Desc>
            HEATTECH hoodie with a warm, fluffy lining. Updated for added
            comfort.
          </Desc>
          <Price>THB 1,490.00 </Price>
          <MaterialDetail>
            <MaterialTitle>Material: </MaterialTitle>
            <MaterialContent>
              {" "}
              Body: 67% Polyester, 19% Acrylic, 14% Rayon/ Rib: 58% Cotton, 39%
              Polyester, 3% Spandex/ Pocket Lining: Outer Layer: 60% Acrylic,
              40% Rayon/ Back: 67% Polyester, 19% Acrylic, 14% Rayon WASHING
              INSTRUCTIONS Machine wash cold, gentle cycle, Do not Dry Clean -
              The images shown may include colors that are not available.
            </MaterialContent>
          </MaterialDetail>
          <FilterContainer>
            <ColorInfo>
              <FilterTitle>Color: </FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="grey" />
              <FilterColor color="pink" />
            </ColorInfo>
            <SizeInfo>
              <FilterTitle>Size: </FilterTitle>
              <FilterSize>XS</FilterSize>
              <FilterSize>S</FilterSize>
              <FilterSize>M</FilterSize>
              <FilterSize>L</FilterSize>
              <FilterSize>XL</FilterSize>
            </SizeInfo>
            <AddContainer style={{ marginTop: "5%" }}>
              <FilterTitle>Quantity: </FilterTitle>
              <AmountContainer>
                <Remove />
                <Amount>1</Amount>
                <Add />
              </AmountContainer>
            </AddContainer>
          </FilterContainer>

          <Button>ADD TO CART</Button>
          <Button>SHOP NOW</Button>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
