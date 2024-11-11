import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json("Já existe um usuário com este email")
    }

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return res.status(200).json(user);


    } catch (error) {
      console.error('Erro ao criar o usuário', error);
      return res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
