const express = require('express')
const BodyParser = require('body-parser')
const https = require('https')
const app = express();
app.use(BodyParser.urlencoded({extended:true}))
const ejs = require('ejs');
const  mongoose  = require('mongoose');
const {MongoClient} = require('mongodb');
const { SSL_OP_ALL } = require('constants');




let currentAccount;
let NickName;
let pro;
let AllIn;
let FoodArr;
let SportArr;
let MoneyArr;

// let accs = [
//         {
//             name: "Alex",
//             username: "Kilua",
//             password: "1111"        
//         },
//         {
//             name: "Tom",
//             username: "Tomson",
//             password: "2222" 
//         }
// ]

let accs = []

mongoose.connect(
    "mongodb+srv://user:user@cluster0.w9ldk.mongodb.net/HoYo?retryWrites=true&w=majority",
    {useNewUrlParser: true,useUnifiedTopology: true}
)

const signinSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
})

const postSchema = new mongoose.Schema({
    tittle: String,
    content: String,
    PosterName: String
})

const foodSchema = new mongoose.Schema({
    tittle: String,
    content: String,
    PosterName: String
})

const sportSchema = new mongoose.Schema({
    tittle: String,
    content: String,
    PosterName: String
})

const moneySchema = new mongoose.Schema({
    tittle: String,
    content: String,
    PosterName: String
})   

const SignIn = mongoose.model('hoyo', signinSchema);
const Post = mongoose.model('HoyoPost', postSchema)
const Food = mongoose.model('Food', foodSchema)
const Sport = mongoose.model('Sport', sportSchema)
const Money = mongoose.model('Money', moneySchema)



// SignIn.collection.insert(accs,function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(accs);
//     }
// }) 

// SignIn.deleteMany(function(err){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("Deleted");
//     }
// })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(3000, function(){
    console.log('It works');
})
app.get('/', function(req,res){
    res.render('index')
})
app.get('/registration', function(req,res){
    res.render('registration')
})
app.get('/post', function(req,res){
    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }
    else{
        res.render('post', {b: NickName})
    }
    
})
app.get('/main', function(req,res){
    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }
    else{
        Post.find({},function(err,val){
            if(err){
                console.log(err);
            }
            else{
                pro = val;
                res.render('main', {a: pro, b: NickName})
            }
        })
    } 
})

app.get('/food', function(req,res){

    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }
    else{
        Food.find({},function(err,val){
            if(err){
                console.log(err);
            }
            else{
                FoodArr = val;
                res.render('main', {a: FoodArr, b: NickName})
            }
        })
    }
})

app.get('/sport', function(req,res){

    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }
    else{
        Sport.find({},function(err,val){
            if(err){
                console.log(err);
            }
            else{
                SportArr = val;
                res.render('main', {a: SportArr, b: NickName})
            }
        })
    }
})

app.get('/money', function(req,res){

    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }

    else{
        Money.find({},function(err,val){
            if(err){
                console.log(err);
            }
            else{
                MoneyArr = val;
                res.render('main', {a: MoneyArr, b: NickName})
            }
        })
    }
})

app.get('/profile', function(req,res){

    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }

    else{
        Post.find({},function(err,val){
            if(err){
                console.log(err);
            }
            else{
                AllIn = val
                res.render('profile', {a: AllIn, b: NickName})
            }
        })
    }
})
app.post('/',function(req,res){
    let username_inp = req.body.username 
    let password_inp = req.body.password 

    SignIn.find({},function(err,val){
        if(err){
            console.log(err);
        }
        else{
            val.forEach(function(val){
                if(val.username === username_inp && val.password === password_inp){
                    console.log(val);
                    currentAccount = val;
                    NickName = currentAccount.name
                    res.redirect('/profile')

                    // NickName = currentAccount.username;
                }
                else{
                    return 0
                }
            })
        }
    })
})

app.post('/post', function(req,res){
    let tittle_inp = req.body.tittle
    let content_inp = req.body.content
    let type_inp = req.body.type;

    if(NickName === undefined){
        res.send('Sign In or Sign Up')
    }

    else{
        let post = new Post({
            tittle: tittle_inp,
            content: content_inp,
            PosterName: NickName
        })

        if(type_inp === 'food'){
            Post.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Post");
                }
            })

            Food.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Food");
                }
            })
    
            res.redirect('/main')
        }

        if(type_inp === 'sport'){
            Post.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Post");
                }
            })

            Sport.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Sport");
                }
            })
    
            res.redirect('/main')
        }

        if(type_inp === 'money'){
            Post.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Post");
                }
            })

            Money.collection.insertOne(post,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Insered Money");
                }
            })
    
            res.redirect('/main')
        }

    
        
    }
    
})

app.post('/registration',async function(req,res){
    let reg_name_inp = req.body.name
    let reg_username_inp = req.body.username
    let reg_password_inp = req.body.password

    let newAccount = {
        name: reg_name_inp,
        username: reg_username_inp,
        password: reg_password_inp
    }
    console.log(accs);
    
    SignIn.find({},function(err,val){
        if(reg_name_inp == undefined || reg_username_inp == undefined || reg_password_inp == undefined){
            res.send('Fill all inputs')
        }
        else{
            if(val.username == reg_username_inp){
                res.send('This account already exists')
            }
            else{
                SignIn.collection.insertOne(newAccount,function(err){
                    if(err) err;
                    else{
                        console.log('Data is already insered')
                    }
                })
                currentAccount = val;
                NickName = currentAccount.name
                res.redirect('/')
    
            }
        }
    })
    
})