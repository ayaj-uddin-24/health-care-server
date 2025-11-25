import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient Created Successfully!",
    data: result,
  });
});

export const userController = { createUser };
