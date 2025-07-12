import clientPromise from '../../../../lib/mongodb'; 

export async function GET(request) { 
  const client = await clientPromise;
  const db = client.db();
  try {
    const applications = await db.collection("application").find({}).toArray(); 
    return new Response(JSON.stringify(applications), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching all applications:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function POST(request) {
  const client = await clientPromise;
  const db = client.db();
  try {
    const body = await request.json();
    const result = await db.collection("application").insertOne(body);
    return new Response(JSON.stringify({ message: "Application added successfully", applicationId: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating application:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
