


// var db = require('../db');

//controller.signup.get

// module.exports = {
//   messages: {
//     get: function (req, res) {
//       //read the whole table, search for multiple elements in the database
//       db.Message.findAll({ include: [db.User, db.Room] })
//         .then((messages) => {
//           res.json(messages);
//         });
//     },

//     post: function (req, res) {
//       //check if a certain element already exists in the db, create if doesn't exist
//       db.User.findOrCreate({
//         where: { name: req.body.username }
//       }) //spread instead of then? for working w/array
//         .spread((user) => {
//           console.log('roooooooooooomaname', req.body.roomname);
//           db.Message.create({
//             userId: user.get('id'),
//             message: req.body.message,
//             roomId: req.body.roomid
//           })
//             .then((message, created) => {
//               //if found, not created, sendStatus(200)
//               res.sendStatus(created ? 201 : 200);
//             });
//         });
//     }
//   },

//   users: {
//     get: function (req, res) {
//       db.User.findAll()
//         .then((users) => {
//           res.json(users);
//         });
//     },
//     post: function (req, res) {
//       //db.users.post()
//       // db.User.post({
//       //   where: { name: req.body.username }
//       // })
//       db.User.findOrCreate({
//         where: { name: req.body.username }
//       })
//         .spread((user) => {
//           //if newly created, sendStatus(201)//created ? 201 : 200
//           res.sendStatus(200);
//         });
//     }
//   },

//   rooms: {
//     get: function (req, res) {
//       db.Room.findAll()
//         .then((rooms) => {
//           res.json(rooms);
//         });
//     },
//     post: function (req, res) {
//       db.Room.findOrCreate({
//         where: { roomname: req.body.roomname }
//       })
//         .spread((room) => { //Unknown column 'room' in 'field list'
//           //if newly created, sendStatus(201)
//           res.sendStatus(200);
//         });
//     }
//   }
// };


