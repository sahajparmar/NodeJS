import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
}> & {
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
}>> & mongoose.FlatRecord<{
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    banner: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
