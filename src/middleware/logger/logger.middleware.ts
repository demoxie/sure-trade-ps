import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

export function logger(req: Request, res: Response, next: NextFunction) {
  const loggers = new Logger('HTTP');
  loggers.log('Request... ', req.method, req.path, req.body);
  loggers.log('Response... ', res.statusCode, res.statusMessage);
  next();
}
