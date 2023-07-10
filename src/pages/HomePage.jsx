import React,{useState,useEffect} from 'react'
import { HStack,Container,Card,CardBody,Stack,Heading,Text,Image,Divider,CardFooter,Button,List,ListItem,ListIcon } from '@chakra-ui/react';
import UserService from '../services/UserService';
import PGService from '../services/PGService';

import { HiLocationMarker } from "react-icons/hi";
import { FaCity, FaRupeeSign } from "react-icons/fa";

const userServiceInstance = new UserService();
const PGServiceInstance = new PGService();


const HomePage = () => {
  const [pgList,setPgList] = useState([]);


  useEffect(() => {
    PGServiceInstance.getAllPG().then((d) => {
      console.log(d);

      setPgList(d);
    })
  },[]);


  return (
    <Container>
      <HStack direction={"row"}>
        {pgList.map((e) => {
          return (
            <Card size="sm" maxW="sm">
              <CardBody>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={e.data.pic_url}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{e.data.name}</Heading>

                  {/* List */}
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={HiLocationMarker} color="green.500" />
                      {e.data.address}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCity} color="green.500" />
                      {e.data.state}({e.data.city})
                    </ListItem>

                    <ListItem>
                      <ListIcon as={FaRupeeSign} color="green.500" />₹
                      {e.data.min_price} - ₹{e.data.max_price}
                    </ListItem>
                  </List>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={async () => {
                     window.location.href = `mailto:${
                       (await userServiceInstance.getUserById(e.data.uid)).email
                     }`;
                  }}
                >
                 Contact with Owner
                </Button>
              </CardFooter>
            </Card>
          );
          
        })}
      </HStack>
    </Container>
  )
}

export default HomePage