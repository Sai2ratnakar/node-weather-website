const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = 3000;

//Defining paths to directories
const publicPathDirectory = path.join(__dirname,'../public');
const viewSetUp = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine to load things
app.set('view engine', 'hbs');
app.set('views', viewSetUp)
hbs.registerPartials(partialsPath);

app.use(express.static(publicPathDirectory));

//handlebars requests
app.get('/', (req,res)=> {
    
    res.render('index', {
        title: 'Weather',
        name: 'Sai Alapati',
        address: 'Melbourne'

    });
})

app.get('/products', (req,res) => {
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Sai Alapati'
    });
})

app.get('/help', (req,res)=> {
    res.render('help', {
        message: 'This is from the handlebars Help',
        title: 'Help',
        name: 'Sai Alapati'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const address = req.query.address
    
    geocode(address, (error,{ latitude, longitude, location} ={})=> {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error,forecastData)=> {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:address
            })
        })
    })


})

app.get('/help/*', (req,res)=> {
    res.render('error', {
        message: 'Help article not found',
        title: '404',
        name: 'Sai Alapati'
    })
})

app.get('*', (req,res)=> {
    res.render('error', {
        message: 'Page not found',
        title: '404',
        name: 'Sai Alapati'
    } )
})

// app.use('/about',express.static(publicPathDirectory));
// app.use('/help',express.static(publicPathDirectory));

//GET for help
// app.get('/help', (req, res)=> {
//     res.send([{
//         name: 'Sai',
//         age: 24
//     }, {
//         Tutor_name: 'Andrew',
//         Course: 'Node.js'
//     }]);
// })

//GET for About
// app.get('/about', (req,res) => {
//     res.send('<h1>This is ABOUT PAGE<h1>');
// })

//GET for Weather

// Listening on port 3000

app.listen(port, () => {
    console.log('Web-Server is up and running on port 3000.');
});