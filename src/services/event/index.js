class EventService {
  async getEvent(id) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/epreuve${id ? "/" + id : "s"}`
    );

    const data = await response.json();

    if (id) {
      return {
        status: response.status,
        events: data,
      };
    }

    return {
      status: response.status,
      events: data,
    };
  }

  async getTeams(id) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/team${id ? "/" + id : "s"}`
    ).catch((error) => console.error("Error:", error));

    const data = response.json();

    if (id) {
      return {
        status: response.status,
        event: data,
      };
    }

    return {
      status: response.status,
      events: data,
    };
  }

  async getMatch(id) {
    return fetch(`${import.meta.env.VITE_API_URL}/match${id ? "/" + id : "s"}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }
}

export default new EventService();
