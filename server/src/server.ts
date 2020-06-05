import express from 'express';
import routes from './routes'
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors());

app.listen(3333);

// Rota

//GET: buscar uma ou mais informações do back-end
//POST: criar uma nova informação no back-end
//PUT: atualizar uma informação existente no back-end
//DELETE: deletar uma informação no back-end

//const users = [
//    'diego',
//    'cleiton',
//    'robson',
//    'daniel'
//];

//Request param: Parametros que vem da propria rota, que identificam um recurso
//Query param: Parametros geralmente opcionais para filtros, paginação, coisas não tão relevantes
//Request body: Parametros para criação e atualização de objetos

//app.get('/', (request, response) => {
    //return response.json({ message: 'Hello World' })
    //console.log('Listagem de usuários');
    //console.log(request.query);
    //if (!Object.keys(request.query).includes('search')){
    //    return response.json(users);
    //}
    //const searchWord = String(request.query.search);
    //return response.json([users.filter(u => u.includes(searchWord))]);
//});

//app.get('/users/:id', (request, response) => {
//    console.log('listagem de usuário');
//    const id = Number(request.params.id);
//    return response.json(users[id]);
//});
//
//app.post('/users', (request, response) => {
//    const data = request.body;
//    const user = {
//        name: data.name,
//        email: data.email
//    };
//    return response.json(user);
//});
