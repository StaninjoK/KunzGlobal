// Serves dist/ the way GitHub Pages does (directory indexes, 404.html). Usage: node scripts/serve.mjs [port]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const port = Number(process.argv[2] || 4173);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff" };

http
  .createServer((req, res) => {
    // Local stand-in for the Apps Script contact endpoint (build with VITE_CONTACT_ENDPOINT=http://127.0.0.1:<port>/__contact).
    // A message containing "FAIL" simulates a server error.
    if (req.method === "POST" && (req.url || "").startsWith("/__contact")) {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        console.log("[contact mock]", body);
        const fail = (new URLSearchParams(body).get("message") || "").includes("FAIL");
        setTimeout(() => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(fail ? { ok: false, error: "server" } : { ok: true }));
        }, 900);
      });
      return;
    }
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = path.join(root, url);
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    const found = fs.existsSync(file);
    if (!found) file = path.join(root, "404.html");
    res.writeHead(found ? 200 : 404, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, "127.0.0.1", () => console.log(`dist/ on http://127.0.0.1:${port}`));
