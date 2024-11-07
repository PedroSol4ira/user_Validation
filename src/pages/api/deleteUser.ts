import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function DeleteUser(req:NextApiRequest, res: NextApiResponse) {
    if(req.method === 'DELETE'){
        try { 
            const {id} =req.query; // esta const serve para puxar o ID a partir dos parametros da URL

            if(!id) {
                return res.status(404).json({ message: "nao foi identificado o id do usuario no banco de dados"})
            }

            const user = await prisma.user.deleteMany({
                where:{id: Number(id)}
            })
            return res.status(200).json("Usuário excluído com sucesso!")
        }catch(error){
            return res.status(500).json("A requisição encontrou um problema")
        }
    } else{
        return res.status(405).json
    }
}