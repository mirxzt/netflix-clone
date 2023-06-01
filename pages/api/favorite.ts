import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {

      const { currentUser } = await serverAuth(req);
  
      console.log(req.body);
      const { movieId } = req.body;
  
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id : movieId
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invaild ID');
      }
  
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: {
          favoritedIds: {
            push: movieId 
          }
        }
      })
  
      return res.status(200).json(user);
    }

    if (req.body === 'DELETE') {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      if (! existingMovie) {
        throw new Error('Invaild ID');
      }

      const DelMovie = without(currentUser.favoritedIds, movieId);

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: DelMovie
      });

      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }  
}