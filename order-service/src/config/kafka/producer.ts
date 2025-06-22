import { Order } from "@prisma/client";
import { kafka } from "./kafka";
import { Partitioners } from "kafkajs";

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

export const connectProducer = async () => {
  await producer.connect();
  console.log(" ✅  Order-Service Producer Connected");
};

export const publishOrderCreated = async (order: {
  orderId: string;
  productIds: string[];
  amount: Number;
}) => {
  await producer.send({
    topic: "order-created",
    messages: [{ value: JSON.stringify(order) }],
  });
};
export const publishOrderCancelled = async (order: {
  orderId: string;
  productIds: string[];
  reason: string;
}) => {
  await producer.send({
    topic: "order-cancelled",
    messages: [{ value: JSON.stringify(order) }],
  });
};
