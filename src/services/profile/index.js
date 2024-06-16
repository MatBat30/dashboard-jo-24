// logique des tri etc + les requêtes http avec fetch
class ProfileService {
  async getUser(id) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user${id ? "/" + id : "s"}`
    );
    let data = await response.json()

    if (id) {
      return {
        status: response.status,
        user: data.user,
      };
    } else {
      return {
        status: response.status,
        users: response.json(),
      };
    }
  }

  async loginUser(email, password) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      let data = await response.json()

      return {
        status: response.status,
        user: data.user,
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async createUser(nom, prenom, date_naissance, email, password) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            date_naissance: date_naissance,
            email: email,
            password: password,
          }),
        }
      );

      let data = await response.json()

      return {
        status: response.status,
        user: data.user,
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async updateUser(nom, prenom, date_naissance, email, password) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            date_naissance: date_naissance,
            email: email,
            password: password,
          }),
        }
      );

      return {
        status: response.status,
        user: await response.json(),
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async addFavori(userId, matchId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/add-favori`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          match_id: matchId,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'ajout du favori : ${response.statusText}`
        );
      }

      const result = await response.json();
      return {
        status: response.status,
        result: result
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  async fetchMatchFavoris(userId) {
    try {
      // Fetching favoris of the user
      const responseFavoris = await fetch(
        `${import.meta.env.VITE_API_URL}/favoris/user/${userId}`
      );
      if (!responseFavoris.ok) {
        throw new Error(
          `Erreur lors de la récupération des favoris : ${responseFavoris.statusText}`
        );
      }
      const favoris = await responseFavoris.json();

      // Collect match IDs from the favoris
      const matchIds = favoris.map((favori) => favori.match_id);
      let userFavoritesMatch = []
      // Fetch details for each match and log them
      for (const matchId of matchIds) {
        const responseMatch = await fetch(
          `${import.meta.env.VITE_API_URL}/match/${matchId}`
        );
        if (!responseMatch.ok) {
          throw new Error(
            `Erreur lors de la récupération du match ${matchId} : ${responseMatch.statusText}`
          );
        }
        const match = await responseMatch.json();
        userFavoritesMatch.push(match)
      }

      return userFavoritesMatch
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ProfileService();
