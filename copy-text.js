function copyPrompt(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied to clipboard!');
    }).catch(err => {
        alert('❌ Failed to copy');
        console.error('Copy failed:', err);
    });
}