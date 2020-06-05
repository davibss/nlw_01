import express, { request, response } from 'express';
import PointController from './controllers/points_controller';
import ItemsController from './controllers/items_controller';

import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './configs/multer';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);



routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create)

    
routes.get('/points/:id', pointsController.show)
routes.get('/points', pointsController.index)

export default routes;
