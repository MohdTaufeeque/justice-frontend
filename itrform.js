// Function to open the modal and display PDF
function openPdfModal(pdfUrl) {
    document.getElementById("pdfViewer").src = pdfUrl;
    document.getElementById("pdfModal").style.display = "block";
}

// Function to close the modal
function closePdfModal() {
    document.getElementById("pdfModal").style.display = "none";
    document.getElementById("pdfViewer").src = ""; // Clear iframe source to stop loading
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById("pdfModal");
    if (event.target == modal) {
        closePdfModal();
    }
};
