const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const imgInput = document.getElementById("img");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const form = document.getElementById("product-form");

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  // cambiamo il titolo del form
  document.getElementById("form-title").innerText = "Form di modifica prodotto";
  // recupero le informazioni da riempire nel form con una fetch() specifica
  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + "/" + productId,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk0YzE4N2U1YzAwMTgxNGM2MDAiLCJpYXQiOjE3MDU2NTQ2MDQsImV4cCI6MTcwNjg2NDIwNH0.utCaMxchXpVVlDbMFb-XcbCpSPVG1Qo-T3Q0JL3FGYg",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero del prodotto cliccato");
      }
    })
    .then((singleProduct) => {
      // ho ottenuto i dettagli di un singolo concerto!
      // ripopolo il form
      nameInput.value = singleProduct.name;
      descriptionInput.value = singleProduct.description;
      priceInput.value = singleProduct.price;
      brandInput.value = singleProduct.brand;
      imgInput.value = singleProduct.imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
  };

  console.log("prodotto da creare:", newProduct);

  let URLToUse;
  let methodToUse;

  if (productId) {
    methodToUse = "PUT";
    URLToUse =
      "https://striveschool-api.herokuapp.com/api/product/" + "/" + productId;
  } else {
    methodToUse = "POST";
    URLToUse = "https://striveschool-api.herokuapp.com/api/product/";
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk0YzE4N2U1YzAwMTgxNGM2MDAiLCJpYXQiOjE3MDU2NTQ2MDQsImV4cCI6MTcwNjg2NDIwNH0.utCaMxchXpVVlDbMFb-XcbCpSPVG1Qo-T3Q0JL3FGYg",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        alert("PRODOTTO SALVATO!");
        nameInput.value = "";
        descriptionInput.value = "";
        priceInput.value = "";
        brandInput.value = "";
        imgInput.value = "";
      } else {
        alert("PROBLEMA NEL SALVATAGGIO!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

const confirmReset = function () {
  if (confirm("Sei sicuro di voler resettare il modulo?")) {
    document.getElementById("product-form").reset();
  }
};
