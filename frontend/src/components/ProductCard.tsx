import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  const [ updatedProduct, setUpdatedProduct ] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    } else {
        toast({
            title: 'Success.',
            description: 'Product Deleted Successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
  }


  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct)
    onClose();
    if (!success) {
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
    } else {
        toast({
            title: 'Success.',
            description: 'Product Updated Successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }
  }

  return (
    <Box
        shadow={'lg'}
        rounded='lg'
        overflow='hidden'
        transition='all .3s'
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl'}}
        bg={bgColor}
    >
        <Image src={product.image} alt={product.name} h={40} w={'full'} objectFit={'cover'} />

        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>{product.name}</Heading>
            <Text fontWeight={'bold'} fontSize='xl' color={textColor} mb={4}>{product.price}</Text>
            <HStack spacing={4}>
                <IconButton icon={<MdEdit />} onClick={onOpen} aria-label="Edit" colorScheme='blue' />
                <IconButton icon={<MdDelete />} aria-label="Delete" onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
            </HStack>
        </Box>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Products</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter mb={2}>
                    <Button
                        colorScheme='blue'
                        mr={3}
                        onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >
                        Update
                    </Button>
                    <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard