const mongoose = require('mongoose');

if (process.argv.length < 5 && !process.argv.length === 3) {
  console.log('There are missing arguments. Please check your request and try again');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.mzshd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Phone = mongoose.model('Phone', phoneSchema);

const newPhone = new Phone({
  name: process.argv[3],
  number: process.argv[4]
});

if (process.argv.length === 3) {
  Phone.find({}).then(result => {
    result.forEach(phone => console.log(phone));
    mongoose.connection.close();
  });
} else {
  newPhone.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}