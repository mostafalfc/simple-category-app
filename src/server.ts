import configurations from './configs/configurations';
import { main } from './app';

async function server() {
  try {
    const port = configurations().port;
    const host = configurations().host;

    const app = main();
    await app.listen({
      port: +port,
      host: host,
    });
    console.log(`Server started at http://${host}:${port}/docs`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

server();
