import { Injectable } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';

@Injectable()
export class RabbitMQService {
  private connection: amqp.AmqpConnectionManager;
  private channel: amqp.ChannelWrapper;

  constructor() {
    this.connection = amqp.connect(['amqp://localhost:5672']);
    this.createChannel();
  }

  private createChannel(): void {
    this.channel = this.connection.createChannel({
      json: true,
      name: 'payment',
    });
  }

  public async sendToQueue(queue: string, message: any): Promise<void> {
    await this.channel.sendToQueue(queue, message);
  }

  public async consume(queue: string, callback: (message: any)=> void): Promise<void> {
    await this.channel.consume(queue, (message) => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
