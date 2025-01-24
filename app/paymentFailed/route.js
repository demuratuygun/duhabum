export async function POST(req) {
    const param = await req.text(); // Parse incoming POST data
    console.log(param);
    //const failMessage = body.fail_message || 'Unknown error occurred';

    // Redirect to the page with query parameters (if needed)
    return new Response(null, {
        status: 302,
        headers: {
            Location: `/retryFailed?${param}`, //?fail_message=${encodeURIComponent(failMessage)}
        },
    });
}

