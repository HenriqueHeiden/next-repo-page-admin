import connect from "../utils/database"
import { ObjectId } from 'mongodb';

export const cadastro = async (email: string, title: string, link: string,tipoLink: string) =>{
    const { db } = await connect()


    const collection = db.collection('linktree')

    console.log(email,title,link,tipoLink)
    const response = await collection.insertOne({
        email: email,
        title: title,
        link: link,
        tipoLink: tipoLink
    })
    return response
}

export const consulta = async (email: string) => {
    const { db } = await connect()
    const user = {
        email: email
    }

    const collection = db.collection('linktree')

    const response = await collection.find(user).sort({ published: -1 }).toArray();

    return response    
}

export const consultaById = async (id: string) => {
    const { db } = await connect()
    const user = {
        _id:  new ObjectId(id)
    }

    const collection = db.collection('linktree')

    const response = await collection.find(user).sort({ published: -1 }).toArray();

    return response    
}


export const editar = async (email: string, Customer: any) => {
    const { db } = await connect()
    const user = {
        email: email
    }

    const collection = db.collection('linktree')

    const {_id} = await collection.findOne(user)
    const response = await collection.replaceOne({_id: _id}, Customer);

    return response    
}

export const editarById = async (id: string, Customer: any) => {
    const { db } = await connect()
    const user = {
        _id: new ObjectId(id)
    }

    const collection = db.collection('linktree')

    // const {_id} = await collection.findOne(user)
    const response = await collection.replaceOne({_id: user._id}, Customer);

    return response    
}

