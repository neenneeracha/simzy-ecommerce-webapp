import styled from "styled-components"
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
    font-weight: bold;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color: LightPink;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      background-color: #EDA3B5;
      transform: scale(1.1);
      color:white;
    }
`;



const CategoryItem = ({item}) => {
    return (
        <Container>
          {/* <Link to = {`/products/${item.cate}`}> */}
           <Image src ={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
          {/* </Link> */}
           
        </Container>
  )
}

export default CategoryItem