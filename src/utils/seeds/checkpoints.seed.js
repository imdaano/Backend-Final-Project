const mongoose = require('mongoose');
const Checkpoint = require('../../api/checkpoints/checkpoint.model');
const DB_URL = process.env.DB_URL;
const { connectDb } = require('../database/db');

const checkpoints = [
    {
        name: 'Bar Picnic',
        img: 'https://lh3.googleusercontent.com/p/AF1QipM1uLzqoISJlSk_vEoGj6fvNNBuco5W9sdnBqWO=s1360-w1360-h1020',
        location: {
            type: 'Cafetería/Bar',
            coordinates: [43.3487585,-8.4194644]
        }
    }, 
    {
        name: 'Centre Restaurant',
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/07/f0/ff/2b/centre-restaurant.jpg',
        location: {
            type: 'Restaurante',
            coordinates: [41.4980554,2.1568301]
        }
    }, 
    {
        name: 'El Kiosko',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNi2dJS3GZfoZ-40kuHHdsJU-m_Lpk7evFjw&usqp=CAU',
        location: {
            type: 'Kiosko',
            coordinates: [37.5452039,-5.0780102]
        }
    }, 
    {
        name: 'A Tobeira de Oza',
        img: 'https://www.google.com/maps/place/A+Tobeira+de+Oza/@43.3530535,-8.3962531,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMy2TiRuUBCfAJojehmmQfgsDobtoyee8exlZ7d!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMy2TiRuUBCfAJojehmmQfgsDobtoyee8exlZ7d%3Dw203-h270-k-no!7i3000!8i4000!4m14!1m6!3m5!1s0xd2e7b38f32665ef:0xe481fef62aaf5296!2sA+Tobeira+de+Oza!8m2!3d43.3529992!4d-8.3963093!3m6!1s0xd2e7b38f32665ef:0xe481fef62aaf5296!8m2!3d43.3529992!4d-8.3963093!14m1!1BCgIYEg#',
        location: {
            type: 'Librería, Cafetería, Eventos',
            coordinates: [43.3529461,-8.3984604]
        }
    }, 
    {
        name: 'O Tío Pepe',
        img: 'https://www.paxinasgalegas.es/imagenes/tio-pepe_img84103t0m0w1600h800.jpg',
        location: {
            type: 'Restaurante/Parrillada',
            coordinates: [43.1909523,-8.4720821]
        }
    }, 
    {
        name: 'Asociación Cultural Gandalf',
        img: 'http://3.bp.blogspot.com/-9AOl2y5Os7M/T8sq2SpUmMI/AAAAAAAAASE/-h0YYRye89E/s980/logotipo.jpg',
        location: {
            type: 'Asociación Cultural',
            coordinates: [40.3919526,-3.6391915]
        }
    }, 
    {
        name: '',
        img: '',
        location: {
            type: '',
            coordinates: []
        }
    }, 
    {
        name: '',
        img: '',
        location: {
            type: '',
            coordinates: []
        }
    }, 
 
]

connectDb()
  .then(async () => {
    const allCheckpoints = await Checkpoint.find().lean();

    if (!allCheckpoints.length) {
      console.log("[seed]: No checkpoints found");
    } else {
      console.log(`[seed]: Found ${allCheckpoints.length} checkpoints`);
      await Checkpoint.collection.drop();
      console.log("[seed]: Checkpoint deleted correctly");
    }
  })
  .catch((error) =>
    console.log("[seed]: Error finding checkpoint: ", error)
  )
  .then(async () => {
    await Checkpoint.insertMany(checkpoints);
    console.log("[seed]: New checkpoints added");
  })
  .catch((error) => console.log("[seed]: Error adding checkpoints", error))
  .finally(() => mongoose.disconnect());