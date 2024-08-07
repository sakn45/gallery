document.addEventListener('DOMContentLoaded', () => {
    const loadCatsButton = document.getElementById('loadCats');
    const imageContainer = document.getElementById('imageContainer');
    const loader = document.getElementById('loader');

    const showLoader = () => loader.style.display = 'block';
    const hideLoader = () => loader.style.display = 'none';

    const fetchImages = async () => {
        try {
            showLoader();
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            imageContainer.innerHTML = '';

            data.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = 'Cat image';
                imageContainer.appendChild(imgElement);
            });
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            hideLoader();
        }
    };

    loadCatsButton.addEventListener('click', (event) => {
        event.preventDefault();
        fetchImages();
    });
});
