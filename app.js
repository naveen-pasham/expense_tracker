const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require('./util/database');
const cors=require('cors');
const dotenv = require('dotenv');
const fs=require('fs');


const helmet=require('helmet');
const Compression=require('compression');
const morgan=require('morgan');



dotenv.config();

const User=require('./models/signup');
const Expense=require('./models/addexpense');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');

const app = express();

const userRoutes = require('./routes/signup');
const expenseRoutes = require('./routes/addexpense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
 const forgotpasswordRoutes = require('./routes/forgotpassword');

 app.use(helmet());
 app.use(Compression());
 
const accessLogStream=fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
);
 
app.use(morgan('combined',{stream:accessLogStream}));

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self' https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/fonts/glyphicons-halflings-regular.woff  'unsafe-inline'; img-src 'self'; script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js  https://checkout.razorpay.com/v1/checkout.js  https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js  https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js  https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js  'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'; style-src 'self' https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css  https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css  https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css  'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'; script-src-elem 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js  https://checkout.razorpay.com/v1/checkout.js  https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js  https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js  https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js  'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'; style-src-elem 'self' https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css  https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css  https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css  'unsafe-inline' 'unsafe-eval' 'unsafe-hashes'; frame-src 'self'"
  );
  next();
});


app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);
app.use('/userexpense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', forgotpasswordRoutes);

app.use((req,res)=>{
  console.log('url', req.url);
  res.sendFile(path.join(__dirname, `public/views/${req.url}`))
})


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);



app.use(errorController.get404);

sequelize
// .sync({alter: true})
// .sync({force: true})
.sync()
  .then(result => {
   // console.log(result)
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });