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
    );

    if (id) {
      return {
        status: response.status,
        event: await response.json(),
      };
    }

    return {
      status: response.status,
      events: await response.json(),
    };
  }

  async getMatch(id) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/match${id ? "/" + id : "s"}`
    );

    if (id) {
      return {
        status: response.status,
        match: await response.json(),
      };
    }

    return {
      status: response.status,
      matches: await response.json(),
    };
  }
}

export default new EventService();
