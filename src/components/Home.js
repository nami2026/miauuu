// Home.js
import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        const sectionCarousel = document.getElementById("sectionCarousel");

        const scrollSections = () => {
            sectionCarousel.scrollBy({
                left: 1,
                behavior: "smooth"
            });

            if (sectionCarousel.scrollLeft + sectionCarousel.clientWidth >= sectionCarousel.scrollWidth) {
                sectionCarousel.scrollTo({ left: 0, behavior: "smooth" });
            }
        };

        const intervalId = setInterval(scrollSections, 20);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-container">
            <h1>
                Bienvenidos a OMG MIAUUU
                <span className="animated-box"></span>
            </h1>

            {/* Carrusel de Secciones */}
            <div className="carousel-container" id="sectionCarousel">
                <div className="carousel-item">Ropa</div>
                <div className="carousel-item">Electrónica</div>
                <div className="carousel-item">Accesorios</div>
                <div className="carousel-item">Hogar</div>
                <div className="carousel-item">Juguetes</div>
                <div className="carousel-item">Belleza</div>
            </div>

            {/* Carrusel de Animales */}
            <div className="animal-container" id="animalContainer">
                <div className="animal-card">
                    <img src="https://via.placeholder.com/150?text=León" alt="PERRO" className="animal-image" />
                    <p className="animal-name">GATOS CRIOLLOS</p>
                </div>
                <div className="animal-card">
                    <img src="https://via.placeholder.com/150?text=Tigre" alt="HORMIGUEROS" className="animal-image" />
                    <p className="animal-name">GATOS DE RAZA</p>
                </div>
                <div className="animal-card">
                    <img src="https://via.placeholder.com/150?text=Tigre" alt="CONEJOS" className="animal-image" />
                    <p className="animal-name">GATOS PELO LARGO</p>
                </div>
                <div className="animal-card">
                    <img src="https://via.placeholder.com/150?text=Tigre" alt="GATOS" className="animal-image" />
                    <p className="animal-name">GATOS PELO CORTO</p>
                </div><div className="animal-card">
                    <img src="https://via.placeholder.com/150?text=Tigre" alt="ANFIBIOS" className="animal-image" />
                    <p className="animal-name">GATOS GIGANTES</p>
                </div>
                {/* Otras tarjetas de animales */}
            </div>
        </div>
    );
};

export default Home;
