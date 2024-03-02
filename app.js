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