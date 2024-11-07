import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getAllUser(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'GET'){
        try {
            const user = await prisma.user.findMany({
                select:{
                    name: true,
                    email: true
                }
            })
            return res.status(200).json(user)
        } catch(error){
            console.error("Houve um erro ao tentar puxar os usuários", error)
            return res.status(500).json({error: "erro ao puxar usuarios"})
        }
    } else{
        res.status(405).json({error: 'metodo nao permitido'})
    }
}