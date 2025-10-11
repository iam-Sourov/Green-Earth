// Load All Plants
const loadPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayAllPlants(data.plants));
};
// Display All Plants
const displayAllPlants = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ``
    for (const plant of plants) {
        const card = document.createElement("div");
        card.innerHTML = `<div class=" grid grid-cols-1 md:grid md:grid-cols-3 items-stretch gap-1 p-1">
    <div class="card bg-base-100 w-140px md:min-w-[280px] shadow-sm">
        <figure>
            <div class="w-full h-[180px] md:w-[310px] md:h-[180px]">
                <img class="w-full h-full object-cover" src="${plant.image}" alt="AllPlants"> 
            </div>
         </figure>
        <div class="card space-y-2 p-2">
            <h2 onclick="loadPlantDetails(${plant.id})" class=" w-fit cursor-pointer text-sm card-title"> ${plant.name}</h2>
            <p class="w-full text-xs truncate"> ${plant.description} </p>
            <div class="card-action flex justify-between items-center ">
                <div class="badge text-sm text-green-700 rounded-lg text-nowrap bg-[#DCFCE7]"> ${plant.category}</div>
                <div class="font-bold text-xs">
                    <p>৳<span>${plant.price}</span></p>
                </div>
            </div>
        </div>
         <button 
                class="add-to-cart-btn bg-[#15803D] text-white p-2 rounded-full w-full mt-auto"
                data-id="${plant.id}"
                data-name="${plant.name}"
                data-price="${plant.price}"
                data-image="${plant.image}">
                Add To Cart
        </button>
    </div>
</div>`;
        cardContainer.append(card);
    }
};
// Load All Plants By All plants Btn
const loadAllPlantsByBtn = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayAllPlantsByBtn(data.plants));
};
// Display All Plants By All Plants Btn
const displayAllPlantsByBtn = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    for (const plant of plants) {
        const card = document.createElement("div");
        card.innerHTML = `<div class=" grid grid-cols-1 md:grid md:grid-cols-3 items-stretch gap-2 p-1">
    <div class="card w-140px md:min-w-[280px] shadow-lg">
        <figure>
            <div class="w-[155px] h-[90px] md:w-[310px] md:h-[180px]">
                <img class="w-full h-full object-cover" src="${plant.image}" alt="AllPlants"> 
            </div>
         </figure>
        <div class="card-body space-y-1 p-2">
            <h2 onclick="loadPlantDetails(${plant.id})" class=" w-fit cursor-pointer text-sm card-title"> ${plant.name}</h2>
            <p class="text-xs truncate  "> ${plant.description} </p>
            <div class="card-action flex justify-between items-center ">
                <div class="badge text-sm text-green-700 rounded-lg text-nowrap bg-[#DCFCE7]"> ${plant.category}</div>
                <div class="font-bold text-xs">
                    <p>৳<span>${plant.price}</span></p>
                </div>
            </div>
        </div>
          <button class="bg-[#15803D] text-white md:py-2 rounded-4xl p-2" data-product-name="${plant.name}" 
            data-product-price="${plant.price}>Add To Cart</button>
    </div>
</div>`;
        cardContainer.append(card);
    };
}
loadPlants();
loadAllPlantsByBtn();