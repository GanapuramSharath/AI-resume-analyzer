import { Worker } from "bullmq";

const worker = new Worker(
  "tailoring",
  async (job) => {
    console.log(job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
console.log("🚀 Worker started");
