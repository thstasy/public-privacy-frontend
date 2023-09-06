import jwt_decode from "jwt-decode";

let token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJTdGFzeSIsImVtYWlsIjoidC5oc3VhbmhzaWVoQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTEyOCIsImlhdCI6MTY4ODI4ODIzN30.YuVy5KvrXBiTVtk0EG9XoDGJasyAmwKkIKJT2JMtS4qrjXEQ2yCnrnMKoEnI8Ein";
let decoded = jwt_decode(token);

console.log(decoded);

// decode header by passing in options (useful for when you need `kid` to verify a JWT):

let decodedHeader = jwt_decode(token,{ header: true });
console.log(decodedHeader);

let decodedBody = jwt_decode(token,{ payload: true });
console.log(decodedBody);

/* prints:
 * { 
 *   typ: "JWT",
 *   alg: "HS256" 
 * }
 */