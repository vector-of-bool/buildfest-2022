import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { MethodResponder } from "./types";

/**
 * @param methodHandlers A set of functions that handle a given HTTP method
 * @returns A new request hander function that dispatches to the appropriate method
 */
export function createMethodHandler(methodHandlers: MethodResponder): NextApiHandler {
  return (req: NextApiRequest, resp: NextApiResponse) => {
    const method = req.method;
    if (method === undefined) {
      resp.status(400).json({ error: "No HTTP method??" });
      return;
    }

    function methodNotSupported() {
      resp.status(405).json({
        error: `HTTP Method ${method} is not supported`
      });
    }

    const lower = method.toLowerCase();
    switch (lower) {
      case 'get':
      case 'post':
      case 'put':
      case 'delete':
        const methodHandler = methodHandlers[lower];
        if (methodHandler === undefined) {
          return methodNotSupported();
        }
        return methodHandler(req, resp);
      default:
        return methodNotSupported();
    }
  };
}