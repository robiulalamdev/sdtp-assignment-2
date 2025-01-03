document.getElementById("search-btn").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value;

  if (searchValue) {
    handleSearch(searchValue);
  } else {
    alert("Please enter a drink name");
  }
});

let cartCount = 0;

const handleDisplay = (drinks) => {
  const foodsContainer = document.getElementById("foods-container");
  foodsContainer.textContent = "";

  const notFoundContainer = document.getElementById("not-found");
  if (notFoundContainer) {
    notFoundContainer.textContent = "";
  }

  drinks.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="card shadow-sm border-0 mb-4" >
                <img src="${item.strDrinkThumb}"
                    class="card-img-top" alt="Apple" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${item.strGlass}</h5>
                    <p class="card-text"><strong>Category:</strong> ${
                      item.strCategory
                    }</p>
                    <p class="card-text"><strong>Instructions:</strong> ${item.strInstructions?.slice(
                      0,
                      15
                    )}</p>

                  <div class="d-flex justify-content-center align-items-center gap-3 mt-3">
                      <button class="btn btn-sm btn-primary add-to-group-btn">Add to group</button>
                      <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                      onclick="showModalContent('${item.strGlass}', '${
      item.strDrinkThumb
    }', '${item.strCategory}', '${item.strAlcoholic}', '${
      item.strInstructions
    }')"
    >Details</button>
                  </div>
                </div>
            </div>
      `;

    foodsContainer.appendChild(div);

    const addToGroupBtn = div.querySelector(".add-to-group-btn");
    addToGroupBtn.addEventListener("click", function () {
      if (cartCount >= 7) {
        alert("You can only add up to 7 items to the cart.");
        return;
      }

      cartCount++;
      document.getElementById("total-cart").innerText = cartCount;

      const cartTableBody = document.getElementById("cart-table-body");
      const cartRow = document.createElement("tr");
      cartRow.className = "cart-item";
      cartRow.innerHTML = `
        <td>${cartCount}</td>
        <td>
          <img src="${item.strDrinkThumb}" alt="" style="height: 50px; width: 50px; border-radius: 100%; object-fit: cover;">
        </td>
        <td>${item.strGlass}</td>
      `;
      cartTableBody.appendChild(cartRow);

      addToGroupBtn.disabled = true;
      addToGroupBtn.innerText = "Already added";
    });
  });
};

const showModalContent = (
  title,
  imgSrc,
  category,
  alcoholic = "",
  instructions
) => {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img src="${imgSrc}" class="card-img-top rounded" alt="Apple" style="height: 250px; object-fit: cover;">
        <div class="p-3">
          <p class="card-text"><strong>Category:</strong> ${category}</p>
          <p class="card-text"><strong>Alcoholic:</strong> ${alcoholic}</p>
          <p class="card-text">${instructions}</p>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
};

const displayNotFound = async () => {
  const foodsContainer = document.getElementById("foods-container");
  foodsContainer.textContent = "";
  const notFoundContainer = document.getElementById("not-found");
  const div = document.createElement("div");

  div.className = "d-flex justify-content-end align-items-center w-100";
  div.innerHTML = `
           <div class="alert alert-warning text-center" role="alert" style="max-width: 80%;">
                    <h1>Your searched drink is not found!</h1>
                </div>
    `;

  notFoundContainer.appendChild(div);
};

const handleSearch = async (search = "") => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response) => response.json())
    .then((data) => {
      if (data?.drinks === null) {
        displayNotFound();
      } else {
        handleDisplay(data?.drinks);
      }
      console.log(data?.drinks);
    });
};

handleSearch("a");
