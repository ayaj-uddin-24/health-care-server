import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../utils/fileUploader";

const createUser = async (req: Request) => {
  if (req.file) {
    const fileUpload = await fileUploader.uploadCloudinary(req.file);
    req.body.patient.profilePhoto = fileUpload?.secure_url;
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPassword,
      },
    });

    return await tx.patient.create({
      data: req.body.patient
    });
  });

  return result;
};

export const userService = { createUser };
