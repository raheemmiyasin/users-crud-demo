import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/api/users");
  }

  get(id) {
    return http.get(`/api/users/${id}`);
  }

  create(data) {
    return http.post("/api/users", data);
  }

  update(id, data) {
    return http.patch(`/api/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/users/${id}`);
  }

}

export default new UserDataService();