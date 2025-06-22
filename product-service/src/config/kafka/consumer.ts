import { updateProductStockService } from "../../service/product/product.service";
import { kafka } from "./kafka";

const createOrderConsumer = kafka.consumer({
  groupId: "product-consumer-group",
});

export const startOrderConsumer = async () => {
  await createOrderConsumer.connect();
  await createOrderConsumer.subscribe({
    topic: "order-created",
    fromBeginning: false,
  });

  await createOrderConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value?.toString();
      if (!data) return;

      const order = JSON.parse(data);

      for (const productId of order.productIds) {
        try {
          await updateProductStockService(productId, -1);
        } catch (err: any) {
          console.error(
            `❌ Failed to update stock for ${productId}:`,
            err.message
          );
          // TODO: Push to a retry topic or dead-letter queue
        }
      }
    },
  });

  console.log(
    "✅ Product Service Kafka Consumer connected to topic: order-created"
  );
};

const cancelOrderConsumer = kafka.consumer({
  groupId: "product-cancel-consumer-group",
});

export const startOrderCancelledConsumer = async () => {
  await cancelOrderConsumer.connect();
  await cancelOrderConsumer.subscribe({
    topic: "order-cancelled",
    fromBeginning: false,
  });

  await cancelOrderConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = message.value?.toString();
      if (!data) return;

      const order = JSON.parse(data);

      for (const productId of order.productIds) {
        try {
          await updateProductStockService(productId, +1);
        } catch (err: any) {
          console.error(
            `❌ Failed to restock product ${productId}:`,
            err.message
          );
          // TODO: Push to a retry topic or dead-letter queue
        }
      }
    },
  });

  console.log(
    "✅ Product Service Kafka Consumer connected to topic: order-cancelled"
  );
};
