import { Avatar, Container, VStack,Text, Accordion, AccordionItem,Box,AccordionIcon,AccordionPanel,AccordionButton, HStack,ListItem,ListIcon,List,Button,Image } from '@chakra-ui/react'

import {HiLocationMarker} from "react-icons/hi"
import { FaCity, FaRupeeSign } from "react-icons/fa";

import React,{useContext, useEffect, useState} from 'react'

import { authContext } from '../context/AuthContext';

import PGService from "../services/PGService.js";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Grabbing the User Context
  const { user, setUser } = useContext(authContext);
    const [pgList,setPgList] = useState([]);

    const PGServiceInstance = new PGService();

    const setPGs = () => {
        PGServiceInstance.getUserWisePG(user.uid).then((d) => setPgList(d));
    }

    useEffect(() => {setPGs()},[])
    
    const handleDelete = async (doc_id) => {
        console.log(doc_id);

        const del_res = await PGServiceInstance.deletePG(doc_id,user.uid);

        del_res ? setPGs() : alert("Could Not be Deleted!")
    }

  console.log(user);
  return (
    <Container marginTop={"10px"}>
      <VStack direction={"column"}>
        <Avatar size="2xl" src={user.photoURL} />

        <Text fontWeight={"extrabold"}>{user.displayName}</Text>
        <Text fontWeight={"light"}>{user.email}</Text>

        <Container>
            <Text fontWeight={"bold"}>PG Entries:</Text>
          <Accordion>
            {!pgList.length && <Container>
                    <Text>No Entries Yet!Create One now...</Text>
                    <Link to="/admin/add"><Button colorScheme='green'>Create a Doc</Button></Link>
                </Container>}
            {pgList.map((e) => {
            console.log(e);
                return (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {e.data.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <HStack direction={"row"}>
                        <Image
                          boxSize="150px"
                          objectFit="cover"
                          src={e.data.pic_url}
                          alt="Dan Abramov"
                        />
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

                        <Button
                          onClick={() => {
                            handleDelete(e.id);
                          }}
                        >
                          Delete Entry
                        </Button>
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                );
            })}
          </Accordion>
        </Container>
      </VStack>
    </Container>
  );
}

export default ProfilePage