import React from "react";
import PageHeader from "../Components/PageHeader";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Image, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { Divider, ButtonGroup } from "@chakra-ui/react";
import Banner from "../Home/Banner";

import { useState, useEffect } from "react";
import axios from "axios";
const URL1 = "http://localhost:8000/mobile";
// const Store = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     // (async () => {
//     //   const response = await axios.get(URL);
//     //   console.log(response)
//     // })()
//     async function getData() {
//       const response = await axios.get(URL);
//       console.log(response);
//       setProducts(response.data);
//       console.log(response.data);
//       //   console.log(products);
//     }
//     getData();
//   }, []);

//   return (
//     <>
//       {products ? (
//         <>
//           <div>
//             <PageHeader title="Page for different Stores" curPage="Store" />
//             <div>
//               <Tabs isFitted variant="enclosed">
//                 <TabList mb="1em">
//                   <Tab>
//                     <h3>Flipkart</h3>
//                   </Tab>
//                   <Tab>
//                     <h3>Amazon</h3>
//                   </Tab>
//                   <Tab>
//                     <h3>Croma</h3>
//                   </Tab>
//                 </TabList>
//                 <TabPanels>
//                   {products.map((product, index) => {
//                     console.log(index);
//                     console.log(product.image);
//                     return (
//                       <>
//                         <div>
//                           <Card
//                             direction={{ base: "column", sm: "row" }}
//                             overflow="hidden"
//                             variant="outline"
//                             style={{ margin: "20px" }}
//                           >
//                             <Image
//                               objectFit="contain"
//                               maxW={{ base: "100%", sm: "200px" }}
//                               src={product.image}
//                               alt=""
//                             />
//                             <Stack>
//                               <CardBody>
//                                 <Heading size="md">{product.title}</Heading>

//                                 <Text py="2">{product.description}</Text>
//                                 <Text py="2">
//                                   No. of Reviews:-<b>{product.ratings}</b>
//                                 </Text>
//                                 <Text py="2">
//                                   Stars:-<b>{product.stars}</b>
//                                 </Text>
//                                 <Text py="2">
//                                   Price:-<b>{product.price}</b>
//                                 </Text>
//                               </CardBody>

//                               <CardFooter>
//                                 <Button
//                                   variant="solid"
//                                   m="2"
//                                   colorScheme="blue"
//                                 >
//                                   Add To Cart
//                                 </Button>
//                                 <Button
//                                   variant="solid"
//                                   m="2"
//                                   colorScheme="blue"
//                                 >
//                                   Add To Compare
//                                 </Button>
//                               </CardFooter>
//                             </Stack>
//                           </Card>
//                         </div>
//                       </>
//                     );
//                   })}
//                 </TabPanels>
//               </Tabs>
//             </div>
//           </div>
//         </>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

// export default Store;

///////////////////////////////////////////////////////////////////////////////

const URL2 = "http://localhost:8000/mobiles";

const DualApiFetch = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(URL1);
        setData1(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from API 1:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get(URL2);
        setData2(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from API 2:", error);
      }
    };

    fetchData1();
    fetchData2();
  }, []);

  return (
    <>
      <PageHeader title="Product Comparison" curPage="Shop" />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginLeft: "200px" }}>
          <h2
            style={{
              marginLeft: "130px",
              marginTop: "100px",
              marginBottom: "50px",
            }}
          >
            Flipkart
          </h2>
          {/* <ul> */}
          <Card maxW="sm">
            {data1.map((item, index) => (
              // <li key={index}>{item.price}</li>
              <>
                <CardBody>
                  <Image src={item.image} alt="" borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.title}</Heading>
                    <Text>{item.description}</Text>
                    <Text>
                      No. of ratings <b>{item.ratings}</b>
                    </Text>
                    <Text>
                      Stars:- <b>{item.stars}</b>
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      {item.price}
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button>
                    <Button
                      style={{ marginBottom: "70px" }}
                      variant="ghost"
                      colorScheme="blue"
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
                <Divider />
              </>
            ))}
          </Card>
          {/* </ul> */}
        </div>
        <div style={{ flex: 1 }}>
          <h2
            style={{
              marginLeft: "120px",
              marginTop: "100px",
              marginBottom: "50px",
            }}
          >
            Croma
          </h2>
          {/* <ul> */}
          <Card maxW="sm">
            {data2.map((item, index) => (
              // <li key={index}>{item.price}</li>
              <>
                <CardBody>
                  <Image src={item.image} alt="" borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.title}</Heading>
                    <Text>{item.description}</Text>
                    <Text>
                      No. of ratings <b>{item.ratings}</b>
                    </Text>
                    <Text>
                      Stars:- <b>{item.stars}</b>
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      {item.price}
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      Buy now
                    </Button>
                    <Button
                      style={{ marginBottom: "70px" }}
                      variant="ghost"
                      colorScheme="blue"
                    >
                      Analyse
                    </Button>
                  </ButtonGroup>
                </CardFooter>
                <Divider />
              </>
            ))}
          </Card>
          {/* </ul> */}
        </div>
      </div>
    </>
  );
};

export default DualApiFetch;
