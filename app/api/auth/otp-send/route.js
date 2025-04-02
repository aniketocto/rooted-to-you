import { otpStore } from "@/lib/store";

export async function POST(req) {
    try {
        const { mobNumber } = await req.json();
        console.log("Current store contents:", Array.from(otpStore.entries()));
        if (!mobNumber || !/^[6-9]\d{9}$/.test(mobNumber)) {
            return new Response(JSON.stringify({ error: "Invalid mobile number." }), { status: 400 });
        }

        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string
        console.log(`Generated OTP for ${mobNumber}:`, otp);

        // Store OTP (expires in 5 minutes)
        otpStore.set(mobNumber, otp);
        setTimeout(() => otpStore.delete(mobNumber), 5 * 60 * 1000); // Auto-delete OTP after 5 mins

        return new Response(JSON.stringify({ success: true, message: "OTP sent successfully!" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
    }
}
