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
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof File)
      ) {
        // If the value is an array of Files, store an array of file names in the result object
        result[key] = await Promise.all(value.map((file) => uploadFile(file)));
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
