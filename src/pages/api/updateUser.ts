import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function update(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST'){
        const {userId, name, email, password } = req.body;

        try {
            const user = await prisma.user.update({
                where: {id: userId},
                data: {name, email, password}
            })
            return res.status(200).json(user)
        }  catch(error){
            console.error('Desculpe, algo deu errado', error);
            return res.status(500).json({ error: "erro ao editar o usuário"});
        }
    } else{
        res.status(405).json({error: 'metodo nao permitido'})
    }
}