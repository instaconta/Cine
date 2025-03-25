const API_KEY = "67a45886486881bbd4ce5ccab8e52c97";
const BASE_URL = "https://api.themoviedb.org/3";

// Função para carregar filmes por categoria
async function loadCategory(category) {
    const API_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${getGenreId(category)}`;
    fetchMovies(API_URL);
}

// Função para buscar filmes pelo nome
async function searchMovies() {
    const query = document.getElementById('search-input').value.trim();
    if (query.length < 3) return; // Só busca se houver 3 ou mais caracteres

    const API_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    fetchMovies(API_URL);
}

// Função para buscar e exibir filmes
async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const container = document.getElementById('movies-container');
        container.innerHTML = ''; // Limpa os filmes anteriores

        data.results.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            `;
            movieElement.onclick = () => redirectToMovie(movie.id); // Redireciona ao clicar
            container.appendChild(movieElement);
        });
    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

// Função para redirecionar para a página do filme
function redirectToMovie(movieId) {
    window.location.href = `filme.html?id=${movieId}`;
}

// Função para converter categorias em IDs do TMDB
function getGenreId(category) {
    const genres = {
        action: 28,
        comedy: 35,
        drama: 18
    };
    return genres[category] || 28; // Padrão: Ação
}

// Carregar uma categoria padrão ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
    loadCategory('action'); // Começa com filmes de ação
});
