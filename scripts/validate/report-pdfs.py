"""Verify and render synthetic browser-generated report PDFs; never reads child slips."""
from pathlib import Path
import fitz
from pypdf import PdfReader

root = Path('.local/qa/pdfs')
for name in ['ui-report.pdf', 'mobile-report.pdf', 'empty-report.pdf', 'stress-report.pdf']:
    path = root / name
    reader = PdfReader(path)
    text = '\n'.join(page.extract_text() or '' for page in reader.pages)
    assert 'Laporan Prestasi' in text, name
    assert 'NaN' not in text and 'Infinity' not in text and '\ufffd' not in text, name
    assert 'SULIT' in text and 'PENAFIAN' in text, name
    if name == 'empty-report.pdf':
        assert len(reader.pages) == 1 and 'Belum ada cubaan selesai' in text
    else:
        assert 'SIBLING-NOT-IN-REPORT' not in text, name
        assert 'Sejarah kuiz' in text and 'Pecahan topik' in text, name
    if name in ['ui-report.pdf', 'mobile-report.pdf']:
        assert len(reader.pages) == 2, 'Six-attempt summary should fit two polished pages'
        assert '62.5%' in text
    pdf = fitz.open(path)
    numbers = []
    for i, page in enumerate(pdf):
        page_text = page.get_text()
        assert f'Muka {i + 1} / {len(pdf)}' in page_text, (name, i)
        assert 'SULIT' in page_text and 'PENAFIAN' in page_text, (name, i)
        assert abs(page.rect.width - 595.28) < 1 and abs(page.rect.height - 841.89) < 1
        for word in page.get_text('words'):
            assert word[0] >= 40 and word[2] <= 555, (name, i, word)
            assert word[1] >= 15 and word[3] <= 830, (name, i, word)
            if 50 <= word[0] <= 53 and word[4].isdigit():
                numbers.append(int(word[4]))
        if name != 'stress-report.pdf' or i in [0, len(pdf)-1]:
            page.get_pixmap(matrix=fitz.Matrix(1.3,1.3)).save(root / f'{path.stem}-{i+1}.png')
    if name == 'stress-report.pdf':
        assert numbers == list(range(1,121)), f'All120 history rows must survive pagination: {numbers}'
    print(f'PASS {name}: {len(pdf)} A4 pages; {path.stat().st_size} bytes; privacy/footer/structure/bounds verified')

sample = PdfReader('.local/qa/reports/Contoh-Laporan-Prestasi.pdf')
assert 'CONTOH - DATA REKAAN' in sample.pages[0].extract_text()
assert len(sample.pages) == 2
print('PASS: clearly labelled synthetic preview; rendered pages ready for visual review.')
