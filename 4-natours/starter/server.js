const mongoose = require('mongoose');

const dotenv = require('dotenv');

//HANDLING UNCAUGHT EXCEPTION

process.on('uncaughtException', err => {
  console.log('uncaught Exception! SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    // console.log(con.connections);
    console.log('db connection successful!');
  });

// const testTour = new Tour({
//   name: 'The park Camper',
//   rating: 4.5,
//   price: 550
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log('Err :', err);
//   });
// 4) start server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

// HANDLING UNHANDLED REJECTION

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
