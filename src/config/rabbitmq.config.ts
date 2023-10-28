import { config } from 'dotenv';
import amqp, { Connection } from 'amqplib/callback_api';
config();
const { env } = process;

const {
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_VHOST,
  RABBITMQ_QUEUE_NAME,
  RABBITMQ_EXCHANGE_NAME,
  RABBITMQ_ROUTING_KEY,
} = env;
