import axios from "axios";

const META_CAPI_URL = "https://graph.facebook.com/v13.0/<PIXEL_ID>/events";
const ACCESS_TOKEN = "<YOUR_ACCESS_TOKEN>";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { event_name, event_time, user_data, custom_data } = body;

    // Send data to Meta Conversions API
    const response = await axios.post(
      META_CAPI_URL,
      {
        data: [
          {
            event_name, // e.g., "Purchase"
            event_time, // Unix timestamp
            user_data,  // Hashed user information
            custom_data, // Optional custom details, e.g., price or items
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    // Return success response
    return new Response(JSON.stringify({ success: true, response: response.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending event to Meta CAPI:", error.response?.data || error.message);

    return new Response(
      JSON.stringify({ success: false, error: error.response?.data || error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
