import clientPromise from '../../../../lib/mongodb'; 

export async function GET(request, { params }) {
  const client = await clientPromise;
  const db = client.db();
  const userEmail = params.email; 

  try {
    const user = await db.collection("users").findOne({ userEmail: userEmail });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}