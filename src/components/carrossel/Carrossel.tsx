import { Grid, Typography } from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css'
import './Carrossel.css'

export function Carousel() {

    const items = [
        <>
            <Typography variant="h5" gutterBottom align="center" fontWeight='bold'>
                Este blog foi desenvolvido por <a target="_blank" href="https://linkedin.com/in/katianaxavier">Katiana Xavier</a>, durante o bootcamp Java FullStack da Generation Brasil. <br />Quer saber mais? ➡️
            </Typography>
        </>,
        <Typography variant="h5" gutterBottom align="center" fontWeight='bold'>
            Acesse o Github do projeto <a target="_blank" href="https://github.com/KatianaXavier/Front-End-Blog-Pessoal">aqui</a>.
        </Typography>
    ]

    const resposivo = {
        0: {
            items: 1,
        },
        1024: {
            items: 1,
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