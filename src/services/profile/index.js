// logique des tri etc + les requêtes http avec fetch
class ProfileService {
  async getUser(id) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user${id ? "/" + id : "s"}`
    );
    if (id) {
      return {
        status: response.status,
        user: response.json(),
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

      return {
        status: response.status,
        user: await response.json(),
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

      if (response.ok) {
        const data = await response.text();
        console.log("User created successfully:", data);
      } else {
        const error = await response.text();
        console.error("User creation failed:", error);
      }
      return response.status;
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

      if (response.ok) {
        const data = await response.text();
        console.log("User created successfully:", data);
      } else {
        const error = await response.text();
        console.error("User creation failed:", error);
      }
      return response.status;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async addFavori(user_id, match_id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/add-favori`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id, match_id: match_id }),
        }
      );

      if (response.ok) {
        const data = await response.text();
        console.log("Favori added successfully:", data);
      } else {
        const error = await response.text();
        console.error("Failed to add favori:", error);
      }
      return response.status;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getFavori(user_id) {
    return fetch(`${import.meta.env.VITE_API_URL}/favori/user/${user_id}`)
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }
}

export default new ProfileService();
