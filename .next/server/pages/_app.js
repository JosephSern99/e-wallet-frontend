const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__f3820633._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_7bcac79c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_1ca1a180._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_395d4f84._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_164f9649._.js");
runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
