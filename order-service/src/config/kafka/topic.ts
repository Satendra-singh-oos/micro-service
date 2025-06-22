import { kafka } from "./kafka";

export async function createOrderTopic() {
  const admin = kafka.admin();
  console.log("Admin connecting...");

  await admin.connect();
  console.log("Admin Connection Success...");

  console.log("Creating Topic order-created");
  const created = await admin.createTopics({
    topics: [
      {
        topic: "order-created",
        numPartitions: 2,
        replicationFactor: 1,
      },
    ],
  });

  if (created) {
    console.log("✅ Topic created: order-created");
    console.log("Disconnecting Admin..");
    await admin.disconnect();
  } else {
    console.log("⚠️ Topic already exists: order-created");
    console.log("Disconnecting Admin..");
    await admin.disconnect();
  }
}
