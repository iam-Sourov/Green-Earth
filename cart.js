
const loadCart = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayPlants(data.plants));
};
let cart = [];
const displayPlants = (plants) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="card bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col group">
    
    <figure class="relative h-48 w-full overflow-hidden cursor-pointer bg-gray-50" onclick="loadPlantDetails(${plant.id})">
        <img 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            src="${plant.image}" 
            alt="${plant.name}" 
        />
    </figure>

    <div class="p-4 flex flex-col flex-grow space-y-3">
        
        <div class="flex justify-between items-center">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                ${plant.category}
            </span>
            <span class="text-lg font-bold text-gray-900">৳${plant.price}</span>
        </div>

        <h2 onclick="loadPlantDetails(${plant.id})" 
            class="text-lg font-serif font-bold text-gray-800 cursor-pointer hover:text-emerald-700 transition line-clamp-1">
            ${plant.name}
        </h2>

        <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            ${plant.description}
        </p>

        <div class="flex-grow"></div>

        <button 
            class="add-to-cart-btn btn btn-sm w-full bg-[#15803D] hover:bg-[#14532D] text-white border-none rounded-lg shadow-sm flex items-center gap-2"
            data-id="${plant.id}"
            data-name="${plant.name}"
            data-price="${plant.price}"
            data-image="${plant.image}">
            <i class="fa-solid fa-cart-plus"></i> Add To Cart
        </button>
    </div>
</div>`;
        cardContainer.appendChild(card);
    });
};
const updateCartDisplay = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `<div id="cart-items" class="flex justify-between items-center bg-[#CFF0DC] rounded-lg p-1.5">
    <div>
        <h1 class="text-nowrap">${item.name}</h1>
        <p class="text-xs">৳${item.price} x ${item.quantity}</p>
    </div>
    <div>
        <button class="hover:text-red-600 removeCart" data-id="${item.id}">
            <i class="fa-solid fa-xmark pointer-events-none"></i>
        </button>
    </div>
</div>`;
        cartItemsContainer.appendChild(cartItemDiv);
    });
    cartTotalElement.innerText = total.toFixed(2);
};

const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
};
const cartEvent = () => {
    const cartData = document.getElementById('card-container');
    cartData.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image
            };
            addToCart(product);
        }
    });
};
// remove Function
const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
};
const cartParent = () => {
    const cartItems = document.getElementById('cart-items');
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeCart')) {
            const id = e.target.dataset.id;
            removeFromCart(id);
        }
    });
};
cartEvent();
cartParent();
loadCart();