import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const ListContact = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => {
    return response.data;
  });
};

const CreateContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => {
    return response.data;
  });
};

const UpdateContact = (id, contact) => {
  const request = axios.put(`${baseUrl}/${id}`, contact);
  return request.then((response) => response.data);
};

export default {
  ListContact,
  CreateContact,
  UpdateContact,
};
