import { Queue } from "bullmq";

export const tailoringQueue = new Queue("tailoring", {
  connection: {
    host: "redis",
    port: 6379,
  },
});
