import { useState } from "react";
import Compressor from "compressorjs";

interface CompressOptions {
  quality?: number;
  maxWidth?: number;
  convertTypes?: string[];
  mimeType?: string;
}

interface UseImageCompressorReturn {
  compressImage: (file: File, options?: CompressOptions) => Promise<File>;
  compressImages: (files: File[], options?: CompressOptions) => Promise<File[]>;
  isCompressing: boolean;
  error: Error | null;
}

const defaultOptions: Required<CompressOptions> = {
  quality: 0.8, // 80%
  maxWidth: 1920,
  convertTypes: ["image/jpeg", "image/jpg", "image/webp"],
  mimeType: "image/png",
};

/**
 * Custom hook to compress images using compressorjs
 *
 * @example
 * const { compressImage, compressImages, isCompressing } = useImageCompressor();
 *
 * // Compress single image
 * const compressed = await compressImage(file);
 *
 * // Compress multiple images
 * const compressedFiles = await compressImages(files);
 */
export const useImageCompressor = (): UseImageCompressorReturn => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Compress a single image file
   */
  const compressImage = async (
    file: File,
    options: CompressOptions = {}
  ): Promise<File> => {
    const config = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: config.quality,
        maxWidth: config.maxWidth,
        mimeType: config.mimeType,
        convertTypes: config.convertTypes,
        convertSize: 0, // Always convert to specified mimeType

        success(result) {
          console.log(result);

          // Convert Blob to File
          const compressedFile = new File(
            [result],
            file.name.replace(/\.[^/.]+$/, ".png"), // Change extension to .png
            {
              type: config.mimeType,
              lastModified: Date.now(),
            }
          );
          resolve(compressedFile);
        },

        error(err) {
          console.error("Compression error:", err);
          reject(err);
        },
      });
    });
  };

  /**
   * Compress multiple image files
   */
  const compressImages = async (
    files: File[],
    options: CompressOptions = {}
  ): Promise<File[]> => {
    setIsCompressing(true);
    setError(null);

    try {
      const compressedFiles = await Promise.all(
        files.map((file) => compressImage(file, options))
      );
      return compressedFiles;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Compression failed");
      setError(error);
      throw error;
    } finally {
      setIsCompressing(false);
    }
  };

  return {
    compressImage,
    compressImages,
    isCompressing,
    error,
  };
};

export default useImageCompressor;
