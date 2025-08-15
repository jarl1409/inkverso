-- Script para actualizar URLs en base de datos

-- BACKUP: Crear respaldo antes de ejecutar
-- CREATE TABLE libros_backup AS SELECT * FROM libros;

UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267275/Libros/migrated-1752222295834-20250621-1157-Calidad-Mejorada-Demonio-remix-01jy9pnjf2egz81jgy4tpzst4f.webp' WHERE imagenURL LIKE '%1752222295834-20250621_1157_Calidad Mejorada Demonio_remix_01jy9pnjf2egz81jgy4tpzst4f.png%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267276/Libros/migrated-1752222904485-images.webp' WHERE imagenURL LIKE '%1752222904485-images.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267277/Libros/migrated-1752223091002-Imagen-1.webp' WHERE imagenURL LIKE '%1752223091002-Imagen-1.png%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267278/Libros/migrated-1752223960836-Imagen.webp' WHERE imagenURL LIKE '%1752223960836-Imagen.png%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267279/Libros/migrated-1752224148052-Imagen-2.webp' WHERE imagenURL LIKE '%1752224148052-Imagen-2.png%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267280/Libros/migrated-1752236899049-images.webp' WHERE imagenURL LIKE '%1752236899049-images.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267281/Libros/migrated-1752947021973-descarga.webp' WHERE imagenURL LIKE '%1752947021973-descarga.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267282/Libros/migrated-1753264328230-CienA--osDeSoledad.webp' WHERE imagenURL LIKE '%1753264328230-CienAÃ±osDeSoledad.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267284/Libros/migrated-1753264515662-Don-Quijote.webp' WHERE imagenURL LIKE '%1753264515662-Don-Quijote.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267285/Libros/migrated-1753264643260-1984.webp' WHERE imagenURL LIKE '%1753264643260-1984.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267286/Libros/migrated-1753264681871-ElPrincipito.webp' WHERE imagenURL LIKE '%1753264681871-ElPrincipito.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267287/Libros/migrated-1753264729180-LaSombraDelViento.webp' WHERE imagenURL LIKE '%1753264729180-LaSombraDelViento.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267289/Libros/migrated-1753264773644-de-animales-a-dioses-e5lQj.webp' WHERE imagenURL LIKE '%1753264773644-de-animales-a-dioses_e5lQj.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267290/Libros/migrated-1753264807114-UnaEducacion.webp' WHERE imagenURL LIKE '%1753264807114-UnaEducacion.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267294/Libros/migrated-1753264840856-orgullo-y-prejuicio.webp' WHERE imagenURL LIKE '%1753264840856-orgullo-y-prejuicio.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267295/Libros/migrated-1753264962933-9788437614038-crimen-y-castigo.webp' WHERE imagenURL LIKE '%1753264962933-9788437614038-crimen-y-castigo.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267297/Libros/migrated-1753265021738-en-busca-del-tiempo-perdido-en-historie-MlMjS.webp' WHERE imagenURL LIKE '%1753265021738-en-busca-del-tiempo-perdido-en-historie_MlMjS.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267298/Libros/migrated-1753265069577-Fahrenheit-451.webp' WHERE imagenURL LIKE '%1753265069577-Fahrenheit 451.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267299/Libros/migrated-1753265112003-El-alquimista.webp' WHERE imagenURL LIKE '%1753265112003-El alquimista.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267300/Libros/migrated-1753265139634-los-pilares-de-la-tierra-e1703939433489.webp' WHERE imagenURL LIKE '%1753265139634-los-pilares-de-la-tierra-e1703939433489.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267302/Libros/migrated-1753265201084-El-nombre-del-viento.webp' WHERE imagenURL LIKE '%1753265201084-El nombre del viento.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267303/Libros/migrated-1753265292492-it.webp' WHERE imagenURL LIKE '%1753265292492-it.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267304/Libros/migrated-1753265360274-Portada---LA-CHICA-DEL-TREN.webp' WHERE imagenURL LIKE '%1753265360274-Portada---LA-CHICA-DEL-TREN.webp%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267305/Libros/migrated-1753265429637-D-NQ-NP-838144-MLU77635972931-072024-O.webp' WHERE imagenURL LIKE '%1753265429637-D_NQ_NP_838144-MLU77635972931_072024-O.webp%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267306/Libros/migrated-1753265938417-El-c--digo-Da-Vinci.webp' WHERE imagenURL LIKE '%1753265938417-El cÃ³digo Da Vinci.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267307/Libros/migrated-1753266485653-los-juegos-del-hambre-1-los-juegos-del-hambre.webp' WHERE imagenURL LIKE '%1753266485653-los-juegos-del-hambre-1-los-juegos-del-hambre.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267309/Libros/migrated-1753266548452-La-carretera.webp' WHERE imagenURL LIKE '%1753266548452-La carretera.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267310/Libros/migrated-1753266582774-Matar-a-un-ruise--or.webp' WHERE imagenURL LIKE '%1753266582774-Matar a un ruiseÃ±or.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267312/Libros/migrated-1753266636213-La-peste.webp' WHERE imagenURL LIKE '%1753266636213-La peste.png%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267313/Libros/migrated-1753266675142-El-gran-Gatsby.webp' WHERE imagenURL LIKE '%1753266675142-El gran Gatsby.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267314/Libros/migrated-1753266719530-Kafka-en-la-orilla.webp' WHERE imagenURL LIKE '%1753266719530-Kafka en la orilla.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267315/Libros/migrated-1753266787316-CuentosCompletos.webp' WHERE imagenURL LIKE '%1753266787316-CuentosCompletos.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267316/Libros/migrated-1753266826630-El-hombre-en-busca-de-sentido.webp' WHERE imagenURL LIKE '%1753266826630-El hombre en busca de sentido.webp%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267317/Libros/migrated-1753266873461-La-insoportable-levedad-del-ser.webp' WHERE imagenURL LIKE '%1753266873461-La insoportable levedad del ser.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267318/Libros/migrated-1753266908487-Un-mundo-feliz.webp' WHERE imagenURL LIKE '%1753266908487-Un mundo feliz.webp%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267319/Libros/migrated-1753266952729-Dr--cula.webp' WHERE imagenURL LIKE '%1753266952729-DrÃ¡cula.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267321/Libros/migrated-1753267024520-el-extranjero.webp' WHERE imagenURL LIKE '%1753267024520-el-extranjero.jpg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267322/Libros/migrated-1754151124704-descarga.webp' WHERE imagenURL LIKE '%1754151124704-descarga.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267323/Libros/migrated-1754682332054-WhatsApp-Image-2025-07-31-at-10-54-56.webp' WHERE imagenURL LIKE '%1754682332054-WhatsApp Image 2025-07-31 at 10.54.56.jpeg%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267324/Libros/migrated-1754685231355-766aecf06804f6d829c5c70538013374.webp' WHERE imagenURL LIKE '%1754685231355-766aecf06804f6d829c5c70538013374.webp%';
UPDATE libros SET imagenURL = 'https://res.cloudinary.com/deqfdmwyu/image/upload/v1755267325/Libros/migrated-1755106000696-766aecf06804f6d829c5c70538013374.webp' WHERE imagenURL LIKE '%1755106000696-766aecf06804f6d829c5c70538013374.webp%';

-- Verificar actualizaciones
-- SELECT titulo, imagenURL FROM libros WHERE imagenURL LIKE '%cloudinary%';
