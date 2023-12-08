function showModalDialog(title, postTitleA, postContentA, actionType, _pid) {
    let modalContainer = document.getElementById("modalContainer");

    let modal = document.createElement("div");
    modal.setAttribute("class", "modal fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "addDataModal");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("id", "defIDDD");

    let modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered");
    
    let modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    let form = document.createElement("form");
    form.setAttribute("method", "post");

    let modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    let h1 = document.createElement("h1");
    h1.setAttribute("class", "modal-title fs-5");
    h1.setAttribute("id", "addDataModal");
    h1.innerHTML = title
    let closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.append(h1);
    modalHeader.append(closeButton);

    let modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    let inputGroup1 = document.createElement("div");
    inputGroup1.setAttribute("class", "input-group2");
    let postTitle = document.createElement("input");
    postTitle.setAttribute("type", "text");
    postTitle.setAttribute("placeholder", "Post title");
    postTitle.setAttribute("name", "title");
    postTitle.setAttribute("required", "required");
    if (postTitleA != null) {
        postTitle.setAttribute("value", postTitleA);
    }
    inputGroup1.append(postTitle);
    let heading = document.createElement("i");
    heading.setAttribute("class", "fa-solid fa-heading");
    inputGroup1.append(heading);

    let inputGroup2 = document.createElement("div");
    inputGroup2.setAttribute("class", "input-group2");
    let postContent = document.createElement("input");
    postContent.setAttribute("type", "text");
    postContent.setAttribute("placeholder", "Post content");
    postContent.setAttribute("name", "content");
    postContent.setAttribute("required", "required");
    if (postContentA != null) {
        postContent.setAttribute("value", postContentA);
    }
    inputGroup2.append(postContent);
    let contentB = document.createElement("i");
    contentB.setAttribute("class", "fa-solid fa-book-open");
    inputGroup2.append(contentB);

    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "_pid");

    if (_pid != null) {
        hiddenInput.setAttribute("value", _pid);
    }

    modalBody.append(hiddenInput);

    modalBody.append(inputGroup1);
    modalBody.append(inputGroup2);

    let modalFooter = document.createElement("div");
    modalFooter.setAttribute("class", "modal-footer");

    let dismissButton = document.createElement("button");
    dismissButton.setAttribute("type", "button");
    dismissButton.setAttribute("class", "btn btn-secondary");
    dismissButton.setAttribute("data-bs-dismiss", "modal");
    dismissButton.innerHTML = "Cancel";
    let saveChanges = document.createElement("button");
    saveChanges.setAttribute("type", "submit");
    saveChanges.setAttribute("name", actionType);
    saveChanges.setAttribute("class", "btn btn-primary");
    saveChanges.innerHTML = "Save changes";

    modalFooter.append(dismissButton);
    modalFooter.append(saveChanges);


    form.append(modalHeader);
    form.append(modalBody);
    form.append(modalFooter);
    modalContent.append(form);
    modalDialog.append(modalContent);
    modal.append(modalDialog);
    modalContainer.append(modal);
    const myModal = new bootstrap.Modal(modal);
    myModal.show();

    $("#defIDDD").on("hide.bs.modal", function () {
        modal.remove();
    });
}

addData.onclick = function() {
    showModalDialog("Add Data", null, null, "saveChanges", null);
}


let deleteItems = document.querySelectorAll(".delete");

for (const item in deleteItems) {
    if (typeof deleteItems[item] === "object") {
        let cardTitles = document.querySelectorAll(".card-title");
        const a = deleteItems[item].dataset.id;
        deleteItems[item].onclick = function () {
           let form = document.createElement("form");
           form.setAttribute("method", "post");
           form.setAttribute("style", "display: none;");
           let iInput = document.createElement("input");
           iInput.setAttribute("value", a);
           iInput.setAttribute("name", "_pid");
           let button = document.createElement("button");
           button.setAttribute("type", "submit");
           button.setAttribute("name", "delete");
           form.append(iInput);
           form.append(button);
           let modalContainer = document.getElementById("modalContainer");
           modalContainer.append(form);
           button.click();
        };
    }
}

let editItems = document.querySelectorAll(".edit");

for (const item in editItems) {
    if (typeof editItems[item] === "object") {
        let postTitles = document.querySelectorAll(".card-title");
        let postContents = document.querySelectorAll(".card-text");
        const a = editItems[item].dataset.id;
        editItems[item].onclick = function () {
            showModalDialog("Edit Data", postTitles[item].innerText, postContents[item].innerText, "edit", a);
        };
    }
}
