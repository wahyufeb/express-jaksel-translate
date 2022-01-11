import { Response } from "express";

type IResponseFormatter  = {
  response: Response;
  code: number;
  message: string;
  data: any;
}

class ResponseFormatter {
  static formatResponse = (result: IResponseFormatter) :Response =>  {
    const { response, code, message, data } = result;
    return response.status(code).json({
      message,
      data,
    });
  };
}

export default ResponseFormatter;