import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject } from "zod";

export function validate(schema: AnyZodObject): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      if (validated.body !== undefined) req.body = validated.body;
      if (validated.params !== undefined) req.params = validated.params;

      if (validated.query !== undefined) {
        for (const key of Object.keys(req.query)) delete req.query[key];
        Object.assign(req.query, validated.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
