import React from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'

export function Carousel() {

    const items = [
        <>
            <img src="https://github.com/KatianaXavier.png" alt="Foto de Katiana Xavier sorrindo e com fundo colorido" />
            <h2>Katiana Xavier</h2>
        </>
    ]

    const resposivo = {
        0: {
            items: 1,
        },
        1024: {
            items: 3,
            itemsFit: 'contain',
        }
    }

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={2500}
            infinite
            responsive={resposivo}
        />
    )

}