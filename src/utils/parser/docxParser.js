import mammoth from "mammoth";

export async function extractDOCXText(file) {

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
        arrayBuffer
    });

    return result.value;
}