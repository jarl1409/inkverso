declare module "multer-storage-cloudinary" {
  import { Request } from "express";
  import { v2 as cloudinary } from "cloudinary";
  import { StorageEngine } from "multer";

  interface CloudinaryStorageParams {
    cloudinary: typeof cloudinary;
    params: {
      folder?: string;
      allowed_formats?: string[];
      transformation?: any[];
      public_id?: (req: Request, file: Express.Multer.File) => string;
      resource_type?: string;
      use_filename?: boolean;
      unique_filename?: boolean;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageParams);
    _handleFile(
      req: Request,
      file: Express.Multer.File,
      cb: (error?: any, info?: Partial<Express.Multer.File>) => void
    ): void;
    _removeFile(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null) => void
    ): void;
  }
}
