const mongoose = require("mongoose");
const Book = require("../../api/books/books.model");
const DB_URL = process.env.DB_URL;
const { connectDb } = require("../database/db");

const books = [
    {
        title: "Dispara, yo ya estoy muerto",
        img: "https://m.media-amazon.com/images/I/51tRmqv6N8L.jpg",
        author: "Julia Navarro",
        genre: "genero",
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