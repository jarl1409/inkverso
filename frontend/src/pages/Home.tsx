// src/pages/Home.tsx
import { useState } from "react";
import BookGrid from "../components/libros/LibrosGrid";
import Spinner from "../components/ui/Spinner";
import type { Book } from "../types/Book";

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Cuentos de los Hermanos Grimm",
    author: "Jacob Grimm",
    price: 35,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 2,
    title: "Las Aventuras de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    price: 65,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 3,
    title: "Alicia en el País de las Maravillas",
    author: "Lewis Carroll",
    price: 73,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 4,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 5,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 6,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 7,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 8,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-1.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 9,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 10,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 11,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 12,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 13,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 14,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 15,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 16,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 17,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 18,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 19,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 20,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 21,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 22,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 23,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 24,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 25,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 26,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 27,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 28,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 29,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 30,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 31,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 32,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
  {
    id: 33,
    title: "Organize Phone Holder",
    author: "Acme Inc.",
    price: 15,
    coverUrl: "/images/portadasLibros/Imagen-2.png",
    description:
      "Brujas, pillos, animales parlanchines, sapos besucones, enanos, princesas, príncipes… Los cuentos de los Hermanos Grimm han servido de inspiración para numerosas adaptaciones fílmicas para los más pequeños, en gran medida transformadas y embellecidas. En esta edición, el lector tanto joven como adulto tiene la oportunidad de conocer quince cuentos originales en una nueva traducción a cargo de Isabel Hernández: «El rey sapo o Enrique el de hierro», «Cuento de uno que se marchó a aprender lo que era el miedo», «El lobo y los siete cabritillos», «Rapunzel», «Las tres hilanderas», «Hansel y Gretel», «El pescador y su mujer», «El sastrecillo valiente», «Cenicienta», «Caperucita Roja», «Los músicos de Bremen». «Pulgarcito», «La bella durmiente», «Blancanieves» y «Rumpelstiltskin».",
  },
];

export default function Home() {
  const [books] = useState<Book[]>(mockBooks);
  const loading = books.length === 0;

  return (
    <>
      {/* Hero */}
      <header className="relative bg-gray-900">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <img
            src="/images/HeroImage.png"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="relative px-6 py-10 text-center sm:text-left max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/images/logoInkverso.png"
            alt="Logo Inkverso"
            className="h-56 w-auto lg:h-[400px]"
          />
          <h1 className="text-white text-3xl lg:text-4xl font-extralight">
            Somos una <strong className="font-bold">tienda de libros</strong>{" "}
            que se adapta al consumo digital.
          </h1>
        </div>
      </header>

      {/* Grid de Libros */}
      <section className="pb-10">
        {loading ? <Spinner /> : <BookGrid books={books} perPage={24} />}
      </section>
    </>
  );
}
