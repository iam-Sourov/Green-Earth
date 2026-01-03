
const loadPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayAllPlants(data.plants));
};

const displayAllPlants = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    for (const plant of plants) {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col group">
            
            <figure class="relative h-48 w-full overflow-hidden cursor-pointer bg-gray-50" onclick="loadPlantDetails('${plant.id}')">
                <img 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src="${plant.image}" 
                    alt="${plant.name}"
                    loading="lazy" 
                />
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <span class="text-xs font-semibold uppercase tracking-wider bg-black/50 px-3 py-1 rounded-2xl backdrop-blur-sm">View Details</span>
                </div>
            </figure>

            <div class="p-5 flex flex-col flex-grow">
                
                <div class="flex justify-between items-start mb-2">
                    <div class="badge bg-green-50 text-emerald-700 border-none text-xs font-semibold px-3 py-1">
                        ${plant.category}
                    </div>
                </div>

                <h2 onclick="loadPlantDetails('${plant.id}')" 
                    class="text-lg font-serif font-bold text-gray-800 cursor-pointer hover:text-emerald-600 transition mb-2 leading-tight">
                    ${plant.name}
                </h2>

                <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    ${plant.description}
                </p>

                <div class="border-t border-gray-100 my-2"></div>

                <div class="flex justify-between items-center pt-2">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
                        <span class="text-xl font-bold text-emerald-700">৳${plant.price}</span>
                    </div>
                    
                    <button class="add-to-cart-btn btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-2xl px-5 shadow-md flex items-center gap-2"
                        data-id="${plant.id}"
                        data-name="${plant.name}" 
                        data-price="${plant.price}"
                        data-image="${plant.image}">
                        <i class="fa-solid fa-cart-plus text-xs"></i> Add
                    </button>
                </div>
            </div>
        </div>`;
        
        cardContainer.append(card);
    }
};

const loadAllPlantsByBtn = () => {
    loadPlants();
};

loadPlants();