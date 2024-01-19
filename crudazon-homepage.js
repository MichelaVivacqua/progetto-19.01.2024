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
    <div class="card h-100">
    <a href="./crudazon-dettagli.html?productId=${product._id}" class="text-warning bg-dark text-center my-2"><i class="bi bi-caret-right"></i></i>
               SCOPRI DI PIU' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stars" viewBox="0 0 16 16">
               <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
             </svg>
              </a>
    <img src="${product.imageUrl}" class="card-img-top" alt="prodotto">
    
        <div class="card-body  d-flex flex-column justify-content-around align-items-center">
            <h5 class="card-title text-center">${product.name}</h5>
            <h4 class="card-title bg-danger text-center text-white">${product.brand}</h4>
            <p class="card-text text-center">
                ${product.description}
            </p>
            <p class="card-text text-center">€
                ${product.price}
            </p>
            
            <a href="./crudazon-dettagli.html?productId=${product._id}" class="btn btn-warning mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
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
    });
};
getProducts();

// Simula un ritardo di caricamento
setTimeout(function () {
  // Nasconde la barra di progresso
  document.getElementById("loadingProgress").style.display = "none";

  // Mostra il contenuto della pagina
  document.getElementsByTagName("main")[0].style.display = "block";
}, 1500); // Tempo in millisecondi (simula il caricamento di risorse)

const yearSpan = document.getElementById("year");
const now = new Date();
yearSpan.innerText = now.getFullYear();
