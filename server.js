import express from 'express'

//=> * express set up 

const exapp = express();

exapp.use(express.static('dist')); 

exapp.listen(8000,()=>{
    console.log('Server is running on http://localhost:8000')
})