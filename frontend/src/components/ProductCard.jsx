import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, 
        ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, 
        useToast, VStack} from "@chakra-ui/react"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useProductStore } from "../store/product";
import { AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import React, { useState } from "react";

const ProductCard = ({product}) => {
  const[updatingProduct, setUpdatingProduct] = useState(product);

  const textColor = useColorModeValue("gray.600","gray.200");
  const bg = useColorModeValue("white","gray.800");

  const {deleteProduct,updateProduct}=useProductStore();
  const toast = useToast();

  const alert = useDisclosure();
  const modal = useDisclosure();

  const cancelRef = React.useRef();
  

  const handleDeleteProduct = async (pid) =>{
    const {success,message} = await deleteProduct(pid);
    if(!success){
        toast({
          title:"Error",
          description:message,
          status:"error",
          isClosable:true,
    
        })
    } else {
        toast({
          title:"Success",
          description:message,
          status:"success",
          isClosable:true,
        })
    }
  }

  const handleUpdateProduct = async (pid,updatingProduct) => {
    const {success,message}=await updateProduct(pid,updatingProduct);
    modal.onClose();
    if(!success){
        toast({
          title:"Error",
          description:message,
          status:"error",
          isClosable:true,
    
        })
    } else {
        toast({
          title:"Success",
          description:"Product updated successfully",
          status:"success",
          isClosable:true,
        })
    }
  }

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform:"translateY(-5px)", shadow:'xl'}}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>
            <Text 
                fontWeight="bold"
                fontSize='xl'
                color={textColor} 
                mb={4}
            >
                $ {product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<FaRegEdit/>} onClick={modal.onOpen} colorScheme="blue"/>
                <IconButton icon={<RiDeleteBin6Fill/>} onClick={alert.onOpen} colorScheme="red"/>
                <AlertDialog
                    isOpen={alert.isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={alert.onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Product
                            </AlertDialogHeader>

                            <AlertDialogBody>
                            Are you sure? You cannot undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={alert.onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={()=>handleDeleteProduct(product._id)} ml={3}>
                                Delete
                            </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </HStack>
        </Box>
        <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
            <ModalOverlay>
                <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder="Product Name"
                                    name="name"
                                    value={updatingProduct.name}
                                    onChange={(e) => setUpdatingProduct({...updatingProduct,name:e.target.value})}
                            />
                            <Input placeholder ="Price"
                                    name="price"
                                    value={updatingProduct.price}
                                    onChange={(e) => setUpdatingProduct({...updatingProduct,price:e.target.value})}
                            />
                            <Input placeholder="Image url"
                                    name="image"
                                    value={updatingProduct.image}
                                    onChange={(e) => setUpdatingProduct({...updatingProduct,image:e.target.value})}
                            />
                            <Button colorScheme='blue' onClick={() => handleUpdateProduct(product._id, updatingProduct)} w='full'>
                                Update Product         
                            </Button>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={modal.onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Box>
  );
};

export default ProductCard;