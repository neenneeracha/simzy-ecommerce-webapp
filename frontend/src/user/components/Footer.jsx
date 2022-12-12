/********************************************************************
 *
 * Footer.jsx
 *
 *   This file represents the footer component
 *   which displays general information about the SIMZY website.
 *
 ********************************************************************
 */

import React from "react";
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
import { useSelector } from "react-redux";

// style the components
const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: -350px;
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
  const fontSize = useSelector((state) => state.fontSize);

  return (
    <Container>
      <Left>
        <Logo style={{ fontSize: `${32 + fontSize.fontSize}px` }}>SIMZY</Logo>
        <Desc style={{ fontSize: `${16 + fontSize.fontSize}px` }}>
          OPEN NOW! NEW SIMZY STORE AT ROBINSON BURIRAM. FIND THE EXCLUSIVE
          PROMOTION AND SPECIAL SURPRISE ONLY FOR THIS STORE DURING 7 - 13
          OCT'22 OCTOBER 20TH MEET THE NEW SIMZY STORE AT TERMINAL 21 RAMA 3.
          #LIFEWEARNEXTTOYOU
        </Desc>
        <SocialContainer style={{ cursor: "pointer" }}>
          <SocialIcon color="3B5999">
            <Facebook
              onClick={() =>
                window.open("https://www.facebook.com/KMUTT/", "_blank")
              }
            />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram
              onClick={() =>
                window.open("https://www.instagram.com/love.kmutt/", "_blank")
              }
            />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter
              onClick={() => window.open("https://twitter.com/kmutt", "_blank")}
            />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest
              onClick={() =>
                window.open("https://www.facebook.com/cpe.kmutt/", "_blank")
              }
            />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title style={{ fontSize: `${32 + fontSize.fontSize}px` }}>
          Useful Links
        </Title>
        <List>
          {/* SIMZY page link */}
          {usefulLinks.map((link, index) => (
            <ListItem key={index}>
              <Link style={{ textDecoration: "none" }} to={link.url}>
                <LinkItem style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
                  {link.name}
                </LinkItem>
              </Link>
            </ListItem>
          ))}
        </List>
      </Center>
      <Right>
        <Title style={{ fontSize: `${32 + fontSize.fontSize}px` }}>
          Contact
        </Title>
        <ContactItem style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
          <Room
            style={{
              marginRight: "10px",
              fontSize: `${18 + fontSize.fontSize}px`,
            }}
          />{" "}
          186 Pracha Uthit Rd, Bang Mot, Thung Khru, Bangkok 10180
        </ContactItem>
        <ContactItem style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
          <Phone
            style={{
              marginRight: "10px",
              fontSize: `${18 + fontSize.fontSize}px`,
            }}
          />{" "}
          Tel: +66 (0) 2315 6666
        </ContactItem>
        <ContactItem style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
          <MailOutline style={{ marginRight: "10px" }} /> Email: Simzy@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
