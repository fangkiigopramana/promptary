function copyPrompt(el) {
  const prompt = JSON.parse(el.dataset.prompt)

  navigator.clipboard.writeText(prompt)
    .then(() => alert("Copied!"))
    .catch(() => alert("Failed to copy"))
}