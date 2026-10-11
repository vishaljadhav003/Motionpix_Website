
const argon2 = require("@node-rs/argon2");

async function generateHash() {
  const password = process.argv[2];

  if (!password) {
    console.error(
      "Usage: node backend/generateAdminHash.js <password>"
    );
    process.exitCode = 1;
    return;
  }

  try {
    const hash = await argon2.hash(password, {
      algorithm: 2, // Argon2id
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    console.log("\nPassword hash:\n");
    console.log(hash);
  } catch (error) {
    console.error("Unable to generate password hash:", error);
    process.exitCode = 1;
  }
}

generateHash();
