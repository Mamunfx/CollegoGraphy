import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const colleges = await db.collection("colleges").find({}).toArray();
  return Response.json(colleges);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();
  const college = await request.json();
  const result = await db.collection("colleges").insertOne(college);

  const insertedCollege = await db.collection("colleges").findOne({ _id: result.insertedId });
  return Response.json(insertedCollege);
}