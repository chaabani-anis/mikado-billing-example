import * as net from 'node:net';

/**
 * Deliberately simplified SMTP client: opens a TCP connection,
 * waits for the server greeting, sends the message, waits for the ack.
 * Just enough protocol to make the point: testing billing logic
 * requires a live SMTP endpoint.
 */
export class SmtpClient {
  constructor(
    private readonly host: string,
    private readonly port: number,
  ) {}

  send(to: string, subject: string, body: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = net.createConnection({ host: this.host, port: this.port });
      socket.setEncoding('utf8');
      socket.setTimeout(2000);

      let greeted = false;

      socket.on('data', (chunk: string) => {
        if (!greeted && chunk.startsWith('220')) {
          greeted = true;
          socket.write(`TO:${to}\r\nSUBJECT:${subject}\r\n\r\n${body}\r\n.\r\n`);
          return;
        }
        if (greeted && chunk.startsWith('250')) {
          socket.end();
          resolve();
        }
      });

      socket.on('timeout', () => {
        socket.destroy();
        reject(new Error(`SMTP timeout: ${this.host}:${this.port}`));
      });
      socket.on('error', (err) => reject(err));
    });
  }
}
