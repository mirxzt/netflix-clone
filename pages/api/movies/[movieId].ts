import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req);

    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Invaild ID');
    }

    if (!movieId) {
      throw new Error('Invaild ID');
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });


    return res.status(200).json(movie);

  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}