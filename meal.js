const foodSection = document.getElementById("foods-section");

// user input value getting-
const userInput = () => {
  let inputField = document.getElementById("user-input");
  return inputField.value;
};

// API call and user value setting-
const mealLoad = async () => {
  let userValue = userInput();
  if (userValue == "") {
    alert("Please input food name!");
  } else {
    foodSection.textContent = "";
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userValue}`;
    let res = await fetch(url);
    let data = await res.json();
    setMealLoad(data.meals);
  }
};

// using API called data and showing on UI-
const setMealLoad = (foods) => {
  const errorsDiv = document.getElementById("errors");
  const spinnerDiv = document.getElementById("spinner-field");
  console.log(spinnerDiv);
  if (foodSection.childElementCount == 0) {
    spinnerDiv.classList.remove("d-none");
    spinnerDiv.classList.add("d-block");
  }
  if (!foods) {
    errorsDiv.classList.remove("d-none");
    errorsDiv.classList.add("d-block");
  } else {
    errorsDiv.classList.add("d-none");
    foods.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("col-4");
      const { strMeal, strMealThumb, strInstructions, idMeal } = food;
      div.innerHTML = `<div class="card m-3">
                    <img class='img-fluid' src="${strMealThumb}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <p class="card-text">${strInstructions.slice(
                          0,
                          200
                        )}</p>
                        <button class="btn btn-warning" onclick= "singleFoodDetails('${idMeal}')">Read more</button>
                      </div>
                    </div>`;
      foodSection.appendChild(div);
    });
  }
};

// Caliing API to show single food details after click on read-more button-
const singleFoodDetails = async (id) => {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  let res = await fetch(url);
  let data = await res.json();
  setSingleFoodDetails(data.meals[0]);
};

// setting API DATA to show single food details after click on read-more button-
const setSingleFoodDetails = (singleFood) => {
  foodSection.textContent = "";
  console.log(singleFood);
  const { strMeal, strMealThumb, strInstructions, strYoutube } = singleFood;
  const div = document.createElement("div");
  div.classList.add("col-12");
  div.innerHTML = `<div class="card m-3 w-100">
                    <img class='img-fluid' src="${strMealThumb}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                        <p class="card-text">${strInstructions}</p>
                        <a href="${strYoutube}" class="btn btn-primary">Watch video</a>
                      </div>
                    </div>`;
  foodSection.appendChild(div);
};
