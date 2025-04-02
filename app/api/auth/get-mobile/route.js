export async function POST(req) {
    try {
        const { mobNumber } = await req.json();
        console.log("Recieved Mobile Number: " + mobNumber);
        

        if (!mobNumber) {
            return new Response(JSON.stringify({ error: "Mobile number is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Mobile number received", mobNumber }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
