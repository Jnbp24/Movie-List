import express from 'express';
import 'dotenv/config'; // automatically loads .env
import movieRouter from './routes/movies.js'
import loginRouter from './routes/login.js'

const app = express();
const PORT = 8800
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('assets'));

app.use("/movies", movieRouter);
app.use("/login", loginRouter);

app.get('/', (request, response) => { // Redirect empty url to /home for better clarity
    response.redirect('/home')
})


app.get('/home', (request, response) => {
    response.render('homepage', {title: 'Movie List'})
})


app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
