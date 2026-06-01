import app from './aps';
import config from './config';
import { initDB } from './db';

const main = async () => {
    initDB();
    app.listen(config.port, () => {
        console.log(`Server is running on port: ${config.port}`);
    });
};

main();
