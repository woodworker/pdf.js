// postMessage helper
function postParentMessage(name, data) {
    if (window.parent && window.parent!=window && window.parent.postMessage) {
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
            currentPageNumber: page,
            previousPageNumber: evt.previousPageNumber,
            numPages: numPages
        });
    }

    if (evt.previousPageNumber !== page) {
        postParentMessage('pagechange', {
            currentPageNumber: page,
            previousPageNumber: evt.previousPageNumber,
            numPages: numPages
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

// announce document ready load
window.addEventListener('documentload', function (evt) {
    postParentMessage('documentload', {
        numPages: evt.detail.numPages,
        fingerprint: evt.detail.fingerprint
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
        case 'download':
            PDFViewerApplication.download();
            break;
    }
});
