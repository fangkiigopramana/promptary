let allPrompts = [];
let filteredPrompts = [];
let displayedCount = 12;
const itemsPerLoad = 12;
let currentCategory = 'All';
let currentSort = 'newest';

// Load data
async function loadData() {
    try {
        const response = await fetch('data-prompts.json');
        const data = await response.json();
        allPrompts = data.prompts;
        filteredPrompts = [...allPrompts];

        await renderCategoriesFromPrompts();
        renderPrompts();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Filter and render
function filterAndRender() {
    if (currentCategory === 'All') {
        filteredPrompts = [...allPrompts];
    } else {
        filteredPrompts = allPrompts.filter(p => p.category === currentCategory);
    }
    sortPrompts();
    renderPrompts();
}

// Sort prompts
function sortPrompts() {
    if (currentSort === 'newest') {
        filteredPrompts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (currentSort === 'popular') {
        filteredPrompts.sort((a, b) => b.likes - a.likes);
    } else if (currentSort === 'trending') {
        filteredPrompts.sort((a, b) => b.views - a.views);
    }
}

// Render prompts
function renderPrompts() {
    const grid = document.getElementById('promptsGrid');
    const displayed = filteredPrompts.slice(0, displayedCount);
    const noResults = document.getElementById('noResults');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (displayed.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        loadMoreBtn.classList.add('hidden');
        return;
    }

    noResults.classList.add('hidden');
    grid.innerHTML = displayed.map(prompt => `
        <div class="prompt-card group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer" onclick="openModal(${prompt.id})">
            <!-- Image -->
            <div class="relative h-48 overflow-hidden bg-gray-200">
                <img src="${prompt.image}" alt="${prompt.title}" class="w-full h-full object-cover">
                <div class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <p class="text-white text-sm line-clamp-2">${prompt.prompt}</p>
                </div>
            </div>

            <!-- Content -->
            <div class="p-4">
                <h3 class="font-bold text-gray-900 line-clamp-1">${prompt.title}</h3>
                
                <!-- Category badge -->
                <div class="mt-3 flex items-center justify-between">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">${prompt.category}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Show load more button
    loadMoreBtn.classList.toggle('hidden', displayedCount >= filteredPrompts.length);
}

// Search
function searchPrompt(query) {
    document.getElementById('searchInput').value = query;
    filterSearch();
}

function filterSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    filteredPrompts = allPrompts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.prompt.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
    );
    displayedCount = 8;
    renderPrompts();
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterSearch);
document.getElementById('loadMoreBtn').addEventListener('click', () => {
    displayedCount += itemsPerLoad;
    renderPrompts();
});

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.sort-btn').forEach(b => {
            b.classList.remove('bg-purple-500', 'border-purple-500', 'text-purple-600');
            b.classList.add('bg-white', 'border-gray-300', 'text-gray-700');
        });
        btn.classList.remove('bg-white', 'border-gray-300', 'text-gray-700');
        btn.classList.add('bg-purple-500', 'border-purple-500', 'text-white');
        currentSort = btn.dataset.sort;
        displayedCount = 8;
        filterAndRender();
    });
});

// Mobile sidebar toggle
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('closed');
});

document.getElementById('closeSidebarBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('closed');
});

document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) closeModal();
});

// Load data on page load
loadData();