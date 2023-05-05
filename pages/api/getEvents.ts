import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export async function connect() {
  const client = new MongoClient(process.env.MONGODB_URI);
  const collection = client.db('memz').collection('events');

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  client.close();
  return findResult[0].body;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const data = await connect();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch getEvents', err });
    }
  }
}
