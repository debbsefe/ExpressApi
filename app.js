import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import '@babel/polyfill';
import userRoutes from './routes/userRoutes'


const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', userRoutes);


app.get('/', (req, res) => res.status(301).redirect('/api'));

app.get('/api', (req, res) =>
    res.status(200).send({
        message: 'Welcome to Express Api',
    }),
);

// Throw error when user enters wrong Endpoints
app.use((req, res) => res.status(404).send({
    error: 'Oops! Endpoint not found, Please Check that you are entering the right thing!',
}));

app.use((err, req, res, next) => {
    res.status(500).send({
        error: 'Invalid Request! Please Check that you are entering the right thing!',
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is live on PORT: ${port}`);
});

export default app;