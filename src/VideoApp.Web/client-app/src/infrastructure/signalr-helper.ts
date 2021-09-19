import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

export default class SignalRHelper {
  private static connection: HubConnection;

  static getConnection(): HubConnection {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl("/chat-hub")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      }
      
    console.info(`Connection: ${this.connection.connectionId} state: ${this.connection.state}>>>`);

    this.initConnectionEvents();

    return this.connection;
  }

  static async start(): Promise<void> {
    if (this.connection.state !== HubConnectionState.Disconnected) {
      console.warn(`Connection: ${this.connection.connectionId} is in state: ${this.connection.state}`);
      return Promise.resolve();
    }
    
    try {
      await this.connection.start();
      console.info(`SignalR Connected: ${this.connection.connectionId}.`);
    } catch (err) {
      console.warn(`Error in starting connection: ${this.connection.connectionId}`, err);
      setTimeout(this.start, 5000);
    }
  }

  private static initConnectionEvents(): void {
    this.connection.onreconnecting(err => {
      console.assert(this.connection.state === HubConnectionState.Reconnecting);

      console.warn(`Connection lost due to error "${err}". Reconnecting.`);
    });

    this.connection.onreconnected(connectionId => {
      console.assert(this.connection.state === HubConnectionState.Connected);

      console.info(`Connection reestablished. Connected with connectionId "${connectionId}".`);
    });

    this.connection.onclose(err => {
      console.assert(this.connection.state === HubConnectionState.Disconnected);
      
      console.error(`Connection closed due to error "${err}". Try refreshing this page to restart the connection.`);
    })
  }
}