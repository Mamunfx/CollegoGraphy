import clientPromise from '../../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ message: "Application ID missing." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    const appId = new ObjectId(id);
    const body = await request.json();
    const { allCollegeReviews } = body;

    if (!allCollegeReviews || !Array.isArray(allCollegeReviews)) {
      return new Response(JSON.stringify({ message: "Reviews data is invalid." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateResult = await db.collection("applications").updateOne(
      { _id: appId },
      { $set: { allCollegeReviews: allCollegeReviews } }
    );

    if (updateResult.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Application not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Application reviews updated!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Failed to update application reviews:", error);
    if (error.name === 'BSONTypeError') {
        return new Response(JSON.stringify({ message: "Invalid application ID format." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    return new Response(JSON.stringify({ error: "Something went wrong on our end." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}