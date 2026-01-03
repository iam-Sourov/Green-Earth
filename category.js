
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((categories) => displayCategories(categories.categories));
}

const displayCategories = (categoriesBtns) => {
    const categoryContainer = document.getElementById('categoryContainer');

    categoriesBtns.forEach(btn => {

        const button = document.createElement('button');

        button.className = `category-btn w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-50 text-[#15803D] border border-green-100 hover:bg-[#15803D] hover:text-white mb-2`;

        button.innerText = btn.category_name;


        button.id = `category-btn-${btn.id}`;


        button.onclick = () => {
            loadCategoriesById(btn.id);
            handleActiveState(button.id);
        };

        categoryContainer.appendChild(button);
    });
};

const loadCategoriesById = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            displayAllPlants(data.plants || data);
        })
        .catch(err => console.error(err));
};

const handleActiveState = (activeId) => {

    const allBtns = document.querySelectorAll('.category-btn');

    allBtns.forEach(btn => {
        btn.classList.remove('bg-[#15803D]', 'text-white');
        btn.classList.add('bg-green-50', 'text-[#15803D]');
    });

    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        activeBtn.classList.remove('bg-green-50', 'text-[#15803D]');
        activeBtn.classList.add('bg-[#15803D]', 'text-white');
    }
};

loadCategories();