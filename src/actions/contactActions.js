import ApiClient from "../apiClient";

const listContacts = (authToken, page = 1) => ApiClient.post("/contacts/filter", {}, {
    headers: { authToken },
    params: {
      offset: (page - 1) * 25,
      limit: 25
    }
  }).then(({ data }) => data);

export default {
  listContacts
};
