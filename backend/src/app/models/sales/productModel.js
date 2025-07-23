import { Schema, model } from "mongoose";
import { PRODUCT_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";
import { getAndSetIncNo } from "../../controllers/v1/auth/autoIncrement/autoIncrement.js";

const schema = new Schema(
  {
    productCode: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: [],
    },
    subcategory: {
      type: String,
      required: true,
      enum: [],
    },
    brand: {
      type: String,
      required: true,
      enum: [],
    },
    size: {
      type: String,
      required: true,
      enum: [],
    },
    color: {
      type: String,
      required: true,
      enum: [],
    },
    fabric: {
      type: String,
      required: true,
      enum: [],
    },
    fit: {
      type: String,
      required: true,
      enum: [],
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    deliveryDays: {
      type: Number,
      required: false,
    },
    // images: {
    //   type: [String],
    //   required: false,
    //   get: (images) => {
    //     if (Array.isArray(images) && images.length > 0) {
    //       return images.map(
    //         (image) => `${process.env.AWS_CLOUDFRONT_NAME}${image}`
    //       );
    //     }
    //     return images; 
    //   },
    // },
    // variants: [Schema.Types.ObjectId],
    // deliveryDays: {
    //   type: Number,
    //   required: true,
    // },
    // makingCharges: {
    //   type: Number,
    //   required: true,
    // },
    // grossWeight: {
    //   type: Number,
    //   required: false,
    // },
    // netWeight: {
    //   type: Number,
    //   required: false,
    // },
    // stoneCharges: {
    //   type: Number,
    //   required: false,
    // },
    // otherCharges: {
    //   type: Number,
    //   required: false,
    // },
    // wholeMarkCharges: {
    //   type: Number,
    //   required: false,
    // },

    status: {
      type: String,
      default: SCHEMA_CONST.STATUS.ACTIVE,
      enum: Object.values(SCHEMA_CONST.STATUS),
    },
  },
  {
    timestamps: true,
    collection: SCHEMA_CONST.COLLECTION_NAME,
    versionKey: false,
  }
);

schema.set("toJSON", { getters: true });

schema.pre("save", async function (next) {
  const { isNew, isModified } = this;
  if (this.isNew) {
    this.productCode = await getAndSetIncNo(
      {
        collectionName: SCHEMA_CONST.COLLECTION_NAME,
        incPrefix: SCHEMA_CONST.INC_PREFIX,
      },
      true
    );
  }
  next();
});
schema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, schema);
