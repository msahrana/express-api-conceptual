import type { NextFunction, Request, Response } from 'express';
import { green, italic, blue } from 'kleur/colors';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(
        `[${green(new Date().toLocaleString())}]`,
        italic(req.method),
        blue(req.url),
    );
    next();
};
