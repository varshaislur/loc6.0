import React from "react";
import PageHeader from "../Components/PageHeader";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
const URL = "http://localhost:8000/mobile";
const Store = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // (async () => {
    //   const response = await axios.get(URL);
    //   console.log(response)
    // })()
    async function getData() {
      const response = await axios.get(URL);
      console.log(response);
      setProducts(response.data);
      console.log(response.data);
      //   console.log(products);
    }
    getData();
  }, []);

  return (
    <>
      {products ? (
        <>
          <div>
            <PageHeader title="Page for different Stores" curPage="Store" />
            <div>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>
                    <h3>Flipkart</h3>
                  </Tab>
                  <Tab>
                    <h3>Amazon</h3>
                  </Tab>
                  <Tab>
                    <h3>Croma</h3>
                  </Tab>
                </TabList>
                <TabPanels>
                  {products.map((product, index) => {
                    console.log(index);
                    console.log(product.image);
                    return (
                      <>
                        {/* <TabPanel> */}
                        <Card
                          
                          direction={{ base: "column", sm: "row" }}
                          overflow="hidden"
                          variant="outline"
                          style={{ margin: "20px" }}
                        >
                          <Image
                            objectFit="contain"
                            maxW={{ base: "100%", sm: "200px" }}
                            src={product.image}
                            alt=""
                          />
                          <Stack>
                            <CardBody>
                              <Heading size="md">{product.title}</Heading>

                              <Text py="2">{product.description}</Text>
                              <Text py="2">
                                No. of Reviews:-<b>{product.ratings}</b>
                              </Text>
                              <Text py="2">
                                Stars:-<b>{product.stars}</b>
                              </Text>
                              <Text py="2">
                                Price:-<b>{product.price}</b>
                              </Text>
                            </CardBody>

                            <CardFooter>
                              <Button variant="solid" m="2" colorScheme="blue">
                                Add To Cart
                              </Button>
                              <Button variant="solid" m="2" colorScheme="blue">
                                Add To Compare
                              </Button>
                            </CardFooter>
                          </Stack>
                        </Card>
                        {/* </TabPanel> */}
                      </>
                    );
                  })}
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Store;
