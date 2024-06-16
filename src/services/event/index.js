class EventService {
  async getEvent(id) {
    return fetch(
      `${import.meta.env.VITE_API_URL}/epreuve${id ? "/" + id : "s"}`
    )
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

  async getTeams(id) {
    return fetch(`${import.meta.env.VITE_API_URL}/team${id ? "/" + id : "s"}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

  async getMatch(id) {
    return fetch(`${import.meta.env.VITE_API_URL}/match${id ? "/" + id : "s"}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }
}

export default new EventService();
