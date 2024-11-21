// Lấy các phần tử từ HTML
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const convertBtn = document.getElementById('convert-btn');
const imagePreview = document.getElementById('image-preview');
const pdfDownload = document.getElementById('pdf-download');
const downloadLink = document.getElementById('download-link');

// Xử lý sự kiện khi người dùng chọn tệp (bằng cách nhấp chuột)
fileInput.addEventListener('change', handleFiles, false);

// Xử lý sự kiện khi người dùng kéo và thả ảnh
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    dropZone.classList.add('bg-gray-100');
});
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-gray-100');
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('bg-gray-100');
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } });
});

// Hàm xử lý các tệp đã chọn (hoặc kéo thả)
function handleFiles(e) {
    const files = e.target.files;
    if (files.length > 0) {
        imagePreview.innerHTML = ''; // Xóa ảnh đã xem trước cũ
        [...files].forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function () {
                const imgElement = document.createElement('img');
                imgElement.src = reader.result;
                imgElement.classList.add('w-32', 'h-32', 'object-cover', 'rounded');
                const li = document.createElement('li');
                li.appendChild(imgElement);
                imagePreview.appendChild(li);
            };
            reader.readAsDataURL(file);
        });
        convertBtn.style.display = 'inline-block'; // Hiển thị nút "Chuyển đổi"
    }
}

// Hàm chuyển đổi ảnh thành PDF và tạo liên kết tải xuống
convertBtn.addEventListener('click', () => {
    const doc = new jsPDF();
    const images = document.querySelectorAll('#image-preview img');
    images.forEach((img, index) => {
        if (index > 0) {
            doc.addPage();
        }
        doc.addImage(img.src, 'JPEG', 10, 10, 180, 160); // Chèn ảnh vào PDF
    });

    // Tạo PDF và cung cấp liên kết tải xuống
    const pdfData = doc.output('blob');
    const url = URL.createObjectURL(pdfData);
    downloadLink.href = url;
    downloadLink.style.display = 'inline-block'; // Hiển thị nút tải xuống
    pdfDownload.style.display = 'block'; // Hiển thị phần tải xuống PDF
});
