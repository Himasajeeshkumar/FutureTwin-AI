import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractPDFText(file) {

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

        const page = await pdf.getPage(pageNum);

        const content = await page.getTextContent();

        const items = content.items
            .filter(item => item.str.trim() !== "")
            .map(item => ({

                text: item.str,

                x: item.transform[4],

                y: item.transform[5]

            }));

        // Sort from top to bottom, then left to right
        items.sort((a, b) => {

            if (Math.abs(b.y - a.y) > 3) {

                return b.y - a.y;

            }

            return a.x - b.x;

        });

        let pageText = "";

        let currentY = null;

        for (const item of items) {

            if (
                currentY !== null &&
                Math.abs(currentY - item.y) > 3
            ) {

                pageText += "\n";

            }

            pageText += item.text + " ";

            currentY = item.y;

        }

        fullText +=
`========== PAGE ${pageNum} ==========
${pageText}

`;

    }

    return fullText;

}

