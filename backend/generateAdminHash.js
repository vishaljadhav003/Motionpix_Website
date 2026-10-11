const argon2 = require("argon2");

async function generateHash() {
  const password = process.argv[2];

  if (!password) {
    console.error("Usage: node generateAdminHash.js YOUR_PASSWORD");
    process.exit(1);
  }

  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  console.log("\nPassword hash:\n");
  console.log(hash);
}

generateHash();


// to generate a hash for your admin password, run the following command in your terminal:
// node generateAdminHash.js
// Usage: node generateAdminHash.js YOUR_PASSWORD
// node generateAdminHash.js YourStrongPasswordHere
// MotionPix@Admin#2026!X

// $argon2id$v=19$m=19456,p=1,t=2$2Ofe/DU+GKA9RthvA7WeZQ$/notwz6mOGR2mj4FaysOqNA5ksh2l4MLHCkGLGydSm4

