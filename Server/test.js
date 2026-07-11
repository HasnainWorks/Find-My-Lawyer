const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
import mongoose from "mongoose";

const uri =
  "mongodb+srv://rayan:rayan123@hirealawyermain.xsqws.mongodb.net/HireALawyermain";

try {
  console.log("Connecting...");
  await mongoose.connect(uri);
  console.log("✅ Connected!");
  process.exit(0);
} catch (err) {
  console.error("❌ Failed:");
  console.error(err);
  process.exit(1);
}