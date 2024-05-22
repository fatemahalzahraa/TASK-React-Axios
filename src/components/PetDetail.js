import React from "react";
import petsData from "../petsData";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { deletePet, getOnePet } from "../api/pets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const PetDetail = () => {
  const { petId } = useParams();

  // const [pets, setPet] = useState({});

  // const onePet = async () => {
  //   const one = await getOnePet(petId);
  //   setPet(one);
  // };

  //in this remove function notice that we commented the setPet because we commented the useState
  //so we don't need it

  // const remove = async () => {
  //   await deletePet(petId);
  //   // setPet(removal);
  // };

  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["deletePet"],
    mutationFn: () => deletePet(petId),
    onSuccess: () => {
      // queryClient.invalidateQueries(["pets"]);
      navigate("/pets");
    },
  });

  //what we did here is that when we enter the pet it'll have an empty card, however when we click on
  // one pet button we will get it's details!

  // const pet = petsData.find((pet) => {
  //   return pet.id == petId;
  // });

  //it was done but only works when i put the id number like that /2 goes to pet id 2 and so on.

  // if (!pet) {
  //   return <Navigate to="/" />;
  // }

  const { data: pet, isLoading } = useQuery({
    queryKey: ["details", petId],
    queryFn: () => getOnePet(petId),
  });

  //we used data: pet because we want to refer to the data of pets + we didn't use the curly brackets
  //because () => function(value) basically means return that function's value w/o the need to write return!!
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        {/* <button onClick={onePet}> one pet</button> */}
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5">
            Adobt
          </button>

          <button
            onClick={mutate}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
