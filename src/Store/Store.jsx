import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../Components/PageHeader";
import {
  Box,
  Flex,
  Grid,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  Spinner,
  Badge,
  useToast,
  Tag,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  SimpleGrid
} from "@chakra-ui/react";
import { AddIcon, StarIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [compareList, setCompareList] = useState([]);
  const [cart, setCart] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [storage, setStorage] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Fetch products from all stores 
      const flipkartRes = await axios.get("https://ecommercewebscrapingbackend.onrender.com/api/products/flipkart");
      const vijaySalesRes = await axios.get("https://ecommercewebscrapingbackend.onrender.com/api/products/vijaySales");
      
      // Normalize the data structure
      const flipkartProducts = flipkartRes.data.map(product => ({
        _id: product._id,
        name: product["Product Name"] || "",
        price: product.Price || "₹0",
        reviews: product.Reviews || "No reviews",
        imageUrl: product["Image URL"] || "",
        store: "Flipkart"
      }));
      
      const vijaySalesProducts = vijaySalesRes.data.map(product => ({
        _id: product._id,
        name: product["Product Name"] || "",
        price: product.Price || "0",
        reviews: "Not available",
        imageUrl: product["Image URL"] || "",
        store: "VijaySales"
      }));
      
      // Combine products
      const allProducts = [...flipkartProducts, ...vijaySalesProducts];
      
      // Extract brands and storage options from product names
      const extractedBrands = new Set();
      const extractedStorage = new Set();
      
      allProducts.forEach(product => {
        // Extract brand (usually the first word in the product name)
        const brandMatch = product.name.match(/^(REDMI|realme|vivo|OnePlus|Xiaomi|SAMSUNG|IQOO|Nothing|Vivo)/i);
        if (brandMatch) {
          extractedBrands.add(brandMatch[0]);
        }
        
        // Extract storage (typically looks like "128 GB" or "256GB")
        const storageMatch = product.name.match(/(\d+)\s*GB/i);
        if (storageMatch) {
          extractedStorage.add(storageMatch[0]);
        }
      });
      
      setBrands(Array.from(extractedBrands));
      setStorage(Array.from(extractedStorage));
      
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      
      // Set available stores
      setStores(["Flipkart", "VijaySales"]);
      
      // Find maximum price for range slider (removing currency symbols and commas)
      const highestPrice = Math.max(...allProducts.map(p => {
        const priceStr = p.price.replace(/[₹,]/g, "").trim();
        return parseFloat(priceStr) || 0;
      }));
      
      setMaxPrice(highestPrice > 0 ? highestPrice : 200000);
      setPriceRange([0, highestPrice > 0 ? highestPrice : 200000]);
      
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error fetching products",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedStore, priceRange, searchTerm, sortOption, products, selectedBrands, selectedStorage]);

  const applyFilters = () => {
    let result = [...products];
    
    // Filter by store
    if (selectedStore !== "all") {
      result = result.filter(product => product.store === selectedStore);
    }
    
    // Filter by price range
    result = result.filter(product => {
      const priceStr = product.price.replace(/[₹,]/g, "").trim();
      const price = parseFloat(priceStr) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.some(brand => 
          product.name.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }
    
    // Filter by selected storage options
    if (selectedStorage.length > 0) {
      result = result.filter(product => 
        selectedStorage.some(storage => 
          product.name.toLowerCase().includes(storage.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[₹,]/g, "")) || 0;
          const priceB = parseFloat(b.price.replace(/[₹,]/g, "")) || 0;
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[₹,]/g, "")) || 0;
          const priceB = parseFloat(b.price.replace(/[₹,]/g, "")) || 0;
          return priceB - priceA;
        });
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleAddToCompare = (product) => {
    if (compareList.length >= 3) {
      toast({
        title: "Compare limit reached",
        description: "You can only compare up to 3 products",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!compareList.some(item => item._id === product._id)) {
      setCompareList([...compareList, product]);
      toast({
        title: "Added to compare",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList(compareList.filter(item => item._id !== productId));
  };

  const handleAddToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    
    if (existingProduct) {
      // Update quantity if product already in cart
      const updatedCart = cart.map(item => 
        item._id === product._id ? {...item, quantity: item.quantity + 1} : item
      );
      setCart(updatedCart);
    } else {
      // Add new product to cart
      setCart([...cart, {...product, quantity: 1}]);
    }
    
    toast({
      title: "Added to cart",
      description: product.name,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item._id === productId ? {...item, quantity: newQuantity} : item
    ));
  };

  const toggleBrandFilter = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const toggleStorageFilter = (storageOption) => {
    setSelectedStorage(prev => 
      prev.includes(storageOption) 
        ? prev.filter(s => s !== storageOption) 
        : [...prev, storageOption]
    );
  };

  const formatPrice = (priceString) => {
    const numericPrice = parseFloat(priceString.replace(/[₹,]/g, "")) || 0;
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(numericPrice);
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, "")) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const clearFilters = () => {
    setSelectedStore("all");
    setPriceRange([0, maxPrice]);
    setSearchTerm("");
    setSortOption("default");
    setSelectedBrands([]);
    setSelectedStorage([]);
  };

  return (
    <>
      <PageHeader title="Product Comparison" curPage="Shop" />
      
      {/* Filters Section */}
      <Box p={5} bg="gray.50" borderRadius="md" m={5} boxShadow="sm">
        <Flex justify="space-between" mb={4}>
          <Heading size="md">Filters</Heading>
          <Button 
            size="sm" 
            variant="outline" 
            colorScheme="red" 
            leftIcon={<CloseIcon />}
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </Flex>
        
        <Flex direction={{ base: "column", md: "row" }} gap={4} wrap="wrap">
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Store</Text>
            <Select 
              value={selectedStore} 
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="all">All Stores</option>
              {stores.map(store => (
                <option key={store} value={store}>{store}</option>
              ))}
            </Select>
          </Box>
          
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Price Range</Text>
            <Flex align="center" gap={2}>
              <Text>{formatPrice(priceRange[0].toString())}</Text>
              <RangeSlider
                aria-label={['min', 'max']}
                defaultValue={[0, maxPrice]}
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={setPriceRange}
                colorScheme="blue"
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Text>{formatPrice(priceRange[1].toString())}</Text>
            </Flex>
          </Box>
          
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Search</Text>
            <Flex>
              <Input 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                ml={2}
                colorScheme="blue"
              />
            </Flex>
          </Box>
          
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Sort By</Text>
            <Select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </Select>
          </Box>
        </Flex>
        
        {/* Additional Filters */}
        <Flex mt={4} wrap="wrap" gap={4}>
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Brand</Text>
            <Flex wrap="wrap" gap={2}>
              {brands.map(brand => (
                <Tag 
                  key={brand}
                  size="md"
                  variant={selectedBrands.includes(brand) ? "solid" : "outline"}
                  colorScheme="blue"
                  cursor="pointer"
                  onClick={() => toggleBrandFilter(brand)}
                >
                  {brand}
                </Tag>
              ))}
            </Flex>
          </Box>
          
          <Box flex="1" minW={{ base: "100%", md: "200px" }}>
            <Text fontWeight="bold" mb={2}>Storage</Text>
            <Flex wrap="wrap" gap={2}>
              {storage.map(option => (
                <Tag 
                  key={option}
                  size="md"
                  variant={selectedStorage.includes(option) ? "solid" : "outline"}
                  colorScheme="green"
                  cursor="pointer"
                  onClick={() => toggleStorageFilter(option)}
                >
                  {option}
                </Tag>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Box>
      
      {/* Results summary */}
      <Box px={5} mb={2}>
        <Flex justify="space-between" align="center">
          <Text>Showing {filteredProducts.length} of {products.length} products</Text>
          <HStack>
            <Button 
              size="sm" 
              leftIcon={<AddIcon />} 
              colorScheme="teal" 
              variant="outline"
              onClick={onOpen}
            >
              Cart ({cart.length})
            </Button>
          </HStack>
        </Flex>
      </Box>
      
      {/* Cart Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <Flex 
                direction="column" 
                align="center" 
                justify="center" 
                h="300px"
                textAlign="center"
              >
                <Text fontSize="xl" mb={4}>Your cart is empty</Text>
                <Button colorScheme="blue" onClick={onClose}>
                  Continue Shopping
                </Button>
              </Flex>
            ) : (
              <Stack spacing={4}>
                {cart.map(item => (
                  <Flex 
                    key={item._id} 
                    p={3} 
                    borderWidth="1px" 
                    borderRadius="md"
                    boxShadow="sm"
                    align="center"
                  >
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      boxSize="70px"
                      objectFit="contain"
                      mr={3}
                    />
                    <Stack flex="1">
                      <Text fontSize="sm" fontWeight="bold" noOfLines={2}>
                        {item.name}
                      </Text>
                      <Flex justify="space-between" align="center">
                        <Text>{formatPrice(item.price)}</Text>
                        <Flex align="center">
                          <Button 
                            size="xs" 
                            onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Text mx={2}>{item.quantity}</Text>
                          <Button 
                            size="xs"
                            onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </Flex>
                      </Flex>
                    </Stack>
                    <IconButton
                      icon={<CloseIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      ml={2}
                      onClick={() => handleRemoveFromCart(item._id)}
                    />
                  </Flex>
                ))}
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Box w="100%">
              <Flex justify="space-between" mb={4}>
                <Text fontSize="lg">Total:</Text>
                <Text fontSize="lg" fontWeight="bold">{formatPrice(getTotalCartPrice().toString())}</Text>
              </Flex>
              <Button 
                w="100%" 
                colorScheme="blue"
                isDisabled={cart.length === 0}
              >
                Checkout
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      {/* Comparison Bar (only shown when products are selected) */}
      {compareList.length > 0 && (
        <Box 
          position="sticky" 
          bottom="0" 
          bg="white" 
          p={3} 
          boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
          zIndex={10}
        >
          <Flex justify="space-between" align="center">
            <Heading size="md">Compare Products ({compareList.length}/3)</Heading>
            <Flex gap={4}>
              {compareList.map(product => (
                <Flex key={product._id} align="center" bg="gray.100" p={2} borderRadius="md">
                  <Text fontSize="sm" noOfLines={1} maxW="150px">{product.name}</Text>
                  <IconButton 
                    size="xs" 
                    variant="ghost" 
                    colorScheme="red" 
                    ml={2}
                    aria-label="Remove from compare"
                    icon={<CloseIcon />}
                    onClick={() => handleRemoveFromCompare(product._id)}
                  />
                </Flex>
              ))}
              <Button 
                colorScheme="blue" 
                isDisabled={compareList.length < 2}
                onClick={() => {
                  toast({
                    title: "Comparison feature",
                    description: "This feature is coming soon!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Compare Now
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
      
      {/* Products Display */}
      {loading ? (
        <Flex justify="center" align="center" h="300px">
          <Spinner size="xl" />
        </Flex>
      ) : filteredProducts.length === 0 ? (
        <Box textAlign="center" p={10}>
          <Heading size="md">No products found</Heading>
          <Text mt={2}>Try adjusting your filters</Text>
          <Button mt={4} colorScheme="blue" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </Box>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
          p={5}
        >
          {filteredProducts.map((product) => (
            <Card key={product._id} maxW="sm" boxShadow="md" transition="transform 0.3s" _hover={{ transform: 'translateY(-5px)' }}>
              <CardBody>
                <Badge colorScheme={product.store === "Flipkart" ? "blue" : "purple"} position="absolute" top={2} right={2}>
                  {product.store}
                </Badge>
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  borderRadius="lg" 
                  height="200px"
                  objectFit="contain"
                  mx="auto"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md" noOfLines={2}>{product.name}</Heading>
                  
                  {product.store === "Flipkart" && (
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      {product.reviews}
                    </Text>
                  )}
                  
                  <HStack spacing={1}>
                    {Array(5).fill('').map((_, i) => (
                      <StarIcon 
                        key={i}
                        color={i < 4 ? "yellow.400" : "gray.300"}
                        boxSize={3}
                      />
                    ))}
                  </HStack>
                  
                  <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                    {formatPrice(product.price)}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2" width="100%">
                  <Button 
                    variant="solid" 
                    colorScheme="blue" 
                    flex="1"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    flex="1"
                    onClick={() => handleAddToCompare(product)}
                  >
                    Compare
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ProductPage;