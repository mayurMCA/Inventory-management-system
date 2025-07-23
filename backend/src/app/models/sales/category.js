import { Schema, model } from "mongoose";
import { CATEGORY_SCHEMA as SCHEMA_CONST } from "../../mocks/schemaConst/salesSchemaConst.js";
import { paginatePlugin } from "../plugins/paginatePlugin.js";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      enum: Object.values(SCHEMA_CONST.TITLE_ENUM),
    },
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

categorySchema.set('toJSON', { getters: true });


categorySchema.plugin(paginatePlugin);

export default model(SCHEMA_CONST.COLLECTION_NAME, categorySchema);
