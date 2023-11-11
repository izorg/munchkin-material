export const GET = () =>
  new Response(
    /* HTML */ `
      <html lang="en">
        <head>
          <title />
          <meta http-equiv="refresh" content="0; url=/en" />
        </head>
      </html>
    `.trim(),
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
