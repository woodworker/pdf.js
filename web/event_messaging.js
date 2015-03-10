function postParentMessage(name, data) {
    if (window.parent.postMessage) {
        window.parent.postMessage({
            name: 'pdfjs:' + name,
            data: data
        }, '*');
    }
}

window.addEventListener('pagechange', function (evt) {
    var page = evt.pageNumber,
        numPages = PDFViewerApplication.pagesCount;
    if (evt.updateInProgress == false) {
        postParentMessage('pagechange', {
            currentPage: page,
            previousPage: evt.previousPageNumber,
            totalPages: numPages
        });
    }

    if (evt.previousPageNumber !== page) {
        postParentMessage('pagechange', {
            currentPage: page,
            previousPage: evt.previousPageNumber,
            totalPages: numPages
        });
    }
});

window.addEventListener('download', function (evt) {
    postParentMessage('download', {
        filename: evt.filename,
        url: evt.url
    });
});
