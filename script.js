const container = document.getElementById('dogContainer');
const filterBtn = document.getElementById('filterBtn');
const refreshBtn = document.getElementById('refreshBtn');
const breedInput = document.getElementById('breedInput');

// Fetch images from the Dog API
async function fetchDogs(breed = "") {
  container.innerHTML = "Loading...";

  let url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random/5`
    : `https://dog.ceo/api/breeds/image/random/5`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "success") {
      container.innerHTML = `<p>❌ Breed not found. Try "pug", "beagle", "bulldog", etc.</p>`;
      return;
    }

    container.innerHTML = "";
    data.message.forEach(imgUrl => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "Dog";
      container.appendChild(img);
    });
  } catch (error) {
    container.innerHTML = `<p>🚫 Failed to fetch dog images.</p>`;
  }
}

// Filter by breed when filter button is clicked
filterBtn.addEventListener("click", () => {
  const breed = breedInput.value.trim().toLowerCase();
  fetchDogs(breed);
});

// Refresh to get random dogs when refresh button is clicked
refreshBtn.addEventListener("click", () => {
  breedInput.value = ""; // clear input
  fetchDogs(); // get random dogs
});

// Load initial random dogs
fetchDogs();
