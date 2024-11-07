import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { id } = req.query;
        const { name, email } = req.body;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            const user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email }
            });

            return res.status(200).json(user);
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            return res.status(500).json({ error: "Erro ao atualizar o usuário." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
