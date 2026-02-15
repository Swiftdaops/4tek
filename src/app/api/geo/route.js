export async function GET(request) {
  // Try Vercel geo header first (deployed on Vercel)
  const headers = request.headers;
  const countryCode = headers.get("x-vercel-ip-country") || headers.get("x-vercel-ip-country-code");

  const codeToName = {
    NG: "Nigeria",
    GB: "United Kingdom",
    US: "United States",
    CA: "Canada",
  };

  const codeToCurrency = {
    NG: "₦",
    GB: "£",
    US: "$",
    CA: "CAD $",
  };

  if (countryCode) {
    const upper = countryCode.toUpperCase();
    const country = codeToName[upper] || null;
    const currency = codeToCurrency[upper] || "$";
    return new Response(JSON.stringify({ country, countryCode: upper, currency }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  // Fallback – use public IP lookup
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("ipapi failed");
    const data = await res.json();
    const country = data.country_name || null;
    const countryCodeFallback = data.country || null;
    // Basic currency mapping for a few countries; default to $
    const currency = (countryCodeFallback && codeToCurrency[countryCodeFallback.toUpperCase()]) || "$";
    return new Response(JSON.stringify({ country, countryCode: countryCodeFallback, currency }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ country: null, countryCode: null, currency: "$" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}
