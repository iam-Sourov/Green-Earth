// Load Data From Api For Cart
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
        card.innerHTML = `<div class=" grid grid-cols-1 md:grid md:grid-cols-3 items-stretch gap-1 p-1">
    <div class="card bg-base-100 w-140px md:min-w-[280px] shadow-sm">
        <figure>
            <div class="w-full h-[180px] md:w-[310px] md:h-[180px]">
                <img class="w-full h-full object-cover" src="${plant.image}" alt="AllPlants"> 
            </div>
         </figure>
        <div class="card space-y-2 p-2">
            <h2 onclick="loadPlantDetails(${plant.id})" class=" w-fit cursor-pointer text-sm card-title"">${plant.name}</h2>
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