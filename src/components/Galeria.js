// Galeria.js
import React, { useEffect, useState } from 'react';
import './Galeria.css';

const Galeria = () => {
    const [cats, setCats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Fetch datos de la API de The Cat API
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=50');
                const data = await response.json();
                setCats(data);
                console.log("Datos de gatos:", data); // Log para ver los datos de los gatos
            } catch (error) {
                console.error("Error al obtener los datos de la API:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('https://api.thecatapi.com/v1/breeds');
                const data = await response.json();
                setCategories(data);
                console.log("Datos de categorías:", data); // Log para ver los datos de las categorías
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchCats();
        fetchCategories();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        console.log("Término de búsqueda:", event.target.value); // Log para ver el término de búsqueda
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log("Categoría seleccionada:", event.target.value); // Log para ver la categoría seleccionada
    };

    // Filtrar gatos según el término de búsqueda y la categoría
    const filteredCats = cats.filter(cat => {
        const breedExists = cat.breeds && cat.breeds?.length > 0;
        const breedName = breedExists ? cat.breeds[0].name.toLowerCase() : '';
        const idMatches = cat.id.toLowerCase().includes(searchTerm);
        const breedMatches = breedName.includes(searchTerm);
        const categoryMatches = selectedCategory ? (breedExists && cat.breeds[0].id === selectedCategory) : true;

        return (idMatches || breedMatches) && categoryMatches;
    });

    console.log("Gatos filtrados:", filteredCats); // Log para ver los gatos filtrados

    return (
        <div className="galeria-container">
            <h1>Galería de Gatos</h1>
            <input 
                type="text" 
                placeholder="Buscar por raza o ID..." 
                value={searchTerm} 
                onChange={handleSearch}
                className="search-bar"
            />
            <select value={selectedCategory} onChange={handleCategoryChange} className="category-filter">
                <option value="">Todas las razas</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <div className="animal-gallery">
                {filteredCats?.length > 0 ? (
                    filteredCats.map((cat) => (
                        <div className="animal-card" key={cat.id}>
                            <img src={cat.url} alt={`Gato ${cat.id}`} className="animal-image" />
                            <p className="animal-name">ID: {cat.id}</p>
                            {cat.breeds?.length > 0 ? (
                                <>
                                    <p className="animal-category">Raza: {cat.breeds[0].name}</p>
                                    <p className="animal-temperament">Temperamento: {cat.breeds[0].temperament}</p>
                                    <p className="animal-weight">Peso: {cat.breeds[0].weight.metric} kg</p>
                                    <p className="animal-origin">Origen: {cat.breeds[0].origin}</p>
                                    <p className="animal-lifespan">Esperanza de vida: {cat.breeds[0].life_span} años</p>
                                    <a href={cat.breeds[0].wikipedia_url} target="_blank" rel="noopener noreferrer">Más información</a>
                                </>
                            ) : (
                                <p>Sin raza específica</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron gatos.</p>
                )}
            </div>
        </div>
    );
};

export default Galeria;
