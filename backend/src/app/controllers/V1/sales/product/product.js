import MESSAGES from "../../../../helpers/messages.js";
import { ProductInstance } from "../../../../models/sales/repository/productRepository.js";
import { SubCategoryInstance } from "../../../../models/sales/repository/subCategoryRepository.js";
import { CategoryInstance } from "../../../../models/sales/repository/categoryRepository.js";
import { VariantInstance } from "../../../../models/sales/repository/variantRepository.js";
import { Types } from "mongoose";
import handleAsync from "../../../../utilities/handleAsync.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { dirname, join, resolve } from "path";

export const getAll = handleAsync(async (req, res) => {
  const project = {
    productCode: 1,
    name: 1,
    weight: 1,
    description: 1,
    // images: {
    //   $map: {
    //     input: "$images",
    //     as: "image",
    //     in: {
    //       $concat: [process.env.AWS_CLOUDFRONT_NAME, "$$image"],
    //     },
    //   },
    // },
    subCategoryId: 1,
    variants: 1,
    subCategoryName: "$subCategoryDetails.name",
    status: 1,
  };
  const pipeline = [
    {
      $lookup: {
        from: "sub_category",
        localField: "subCategoryId",
        foreignField: "_id",
        as: "subCategoryDetails",
        pipeline: [{ $project: { _id: 1, name: 1 } }],
      },
    },

    {
      $unwind: "$subCategoryDetails",
    },
  ];
  let rows = await ProductInstance.getAllPaginate({
    pipeline,
    project,
    queryParams: req.query,
  });
  return res.success(rows);
});

// Create user
export const create = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };
  if (createdObj.variants.trim()) {
    createdObj.variants = createdObj.variants.split(',')
      .map((id) => new Types.ObjectId(id.trim()));
  } else {
    createdObj.variants = []
  }
  let exists = await ProductInstance.findOneDoc(
    {
      name: req.body.name,
    },
    { _id: 1 }
  );
  if (exists) {
    return res.preconditionFailed(
      MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Product")
    );
  }
  // if (req.files && req.files.length > 0) {
  //   const images = await Promise.all(
  //     req.files.map((file) =>
  //       uploadFileToS3(
  //         file.buffer,
  //         `${process.env.AWS_BUCKET_NAME}/Product`,
  //         `${Date.now()}_${file.originalname}`,
  //         file.mimetype
  //       )
  //     )
  //   );
  //   createdObj.images = images;
  // }

  const userObj = await ProductInstance.createDoc(createdObj);
  if (userObj) {
    return res.success({
      message: MESSAGES.apiSuccessStrings.CREATE("Product"),
    });
  }
});

// Update user
export const update = handleAsync(async (req, res) => {
  let createdObj = { ...req.body };

  if (createdObj.variants.trim()) {
    createdObj.variants = createdObj.variants.split(',')
      .map((id) => new Types.ObjectId(id.trim()));
  } else {
    createdObj.variants = []
  }

  let exists = await ProductInstance.getDocById(req.params.id);
  const rawImages = exists.get("images", null, { getters: false });
  if (!exists)
    return res.preconditionFailed(MESSAGES.apiErrorStrings.INVALID_REQUEST);

  if (req.files && req.files.length > 0) {
    const images = await Promise.all(
      req.files.map((file) =>
        uploadFileToS3(
          file.buffer,
          `${process.env.AWS_BUCKET_NAME}/Product`,
          `${Date.now()}_${file.originalname}`,
          file.mimetype
        )
      )
    );
    createdObj.images = [...rawImages, ...images];
  }

  let updateData = await ProductInstance.updateDoc(exists, createdObj);
  if (!updateData) return res.preconditionFailed(errors);
  return res.success({
    message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
  });
});

// Get user by ID
export const getById = handleAsync(async (req, res) => {
  let exists = await ProductInstance.getDocById(req.params.id);
  if (!exists) return res.unprocessableEntity();
  return res.success(exists);
});

// Delete user by ID
export const deleteById = handleAsync(async (req, res) => {
  let exist = await ProductInstance.getDocById(req.params.id);
  // let rawData = exist.toObject({ getters: false });

  let rawImages = exist.get("images", null, { getters: false });

  for (const img of rawImages) {
    await removeFileFromS3(process.env.AWS_BUCKET_NAME, img);
  }

  const deleteItem = await ProductInstance.deleteDoc(req.params.id);
  if (deleteItem)
    return res.success({ message: MESSAGES.apiSuccessStrings.DELETE });
});