const getProducts = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk0YzE4N2U1YzAwMTgxNGM2MDAiLCJpYXQiOjE3MDU2NTQ2MDQsImV4cCI6MTcwNjg2NDIwNH0.utCaMxchXpVVlDbMFb-XcbCpSPVG1Qo-T3Q0JL3FGYg",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Pagina non trovata");
        } else if (response.status === 500) {
          throw new Error(
            "500 - Errore lato server - Contatta l'assistenza tecnica"
          );
        } else {
          throw new Error("Errore generico");
        }
      }
    })
    .then((products) => {
      console.log("products", products);

      const card = document.getElementById("products-row"); // mia row vuota
      products.forEach((product) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
        newCol.innerHTML = `
    <div class="card">
    <a href="./crudazon-dettagli.html?productId=${product._id}" class="text-info bg-dark text-center my-2"><i class="bi bi-caret-right"></i></i>
               SCOPRI DI PIU'
              </a>
    <img src="${product.imageUrl}" class="card-img-top" alt="prodotto">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <h6 class="card-title">${product.brand}</h6>
            <p class="card-text">
                ${product.description}
            </p>
            <p class="card-text">€
                ${product.price}
            </p>
            
            <a href="./crudazon-dettagli.html?productId=${product._id}" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
               MODIFICA
              </a>
              
             
        </div>
    </div>
    `;
        card.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log("errore!", err);
      // magari qua creeremmo un Alert di bootstrap...
      // - errori di connessione internet nostri
      // - siamo finiti qui dentro perchè abbiamo fatto un throw new Error()
    });
};
getProducts();
