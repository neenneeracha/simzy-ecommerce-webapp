import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../components/Products";
import ProductNotFound from "../components/ProductNotFound";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div `
  min-height: 85vh;
  position: relative;
`;

const Title = styled.h1 `
  margin: 40px 20px 20px;
  text-align: center;
  color: #eda3b5;
  font-weight: bold;
`;

const FilterContainer = styled.div `
  display: flex;
  justify-content: space-between;
`;

const FilterText = styled.span `
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select `
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option ``;

const Filter = styled.div `
  margin: 10px;
`;

const Button = styled.button `
  padding: 9px;
  margin-right: 20px;
  background-color: #f7d0d9;
  border: 0.2px solid;
  border-radius: 20px;
  width: 75px;
  font-size: 14px;
`;
const Text = styled.div ``;

const ProductList = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [price, setPrice] = useState(null);
    const [sort, setSort] = useState("newest");
    const main_category = searchParams.get("main_category");
    const sub_category = searchParams.get("sub_category");
    const search_input = searchParams.get("search_input");
    const fontSize = useSelector((state) => state.fontSize);

    useEffect(() => {
        const getProducts = async() => {
            setLoading(true);
            try {
                const res = await axios.get(
                    sub_category ?
                    color || size || price ?
                    `http://localhost:8080/api/v1/products/filtered?main_category=${main_category}&sub_category=${sub_category}&color=${color}&size=${size}&price=${price}` :
                    `http://localhost:8080/api/v1/products?main_category=${main_category}&sub_category=${sub_category}` :
                    main_category ?
                    color || size || price ?
                    `http://localhost:8080/api/v1/products/filtered?main_category=${main_category}&color=${color}&size=${size}&price=${price}` :
                    `http://localhost:8080/api/v1/products?main_category=${main_category}` :
                    color || size || price ?
                    `http://localhost:8080/api/v1/products/filtered?search_input=${search_input}&color=${color}&size=${size}&price=${price}` :
                    `http://localhost:8080/api/v1/products?search_input=${search_input}`
                );
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        getProducts();
    }, [main_category, sub_category, search_input, color, size, price]);

    useEffect(() => {
        if (sort === "newest") {
            setProducts((prev) => [...prev].sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            ));
        } else if (sort === "asc") {
            setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
        }
    }, [sort]);

    const resetFilter = () => {
        setColor(null);
        setSize(null);
        setPrice(null);
    };

    return ( 
        <Container>
        <Navbar />
        <Title style = {
            { fontSize: `${36 + fontSize.fontSize}px` } } > {
            sub_category ?
            sub_category :
                main_category ?
                main_category :
                `Search results for "${search_input}"`
        } </Title> 
        {
            !color && !size && !price && products.length === 0 ? ( 
                <ProductNotFound filtered = { false }/>
            ) : ( 
                <>
                <FilterContainer >
                <Filter >
                <FilterText > Filter By: </FilterText>

                <Select onChange = {
                    (e) => setColor(e.target.value) } > {
                    color ? ( <Option disabled> Color </Option>
                    ) : ( <Option disabled selected >
                        Color </Option>
                    )
                } <Option>White</Option> 
                <Option>Black</Option> 
                <Option>Pink</Option> 
                <Option> Blue </Option> 
                <Option> Yellow </Option> 
                <Option> Green </Option> 
                </Select> 
                <Select onChange = {
                    (e) => setSize(e.target.value) } > {
                    size ? ( <Option disabled> Size </Option>
                    ) : ( 
                        <Option disabled selected >
                        Size 
                        </Option>
                    )
                } <Option>XS</Option> 
                <Option>S</Option> 
                <Option>M</Option> 
                <Option>L</Option> 
                <Option>XL</Option> 
                </Select> 
                <Select onChange = {
                    (e) => setPrice(e.target.value) } > {
                    price ? ( 
                        <Option disabled > Price Range </Option>
                    ) : ( 
                        <Option disabled selected >
                        Price Range
                        </Option>
                    )
                } 
                <Option value = "999" > 0 THB - 999 THB </Option>
                <Option value = "1999" > 1000 THB - 1999 THB </Option> 
                <Option value = "2999" > 2000 THB - 2999 THB </Option> 
                <Option value = "3999" > 3000 THB - 3999 THB </Option> 
                <Option value = "4999" > 4000 THB - 4999 THB </Option> 
                </Select> {
                    color || size || price ? ( 
                        <Button onClick = { resetFilter } > Reset </Button>
                    ) : undefined
                } </Filter>

                <Filter >
                <FilterText > Sort By: </FilterText> 
                <Select onChange = {
                    (e) => {
                        setSort(e.target.value);
                    }
                } >
                <Option value = "newest" > Newest </Option> 
                <Option value = "asc" > Price low to high </Option> 
                <Option value = "desc" > Price high to low </Option> 
                </Select> 
                </Filter> 
                </FilterContainer> {
                    products.length === 0 ? ( 
                        <ProductNotFound filtered = { true }
                        />
                    ) : ( 
                        <Products products = { products }
                        />
                    )
                } 
                </>
            )
        }

        <Footer />
        </Container>
    );
};

export default ProductList;