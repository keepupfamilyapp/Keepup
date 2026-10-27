const { initializeTestEnvironment, assertSucceeds, assertFails } = require("@firebase/rules-unit-testing");
const fs = require("fs");

async function main() {
  const testEnv = await initializeTestEnvironment({
    projectId: "keep-up-f9d1c",
    firestore: {
      rules: fs.readFileSync("firestore.rules", "utf8"),
      host: "127.0.0.1",
      port: 8080,
    },
  });

  const myUid = "opOXtV15nHZsjBW4brydvwoWn2N2";
  const asMe = testEnv.authenticatedContext(myUid).firestore();

  console.log("--- Testing single-document get on members ---");
  try {
    const doc = await asMe.collection("members").doc(myUid + "_imm").get();
    console.log("GET members doc: SUCCEEDED, exists:", doc.exists);
  } catch (e) {
    console.log("GET members doc: FAILED -", e.message);
  }

  console.log("--- Testing query (list) on feed where groupId == imm ---");
  try {
    const snap = await asMe.collection("feed").where("groupId", "==", "imm").get();
    console.log("QUERY feed: SUCCEEDED, docs found:", snap.size);
  } catch (e) {
    console.log("QUERY feed: FAILED -", e.message);
  }

  console.log("--- Testing query (list) on members where groupId == imm ---");
  try {
    const snap = await asMe.collection("members").where("groupId", "==", "imm").get();
    console.log("QUERY members: SUCCEEDED, docs found:", snap.size);
  } catch (e) {
    console.log("QUERY members: FAILED -", e.message);
  }

  await testEnv.cleanup();
}

main();