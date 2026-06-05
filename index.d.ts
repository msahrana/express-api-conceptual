import type { OUser } from '.';

declare global {
    namespace Express {
        interface Request {
            user: OUser & { id: number };
            cookies?: Record<string, string>;
        }
    }
}
