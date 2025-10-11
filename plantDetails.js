// Load Plant Details
const loadPlantDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((details) => displayPlantDetails(details.plants));
};
// 
const displayPlantDetails = (plantDetails) => {
    const plantDetailsContainer = document.getElementById(
        "plantDetailsContainer"
    );
    plantDetailsContainer.innerHTML = `<div>
    <figure>
        <img class="w-full h-[180px] object-cover" src="${plantDetails.image}" alt="AllPlants">
    </figure>
    <div class="card-body">
        <h2 class=" text-sm card-title">${plantDetails.name}</h2>
        <p class="text-xs text-wrap ">${plantDetails.description}</p>
        <div class="card-action flex justify-between items-center gap-4 ">
            <div class="badge text-sm text-green-700 rounded-lg text-nowrap bg-[#DCFCE7]">
                ${plantDetails.category}</div>
            <div class=" text-xs">
                <p class="font-semibold">৳<span>${plantDetails.price}</span></p>
            </div>
        </div>
    </div>
</div>`;
    document.getElementById("my_modal_2").showModal();
};
