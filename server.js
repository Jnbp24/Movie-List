import express from 'express';
import movieRouter from './routes/movies.js'


const app = express();
const PORT = 8800
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('assets'));

app.use("/movies", movieRouter);



app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
