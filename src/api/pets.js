import instance from ".";

const getAllPets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};

//^^ this one is to display all pets

const getOnePet = async (id) => {
  const one = await instance.get(`/pets/${id}`);
  return one.data;
};

//^^ this one to display description/details of the pet

const addPet = async (name, type, image, adopted) => {
  const onePet = await instance.post("/pets", {
    name: name,
    type: type,
    image: image,
    adopted: adopted,
  });
  return onePet.data;
};

//^^this one is to add a new pet

const deletePet = async (id) => {
  const del = await instance.delete(`/pets/${id}`);
  return del.data;
};

//^^this one is to delete one pet

export { getAllPets, getOnePet, addPet, deletePet };
