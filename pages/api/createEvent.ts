// post route

import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export async function connect(body: any) {
  const client = new MongoClient(process.env.MONGODB_URI);
  const collection = client.db('memz').collection('events');
  const insertResult = await collection.insertOne({
    body,
  });

  client.close();

  console.log('Inserted documents =>', insertResult);

  return insertResult;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    connect(req.body);
    res.status(201).json({ message: 'Event inserted!' });
  }
}
