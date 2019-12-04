/* import - node_modules */
import axios from "axios";

const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2"
});

export const tasksAPI = {
  getTasks(page = 1, sortField = "id", sortDirection = "asc") {
    return instance
      .get(
        `/?developer=Name&page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
      )
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },

  addTask(username, email, text) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("email", email);
    params.append("text", text);

    return instance
      .post(`/create?developer=${username}`, params)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },

  changeTask(id, text, status, token) {
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("text", text);
    params.append("status", status);

    return instance
      .post(`/edit/${id}/?developer=Name`, params)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  }
};

export const authAPI = {
  postLigin(username, password) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return instance
      .post("/login/?developer=Name", params)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  }
};
