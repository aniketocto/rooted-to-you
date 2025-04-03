export async function POST(req) {
    try {
      const body = await req.json(); // Parse JSON request body
      console.log("Received Data:", body); // ✅ Log received data
  
      // Simulate backend processing (e.g., saving to DB, payment, etc.)
      return new Response(JSON.stringify({ message: "Data received successfully!", receivedData: body }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  