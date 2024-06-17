import NavBar from "../../generals/navbar";
import ProfileService from "../../../services/profile";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../hooks/contextUser";
import { Carousel } from "primereact/carousel";
import { Navigate } from "react-router-dom";

function FavoriCarousel() {
  const [favorisList, setfavorisList] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    ProfileService.fetchMatchFavoris(user.id).then((res) => setfavorisList(res))
  }, []);

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <h6 className="mt-0 mb-3">${product.price}</h6>
          <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
          ></Tag>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="p-button-success p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="font-medium text-3xl text-primary m-3">
        Mes Favoris
      </div>
      <Carousel
        value={favorisList}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}

function HomePage() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user == null) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])

  if (user) {
    return (
      <div className="w-full flex flex-column">
        <NavBar />
        <div className="p-5">
          <span className="font-medium text-3xl text-900 mb-3">Bienvenue {user.firstname ? user.firstname : 'test'} {user.lastname ? user.lastname : 'Utilisateur'}</span>
        </div>
        <section>
          <FavoriCarousel />
        </section>
      </div>
    );
   
  }

  return (
    <Navigate to="/login" />
  )

}

export default HomePage;
