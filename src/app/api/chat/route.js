export async function POST(req) {
  try {
    const { message, context } = await req.json();

    const url = process.env.N8N_WEBHOOK_URL;
    if (!url) {
      console.error("Falta N8N_WEBHOOK_URL en .env.local");
      return new Response(JSON.stringify({ error: "Missing N8N_WEBHOOK_URL" }), { status: 500 });
    }

    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    });

    const raw = await upstream.text();
    console.log("[n8n] status:", upstream.status);
    console.log("[n8n] body  :", raw);

    // Si n8n devolvió error, propágalos con detalle
    if (!upstream.ok) {
      return new Response(
        JSON.stringify({ error: "n8n error", status: upstream.status, body: raw }),
        { status: 502 }
      );
    }

    // Intenta parsear JSON; si no, trata como texto plano
    let data;
    try { data = JSON.parse(raw); } catch { data = { reply: raw }; }

    const reply =
      data?.reply ??
      data?.output ??
      data?.text ??
      data?.data?.reply ??
      "Sin respuesta del flujo";

    return Response.json({ reply });
  } catch (e) {
    console.error("[/api/chat] exception:", e);
    return new Response(JSON.stringify({ error: e?.message || "proxy error" }), { status: 500 });
  }
}
