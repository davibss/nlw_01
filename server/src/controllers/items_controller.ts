import knex from '../database/connection';
import {Request, Response} from 'express';

class ItemsController{
    async index (request: Request, response : Response) {
        const items = await knex('items').select('*'); 
    
        const serializedItems = items.map(i => {
            return {
                id: i.id,
                title: i.title,
                image_url: `https://ecoleta-davibss.herokuapp.com/uploads/${i.image}`,
            }
        })
    
        return response.json(serializedItems);
    }
}

export default ItemsController;