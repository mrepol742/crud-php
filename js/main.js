function showModalDialog(title, json, actionType, _pid) {
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
    h1.innerHTML = title;
    let closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.append(h1);
    modalHeader.append(closeButton);

    let modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");

    let inputType = ["text", "text", "date", "text", "text", "email", "number"];
    let inputName = ["lastName", "firstName", "birthday", "gender", "address", "emailAddress", "contactNumber"];
    let inputPlaceholder = ["Last name", "First name", "Birthday", "Gender", "Address", "Email Address", "Contact No."];

    for (input in inputType) {
        if (inputName[input] == "gender") {
            let inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "input-group2");
            let postTitle = document.createElement("select");
            postTitle.setAttribute("class", "form-select");
            // postTitle.setAttribute("type", inputType[input]);
            postTitle.setAttribute("placeholder", inputPlaceholder[input]);
            postTitle.setAttribute("name", inputName[input]);
            postTitle.setAttribute("required", "required");

            let option1 = document.createElement("option");
            option1.innerText = "";
            let option2 = document.createElement("option");
            option2.innerText = "Male";
            let option3 = document.createElement("option");
            option3.innerText = "Female";
            let option4 = document.createElement("option");
            option4.innerText = "Other";

            if (actionType == "edit") {
                switch (json[inputName[input]]) {
                    case "Male":
                        option2.setAttribute("selected", "selected");
                        break;
                    case "Female":
                        option3.setAttribute("selected", "selected");
                        break;
                    default:
                    case "Other":
                        option4.setAttribute("selected", "selected");
                        break;
                }
            }

            postTitle.append(option1);
            postTitle.append(option2);
            postTitle.append(option3);
            postTitle.append(option4);

            // value to be add here for edit function
            inputGroup.append(postTitle);
            let heading = document.createElement("i");
            heading.setAttribute("class", "fa-solid fa-info");
            inputGroup.append(heading);

            modalBody.append(inputGroup);
        } else {
            let inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "input-group2");
            let postTitle = document.createElement("input");
            postTitle.setAttribute("type", inputType[input]);
            postTitle.setAttribute("placeholder", inputPlaceholder[input]);
            postTitle.setAttribute("name", inputName[input]);
            postTitle.setAttribute("required", "required");

            if (actionType == "edit") {
                postTitle.setAttribute("value", json[inputName[input]]);
            }

            // value to be add here for edit function
            inputGroup.append(postTitle);
            let heading = document.createElement("i");
            heading.setAttribute("class", "fa-solid fa-info");
            inputGroup.append(heading);

            modalBody.append(inputGroup);
        }
    }

    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "_aid");

    if (_pid != null) {
        hiddenInput.setAttribute("value", _pid);
    }

    modalBody.append(hiddenInput);

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

addData.onclick = function () {
    showModalDialog("Add Data", null, "saveChanges", null);
};

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
let raw = document.querySelectorAll(".card-body");

for (const item in editItems) {
    if (typeof editItems[item] === "object") {
        const a = editItems[item].dataset.id;
        const json = JSON.parse(atob(raw[item].dataset.id));

        editItems[item].onclick = function () {
            showModalDialog("Edit Data", json, "edit", a);
        };
    }
}

function search1() {
    let val = search.value;
    if (val.trim() != "") {
        window.location.href = "?q=" + search.value;
    } else {
        window.location.href = "/crud-php";
    }
}

search.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        search1();
    }
});

but.onclick = function () {
    search1();
};
