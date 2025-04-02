import { otpStore } from "@/lib/store";

export async function POST(req) {
    try {
        const { mobNumber, otp } = await req.json();
        
        console.log("Received data for OTP verification:", { mobNumber, otp });

        // Validate mobile number
        if (!mobNumber || !/^[6-9]\d{9}$/.test(mobNumber)) {
            return new Response(JSON.stringify({ error: "Invalid mobile number." }), { status: 400 });
        }

        // Validate OTP format (should be a 6-digit number)
        if (!otp || !/^\d{6}$/.test(otp)) {
            return new Response(JSON.stringify({ error: "Invalid OTP format." }), { status: 400 });
        }

        // HARDCODED OTP for testing - "123456" for any valid mobile number
        const hardcodedOtp = "123456";
        
        // Compare OTPs with hardcoded value instead of store
        if (hardcodedOtp !== otp) {
            console.log("OTP mismatch. Expected:", hardcodedOtp, "Received:", otp);
            return new Response(JSON.stringify({ error: "Invalid OTP." }), { status: 401 });
        }

        console.log("OTP matched successfully:", otp);
        return new Response(JSON.stringify({ success: true, message: "OTP verified successfully!" }), { status: 200 });

    } catch (error) {
        console.error("Error in OTP verification:", error);
        return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500 });
    }
}