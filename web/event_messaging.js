// postMessage helper
function postParentMessage(name, data) {
    if (window.parent.postMessage) {
        window.parent.postMessage({
            name: 'pdfjs:' + name,
            data: data
        }, '*');
    }
}

// announce a page changes
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

// announce a download to parent
window.addEventListener('download', function (evt) {
    postParentMessage('download', {
        filename: evt.filename,
        url: evt.url
    });
});

// remote control
window.addEventListener('message', function windowMessage(e) {
    switch(e.data.action) {
        case 'openUrl':
            PDFViewerApplication.open(e.data.url);
            break;
        case 'namedAction':
            PDFViewerApplication.executeNamedAction(e.data.actionName);
            break;
    }
});
