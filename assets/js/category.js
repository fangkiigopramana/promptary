    // Render categories
    function renderCategories(categories) {
        const list = document.getElementById('categoriesList');
        list.innerHTML = categories.map(cat => `
            <button class="category-btn w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition ${cat.name === 'All' ? 'bg-purple-600' : ''}" data-category="${cat.name}">
                <span class="ml-2 font-medium">${cat.name}</span>
                <span class="float-right text-xs text-gray-400">${cat.count}</span>
            </button>
        `).join('');

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('bg-purple-600'));
                btn.classList.add('bg-purple-600');
                currentCategory = btn.dataset.category;
                displayedCount = 8;
                filterAndRender();
            });
        });
    }

    // Method 1: Menggunakan Set dan Map
    async function getCategoriesFromPrompts() {
        try {
            const response = await fetch('assets/data/data-prompts.json');
            const data = await response.json();

            // Get unique categories dari prompts
            const categorySet = new Set(data.prompts.map(p => p.category));
            const uniqueCategories = Array.from(categorySet).map(cat => ({
                id: Math.random(),
                name: cat,
                count: data.prompts.filter(p => p.category === cat).length
            }));

            // Add "All" category di awal
            const allCategories = [
                { id: 1, name: 'All', count: data.prompts.length },
                ...uniqueCategories
            ];

            return allCategories;
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    }

    // Method 2: Menggunakan reduce (lebih efficient)
    async function getCategoriesFromPromptsReduce() {
        try {
            const response = await fetch('assets/data/data-prompts.json');
            const data = await response.json();

            // Reduce untuk create unique categories
            const categoriesMap = data.prompts.reduce((acc, prompt) => {
                if (!acc[prompt.category]) {
                    acc[prompt.category] = {
                        id: Math.random(),
                        name: prompt.category,
                        count: 0
                    };
                }
                acc[prompt.category].count++;
                return acc;
            }, {});

            // Convert object ke array
            const uniqueCategories = Object.values(categoriesMap);

            // Add "All" category
            const allCategories = [
                { id: 1, name: 'All', count: data.prompts.length },
                ...uniqueCategories
            ];

            return allCategories;
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    }

    // Method 3: Menggunakan filter dan findIndex
    async function getCategoriesFromPromptsFilter() {
        try {
            const response = await fetch('assets/data/data-prompts.json');
            const data = await response.json();

            const uniqueCategories = data.prompts
                .filter((prompt, index, self) =>
                    self.findIndex(p => p.category === prompt.category) === index
                )
                .map(prompt => ({
                    id: Math.random(),
                    name: prompt.category,
                    count: data.prompts.filter(p => p.category === prompt.category).length
                }));

            // Add "All" category
            const allCategories = [
                { id: 1, name: 'All', count: data.prompts.length },
                ...uniqueCategories
            ];

            return allCategories;
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    }

    // Atau langsung di HTML - Dynamic Categories Render
    async function renderCategoriesFromPrompts() {
        const categories = await getCategoriesFromPromptsReduce();
        const list = document.getElementById('categoriesList');

        list.innerHTML = categories.map(cat => `
<button class="category-btn w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition ${cat.name === 'All' ? 'bg-purple-600' : ''}" 
        data-category="${cat.name}">
    <span class="ml-2 font-medium">${cat.name}</span>
    <span class="float-right text-xs text-gray-400">${cat.count}</span>
</button>
`).join('');

        // Add event listeners
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('bg-purple-600'));
                btn.classList.add('bg-purple-600');
                currentCategory = btn.dataset.category;
                displayedCount = 8;
                filterAndRender();
            });
        });
    }

        // Function untuk render categories dari prompts
        async function renderCategoriesFromPrompts() {
            const categories = await getCategoriesFromPromptsReduce();
            const list = document.getElementById('categoriesList');

            list.innerHTML = categories.map(cat => `
            <button class="category-btn w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition ${cat.name === 'All' ? 'bg-purple-600' : ''}" 
                    data-category="${cat.name}">
                <span class="ml-2 font-medium">${cat.name}</span>
                <span class="float-right text-xs text-gray-400">${cat.count}</span>
            </button>
        `).join('');

            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('bg-purple-600'));
                    btn.classList.add('bg-purple-600');
                    currentCategory = btn.dataset.category;
                    displayedCount = 8;
                    filterAndRender();
                });
            });
        }

