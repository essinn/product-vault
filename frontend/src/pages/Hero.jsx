import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const Hero = () => {
  const { fetchProduct, products } = useProductStore();

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])
  console.log('products:', products)
  
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products
        </Text>

        <div className='grid grid-col md:grid-cols-3 gap-10'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No Products Found {''}
            <Link to={'create'}>
              <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
                Create Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Hero