import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, guests, attending, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Forward to Google Apps Script (stores in Sheet + sends email)
    if (GOOGLE_SCRIPT_URL) {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          guests: Number(guests) || 1,
          attending: attending === "yes" ? "Yes" : "No",
          message: message || "",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Google Script error:", await response.text());
        // Don't fail — we still want to accept the RSVP
      }
    } else {
      // Fallback: just log to console if no Google Script URL configured
      console.log("📩 New RSVP (no Google Script configured):", {
        name,
        phone,
        guests,
        attending,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
