import { ObjectId } from "mongodb"; 
import clientPromise from "../../../../../lib/mongodb";
export async function GET(request, { params }) {
  const client = await clientPromise;
  const db = client.db();
  const collegeId = params.id;

  try {
    const college = await db.collection("colleges").findOne({ _id: new ObjectId(collegeId) });
    if (!college) {
      return new Response(JSON.stringify({ error: "College not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(college), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid ID format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}