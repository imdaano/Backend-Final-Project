const mongoose = require("mongoose");
const Book = require("../../api/books/books.model");
const DB_URL = process.env.DB_URL;
const { connectDb } = require("../database/db");

const books = [
    {
        title: "Dispara, yo ya estoy muerto",
        img: "https://m.media-amazon.com/images/I/51tRmqv6N8L.jpg",
        author: "Julia Navarro",
        genre: "gneero",
        synopsis: "Dispara, yo ya estoy muerto es una novela histórica de Julia Navarro, publicada en 2013 por el sello Plaza & Janés, que mezcla historia, suspenso, drama, y política en una novela que se desarrolla desde finales de siglo XIX hasta 1948.",
      },
      {
        title: "El juego de Ender",
        img: "https://m.media-amazon.com/images/I/4112ZnvAI3L.jpg",
        author: "Orson Scott Card",
        genre: "genero",
        synopsis: "La Tierra se ve amenazada por la especie extraterrestre delos Insectores, seres que se comunican telepáticamente y que se consideran totalmente distintos de los humanos, a los que quieren destruir. Para vencerlos, la humanidad necesita de un genio militar, y por ello se permite el nacimiento de Ender, que es el tercer hijo de una pareja en el mundo que ha limitado estrictamente a dos el número de descendientes.",
      },
      {
        title: "Cien años de soledad",
        img: "https://imagessl8.casadellibro.com/a/l/t7/08/9788497592208.jpg",
        author: "Gabriel García Márquez",
        genre: "genero",
        synopsis: "Entre la boda de José Arcadio Buendía con Amelia Iguarán hasta la maldición de Aureliano Babilonia transcurre todo un siglo. Cien años de soledad para una estirpe única, fantástica, capaz de fundar una ciudad tan especial como Macondo y de engendrar niños con cola de cerdo. En medio, una larga docena de personajes dejarán su impronta a las generaciones venideras, que tendrán que lidiar con un mundo tan complejo como sencillo.",
      },
      {
        title: "Diario de Ana Frank",
        img: "https://imagessl7.casadellibro.com/a/l/t7/37/9788483467237.jpg",
        author: "Annelies Marie Frank",
        genre: "genero",
        synopsis: "Tras la invasión a Holanda, los Frank, comerciantes judíos alemanes emigrados a Amsterdam en 1933, se ocultaron de la Gestapo en una buhardilla anexa al edificio donde el padre de Ana tenía sus oficinas. Eran ocho personas y permanecieron recluidas desde junio de 1942 hasta agosto de 1944, fecha en que fueron detenidos y enviados a un campo de concentración. En ese lugar, y en las más precarias condiciones, Ana, a la sazón una niña de trece años, escribió su estremecedor Diario: un testimonio único en su género sobre el horror y la barbarie nazi, y sobre los sentimientos y experiencias de la propia Ana y sus acompañantes. Ana murió en el campo de Bergen-Belsen en marzo de 1945. Su Diario nunca morirá.",
      },
      {
        title: "Carta de una desconocida",
        img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1665493599-41dDCzfKV2S._SL500_.jpg?crop=1xw:1xh;center,top&resize=768:*",
        author: "Stefan Zweig",
        genre: "Novela",
        synopsis: "Un afamado y mujeriego escritor no reconoce la caligrafía de la carta que recibe una mañana. Para su sorpresa, la remitente es una mujer desesperada dispuesta a declararle antes de morir su amor secreto, y casi obsesivo, escondido durante muchos años.",
      },
      {
        title: "El color púrpura",
        img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1665493212-51aXqFcbR2L._SL500_.jpg?crop=1xw:1xh;center,top&resize=768:*",
        author: "Alice Walker",
        genre: "Novela",
        synopsis: " Separadas de niñas, las hermanas Celie y Nettie mantienen su lealtad y esperanza mutua a través del tiempo, la distancia y el silencio.",
      },
      {
        title: "It",
        img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1654696800-41utxPy1SkL._SL500_.jpg?crop=1xw:1xh;center,top&resize=768:*",
        author: "Stephen King",
        genre: "Novela",
        synopsis: "El libro nos lleva a la pequeña ciudad de Derry, en Maine y está protagonizado por siete hombres y mujeres que, cuando eran adolescentes, vivieron una experiencia terrorífica por culpa de un payaso siniestro, experiencia que se repite de tanto en tanto y que les hace vivir siempre en una terrible pesadilla.",
      },
      {
        title: "La montaña mágica",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/la-montan-a-ma-gica-1622472888.jpeg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Thomas Mann",
        genre: "Novela",
        synopsis: "Thomas Mann escribe con maestría una historia de un joven que va de visita por tres semanas al sanatorio de tuberculosos Berghof, y que acaba pasando allí siete años. La enfermedad, la muerte, la juventud frente a la vejez o el paso del tiempo son solo algunos de los temas que aborda esta obra magistral de Mann que se ha convertido en una de las mejores novelas del siglo XX.",
      },
      {
        title: "Dune",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dune-1619097442.jpeg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Frank Herbert",
        genre: "Ciencia ficción",
        synopsis: "Dune relata la historia del planeta desértico Arrakis, única fuente de melange, la especia necesaria para el viaje interestelar y que además garantiza longevidad y poderes psíquicos. La administración de Arrakis es transferida por el emperador de la noble Casa de Harkonnen a la Casa Atreides. Los primeros no quieren abandonar sus privilegios, y a través de traiciones y sabotajes, destierran al joven duque Paul Atreides al duro entorno del planeta para que muera. Pero Paul podría resultar ser mucho más que un duque al que han usurpado su puesto... Su lucha se encuentra en el epicentro de un nexo de poderosas personas e importantes sucesos, y las repercusiones se dejarán sentir a través del Imperio.",
      },
      {
        title: "Las uvas de la ira",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/las-uvas-de-la-ira-1616596646.jpeg?crop=1xw:1xh;center,top&resize=980:*",
        author: "John Steinbeck",
        genre: "Novela",
        synopsis: "un maravilloso y doliente retrato de la sociedad americana en la Gran Depresión. El relato es brutal y sobrecogedor; evoluciona hacia la tragedia humana, narrando sin misericordia el conflicto entre poderosos y parias. Los protagonistas son una familia de granjeros de Oklahoma, los Joad, que expulsados de sus tierras emprenden camino a California en busca de trabajo y de un sitio donde asentarse. Conmovedor y feroz, removerá tu conciencia.",
      },
      {
        title: "Diario de Ana FranEl gran Gatsby",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gran-gatsby-1616596099.jpeg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Francis Scott Fitzgerald",
        genre: "Novela",
        synopsis: "Cuenta la historia del increíblemente rico Jay Gatsby, que se enamora de la joven Daisy Buchanan, en un momento de fiestas definidas por el New York Times en las que 'la ginebra era la bebida nacional y el sexo la obsesión nacional'."
      },
      {
        title: "Alguien voló sobre el nido del cuco",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-alguienvolo-1597086456.jpg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Ken Kesey",
        genre: "genero",
        synopsis: "esta magnífica historia protagonizada por la gran enfermera Ratched, una verdadera tirana que gobierna el psiquiátrico de Oregón, intimidando a enfermos con medicamentos y descargas eléctricas. Pero su régimen se verá alterado con la llegada de McMurphy, un canalla que decide oponerse a sus reglas.",
      },
      {
        title: "Crimen y castigo",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-crimenycastigo-1597086456.jpg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Fiódor Dostoievski",
        genre: "genero",
        synopsis: "El protagonista es Raskolnikov, un joven estudiante que cree firmemente que los fines humanitarios justifican cualquier acción, incluso el asesinato, y así acabará sin remordimientos con la vida de una usurera. Sin embargo, no se imaginará que la voz de su conciencia le importa más que cualquier persecución policial. Solo Sonya, una prostituta, podrá redimirle.",
      },
      {
        title: "La ladrona de libros",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-ladronadelibros-1597086455.jpg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Markus Zusak",
        genre: "genero",
        synopsis: "Estamos en la Alemania nazi de 1939, en un país que está empezando a escribir algunas de las páginas más horribles de la historia. Liesel es una niña de nueve años que, a los pies de la tumba de su hermano, roba un libro: el 'Manual del sepulturero', que alguien ha dejado allí abandonado. Será el primero de una lista de grandes robos de libros que configuran una de las historias más hermosas de los últimos tiempos.",
      },
      {
        title: "Romeo y Julieta",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-romeoyjulieta-1597086456.jpg?crop=1xw:1xh;center,top&resize=980:*",
        author: "William Shakespeare",
        genre: "genero",
        synopsis: "Una de las mejores obras de la literatura universal, en la que William Shakespeare nos habla de una historia de amor que sin embargo genera violencia. Romeo y Julieta se enamoran y, sin embargo, sus familias, los Montesco y los Capuleto, se oponen a su relación. Ellos se irán a vivir juntos a pesar de las protestas de su entorno, lo que acabará provocando una tragedia.",
      },
      {
        title: "Fahrenheit 451",
        img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/elle-fahrenheit451-1582115505.jpg?crop=1xw:1xh;center,top&resize=980:*",
        author: "Ray Bradbury",
        genre: "Ciencia Ficción",
        synopsis: "nos lleva a una situación que no tiene nada de fantástica. Estamos en un país donde no se puede leer. De hecho, el trabajo del bombero Montag, el protagonista, no es apagar incendios, sino provocarlos. Se dedica a quemar libros para evitar que la población piense y se la pueda manipular; ya lo decían los romanos: 'Panem et circenses'.",
      },
];

connectDb()
  .then(async () => {
    const allBooks = await Book.find().lean();

    if (!allBooks.length) {
      console.log("[seed]: No books found");
    } else {
      console.log(`[seed]: Found ${allBooks.length} books`);
      await Book.collection.drop();
      console.log("[seed]: Book deleted correctly");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error finding book: ", error)
  )
  .then(async () => {
    await Book.insertMany(books);
    console.log("[seed]: New books added");
  })
  .catch((error) => console.log("[seed]: Error adding book", error))
  .finally(() => mongoose.disconnect());