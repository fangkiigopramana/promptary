// Open modal
function openModal(id) {
    const prompt = allPrompts.find(p => p.id === id);
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" onclick="closeModal()">×</button>
        
        <!-- Image -->
        <img src="${prompt.image}" alt="${prompt.title}" class="w-full h-96 object-cover rounded-xl mb-6">

        <!-- Title -->
        <h2 class="text-3xl font-bold text-gray-900 mb-4">${prompt.title}</h2>

        <!-- Meta -->
        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <span class="px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-lg">${prompt.category}</span>
        </div>

        <!-- Prompt -->
        <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Prompt</h3>
            <p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">${prompt.prompt}</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
            <button class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
            onclick="copyPrompt('${prompt.prompt}')">
                📋 Copy Prompt
            </button>
        </div>
    `;

    document.getElementById('modal').classList.remove('hidden');
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}
