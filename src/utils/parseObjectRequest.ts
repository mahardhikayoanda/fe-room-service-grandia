import uploadFile from "./uploadFile";

interface MyObject {
  [key: string]: any;
}

/**
 * Use this if your requst have file to upload it
 * @param {MyObject} obj The object to process. Each value will be checked if it's a `File`.
 * @returns {MyObject} A new object with `File` values replaced by their names.
 */
const parseObjectRequest = async (obj: MyObject): Promise<MyObject> => {
  const result: MyObject = {};

  const parse = async (key: string, value: any) => {
    if (Object.hasOwn(obj, key)) {
      if (value instanceof File) {
        // If the value is a File, store only its name in the result object
        result[key] = await uploadFile(value);
      } else if (value instanceof FileList) {
        // If the value is a FileList, convert to array and upload each file
        const filesArray = Array.from(value);
        const uploadedUuids = await Promise.all(
          filesArray.map((file) => uploadFile(file))
        );

        // Format as array of objects with photo_uuid key for complaint_and_request_images
        if (key === "complaint_and_request_images") {
          result[key] = uploadedUuids.map((uuid) => ({ photo_uuid: uuid }));
        } else {
          result[key] = uploadedUuids;
        }
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof File)
      ) {
        // If the value is an array of Files, store an array of file names in the result object
        const uploadedUuids = await Promise.all(
          value.map((file) => uploadFile(file))
        );

        // Format as array of objects with photo_uuid key for complaint_and_request_images
        if (key === "complaint_and_request_images") {
          result[key] = uploadedUuids.map((uuid) => ({ photo_uuid: uuid }));
        } else {
          result[key] = uploadedUuids;
        }
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // If the value is a nested object, recursively process that object
        result[key] = await parseObjectRequest(value);
      } else if (Array.isArray(value) && typeof value[0] === "object") {
        result[key] = await Promise.all(
          value.map((d) => parseObjectRequest(d))
        );
      } else {
        // Otherwise, just copy the original value
        result[key] = value;
      }
    }
  };

  await Promise.all(
    Object.entries(obj).map(([key, value]) => parse(key, value))
  );

  return result;
};

export default parseObjectRequest;
