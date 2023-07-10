import { useContext } from "react";
import { authContext } from "../context/AuthContext.js";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  Box,
  Text,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from "@chakra-ui/react";

import { signOut, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.js";

import UserService from "../services/UserService.js";

export const GAuthProvider = new GoogleAuthProvider(auth);

const NavLink = ({ name, destination }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    to={destination}
  >
    {name}
  </Link>
);

const userServiceInstance = new UserService();

const NavComponent = () => {
  // Grabbing the User Context
  const { user, setUser } = useContext(authContext);


  const handleGoogleAuth = async () => {
    const res = await signInWithPopup(auth, GAuthProvider);
    setUser(res.user);

    const userAddRes = await userServiceInstance.createUser({uid:res.user.uid,email:res.user.email,pic_url:res.user.photoURL});

    console.log(userAddRes);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Link to="/">
              <Box boxSize={"max-content"}>
                <Text fontSize="3xl" background={"grey.400"}>
                  PG Huntz
                </Text>
              </Box>
            </Link>
            {user ? (
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <NavLink destination="/admin/add" name="Add a PG" />
                <NavLink destination="/admin/profile" name="Profile" />
              </HStack>
            ) : (
              <></>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            {!user ? (
              <Button
                colorScheme="twitter"
                leftIcon={<FaGoogle />}
                onClick={() => {
                  handleGoogleAuth();
                }}
                outline={"none"}
              >
                Sign In with Google
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={user.photoURL} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      handleSignOut();
                    }}
                  >
                    LogOut
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavComponent;
