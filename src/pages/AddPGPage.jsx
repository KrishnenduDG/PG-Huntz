import React, { useContext, useState } from "react";

import { authContext } from "../context/AuthContext.js";

import TerritoryService from "../services/TerritoryService.js";
import PGService from "../services/PGService.js";


import { State } from "country-state-city";
import {
  Text,
  Image,
  FormLabel,
  Input,
  Container,
  Button,
  Select,
} from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";

// ToDo - Dependency Injection
const TerritoryServiceInstance = new TerritoryService();
const PGServiceInstance = new PGService();

const AddPGPage = () => {
  // Grabbing the User Context
  const { user, setUser } = useContext(authContext);

  const navigate = useNavigate();

  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [pic, setPic] = useState("");
  const handleStateChange = (e) => {
    setState(e.target.value);

    
    setCity(
      TerritoryServiceInstance.getCities(State.getStateByCodeAndCountry('IN',e.target.value)).name
    );
  };
  const handleCityChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const handleFileChange = (e) => {
    setPic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    console.log("Hello");
    e.preventDefault();
    if (maxPrice < minPrice)
      return alert("Max Price cannot be smaller than Min Price!");

    const reviews = [];
    const res = await PGServiceInstance.addPG(
      { name, address, minPrice, maxPrice, city, state: TerritoryServiceInstance.getStateFromCode(state).name, reviews, pic },
      user.uid
    );

    if (res) navigate("/admin/profile");
    else return alert("Sorry! The PG Could not be Added!");
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <FormLabel>Name of PG </FormLabel>
        <Input
          type="text"
          required="true"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormLabel>Address of PG </FormLabel>
        <Input
          type="text"
          required="true"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <FormLabel>Min Price Range of PG </FormLabel>
        <Input
          type="number"
          required="true"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <FormLabel>Max Price Range</FormLabel>
        <Input
          type="number"
          required="true"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <FormLabel>State</FormLabel>
        <Select onChange={handleStateChange} required="true">
          {TerritoryServiceInstance.getStates().map((e) => {
            return (
              <option value={e.isoCode}>
                {e.name}({e.isoCode})
              </option>
            );
          })}
        </Select>

        <FormLabel>City</FormLabel>
        <Select onChange={handleCityChange} required="true">
          {TerritoryServiceInstance.getCities(state).map((e) => {
            return <option value={e.name}>{e.name}</option>;
          })}
        </Select>

        <FormLabel>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpg,image/png"
          />
        </FormLabel>
        <Button
          colorScheme="orange"
          type="submit"
          isDisabled={
            !(state && city && name && address && minPrice && maxPrice && pic)
          }
        >
          Submit Your PG
        </Button>
      </form>

      {pic && (
        <div>
          <Text>Uploaded Image:</Text>
          <Image src={URL.createObjectURL(pic)} height={60} width={60} />
        </div>
      )}
    </>
  );
};

export default AddPGPage;
