import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

const fetchData = async (setData) => {
  await axios
    .get(url)
    .then((response) => {
      // console.log(response.data);
      setData(response.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(url);
    });
};

const deleteCategory = async (id, isAllowed) => {
  if (isAllowed) {
    axios
      .delete(`${url}/${id}`)
      .then(() => window.location.reload(true))
      .then(() => console.log("Category deleted"))
      .catch((error) => console.log(error));
  } else {
    console.log("you are not allowed");
  }
};

const handleSubmit = async (
  categoryId,
  Articles,
  name,
  image_url,
  isAllowed
) => {
  if (isAllowed) {
    axios
      .put(`${url}/article/${categoryId}`, {
        articles: Articles,
        name: name,
        image_url: image_url,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  } else {
    return "AuthenticationError";
  }
};

export { fetchData, deleteCategory, handleSubmit };
