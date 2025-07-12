import clientPromise from '../../../../lib/mongodb'; 

export async function GET(request) { 
  const client = await clientPromise;
  const db = client.db();

  try {
    const users = await db.collection("users").find({}).toArray(); 
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
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
    const { userEmail, userName, ...otherData } = body;
    if (!userEmail || !userName) {
      return new Response(JSON.stringify({ error: "userEmail and userName are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingUser = await db.collection("users").findOne({ userEmail: userEmail });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User with this email already exists" }), {
        status: 409, 
        headers: { "Content-Type": "application/json" },
      });
    }

    const newUser = {
      userEmail,
      userName,
      createdAt: new Date(),
      ...otherData,
    };

    const result = await db.collection("users").insertOne(newUser);

    return new Response(JSON.stringify({ message: "User created successfully", userId: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function PATCH(request, { params }) { 
  const client = await clientPromise;
  const db = client.db();
  const userEmailToUpdate = params.email;

  try {
    const body = await request.json();
    if (body.userEmail) {
      return new Response(JSON.stringify({ error: "Email cannot be updated via this endpoint" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateDoc = {
      $set: {
        ...body, 
        updatedAt: new Date(), 
      },
    };

    const result = await db.collection("users").updateOne(
      { userEmail: userEmailToUpdate }, 
      updateDoc
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "User updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
