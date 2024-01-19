// recuperiamo l'ID dalla barra degli indirizzi
const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("productId");
console.log(productId);

fetch("https://striveschool-api.herokuapp.com/api/product/" + "/" + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk0YzE4N2U1YzAwMTgxNGM2MDAiLCJpYXQiOjE3MDU2NTQ2MDQsImV4cCI6MTcwNjg2NDIwNH0.utCaMxchXpVVlDbMFb-XcbCpSPVG1Qo-T3Q0JL3FGYg",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore");
    }
  })
  .then((singleProduct) => {
    console.log(singleProduct);
    document.getElementById("name").innerText = singleProduct.name;
    document.getElementById("description").innerText =
      singleProduct.description;
    document.getElementById("price").innerText = "€" + singleProduct.price;
    document.getElementById("brand").innerText = singleProduct.brand;

    // let allTheExistingImageTags = document.getElementById("shirt");
    // for (let i = 0; i < allTheExistingImageTags.length; i++) {
    //   allTheExistingImageTags[i].src = singleProduct.imageUrl;
    // }
    // document.getElementById("shirt").innerHTML = singleProduct.imageUrl;
    // allTheExistingImageTags.forEach((imgTag, i) => {
    //   imgTag.src = singleProduct[i].imageUrl;
    // });

    // TASTO DELETE
    document.getElementById("delete").addEventListener("click", function () {
      if (confirm("Sei sicuro di voler eliminare i dati?"))
        fetch(
          "https://striveschool-api.herokuapp.com/api/product/" +
            "/" +
            productId,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk0YzE4N2U1YzAwMTgxNGM2MDAiLCJpYXQiOjE3MDU2NTQ2MDQsImV4cCI6MTcwNjg2NDIwNH0.utCaMxchXpVVlDbMFb-XcbCpSPVG1Qo-T3Q0JL3FGYg",
            },

            method: "DELETE",
          }
        )
          .then((response) => {
            if (response.ok) {
              // cancellazione andata a buon fine
              alert("cancellato!");
              location.assign("./crudazon-homepage.html"); // riportiamo l'utente in home
            } else {
              alert("problema nella cancellazione :(");
              throw new Error("errore nella cancellazione");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    });

    // TASTO MODIFICA
    document
      .getElementById("edit")
      .setAttribute("href", "./backoffice.html?productId=" + singleProduct._id);
  })
  .catch((err) => {
    console.log(err);
  });
