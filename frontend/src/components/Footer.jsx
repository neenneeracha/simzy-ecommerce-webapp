<<<<<<< HEAD
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #efeff4;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 10px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const LinkItem = styled.div`
  color: black;
  text-decoration: none;

  &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
`;

const usefulLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Cart",
    url: "/cart",
  },
  {
    name: "Man Fashion",
    url: "/products?main_category=Men",
  },
  {
    name: "Woman Fashion",
    url: "/products?main_category=Women",
  },
  {
    name: "Kids Fashion",
    url: "/products?main_category=Kids",
  },
];

const Footer = () => {
  return (
    <Container>
      <Footer>

        
      </Footer>
      <Left>
        <Logo>SIMZY</Logo>
        <Desc>
          OPEN NOW! NEW SIMZY STORE AT ROBINSON BURIRAM. FIND THE EXCLUSIVE
          PROMOTION AND SPECIAL SURPRISE ONLY FOR THIS STORE DURING 7 - 13
          OCT'22 [NEW STORE] OCTOBER 20TH MEET THE NEW UNIQLO STORE AT TERMINAL
          21 RAMA 3. #LIFEWEARNEXTTOYOU
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          {usefulLinks.map((link, index) => (
            <ListItem key={index}>
              <Link style={{ textDecoration: "none" }} to={link.url}>
                <LinkItem>{link.name}</LinkItem>
              </Link>
            </ListItem>
          ))}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 126 Pracha Uthit Rd, Bang
          Mot, Thung Khru, Bangkok 10140
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> T: +66 (0) 2315 6666
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> E: Simzy@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
=======
import { Link } from 'react-router-dom'
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons";
  import styled from "styled-components";
  
  const Container = styled.div`
    display: flex;
    background-color: #EFEFF4;
    
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    font-size: 10px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    &:hover {
    color: #eda3b5;
    text-decoration: underline;
  }
  `;

  const LinkItem = styled.div`
    color: black;
    text-decoration: none;

    &:hover {
      color: #EDA3B5;
      text-decoration: underline;
  }
`;

  const usefulLinks = [
    {
      name: "Home",
      url: "/"
    }, 
    {
      name: "Cart",
      url: "/cart"
    },
    {
      name: "Man Fashion",
      url: "/products?main_category=Men"
    },
    {
      name: "Woman Fashion",
      url: "/products?main_category=Women"
    },
    {
      name: "Kids Fashion",
      url: "/products?main_category=Kids"
    }
]
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>SIMZY</Logo>
          <Desc>
          OPEN NOW! NEW SIMZY STORE AT ROBINSON BURIRAM. FIND THE EXCLUSIVE PROMOTION AND SPECIAL SURPRISE ONLY FOR THIS STORE DURING 7 - 13 OCT'22
[NEW STORE] OCTOBER 20TH MEET THE NEW UNIQLO STORE AT TERMINAL 21 RAMA 3. #LIFEWEARNEXTTOYOU
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            {usefulLinks.map((link, index) => 
              <ListItem key={index}>
                <Link style={{ textDecoration: "none" }} to={link.url}>
                  <LinkItem>
                    {link.name}
                  </LinkItem>
                </Link>
              </ListItem>
            )}
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 126 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10140
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> T: +66 (0) 2315 6666
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> E: Simzy@gmail.com
          </ContactItem>
        </Right>
      </Container>
    );
  };
  
  export default Footer;


  
>>>>>>> 21d83452411a8277c11e0492f29aa4dba0308495
