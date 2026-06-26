from io import BytesIO

from pypdf import PdfReader


class PDFReader:

    @staticmethod
    def extract_text(file_bytes: bytes) -> str:
        """
        Extract text from uploaded PDF.
        """

        reader = PdfReader(BytesIO(file_bytes))

        pages = []

        for page in reader.pages:
            text = page.extract_text()

            if text:
                pages.append(text)

        return "\n".join(pages).strip()