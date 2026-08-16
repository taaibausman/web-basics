/* =========================================================
   COMPONENT 1 — BUTTON
   ========================================================= */

function createButton({
    text = "Button",
    variant = "primary",
    onClick = null,
    type = "button"
} = {}) {

    const button = document.createElement("button");

    button.type = type;
    button.textContent = text;

    button.className = `ui-button button-${variant}`;

    if (typeof onClick === "function") {
        button.addEventListener("click", onClick);
    }

    return button;
}


/* =========================================================
   COMPONENT 2 — CARD
   ========================================================= */

function createCard({
    icon = "📦",
    title = "Card Title",
    description = "Card description",
    tag = "Default",
    buttonText = "Learn More",
    onClick = null
} = {}) {

    const card = document.createElement("article");

    card.className = "ui-card";

    card.innerHTML = `
        <div class="card-icon">${icon}</div>

        <h3>${title}</h3>

        <p>${description}</p>

        <div class="card-footer">
            <span class="card-tag">${tag}</span>
        </div>
    `;

    const button = createButton({
        text: buttonText,
        variant: "outline",
        onClick
    });

    card.querySelector(".card-footer").appendChild(button);

    return card;
}


/* =========================================================
   COMPONENT 3 — MODAL
   ========================================================= */

function createModal({
    title = "Modal Title",
    content = "Modal content goes here.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm = null
} = {}) {

    const overlay = document.createElement("div");

    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true">

            <div class="modal-header">
                <h2>${title}</h2>

                <button class="modal-close" aria-label="Close modal">
                    &times;
                </button>
            </div>

            <div class="modal-content">
                ${content}
            </div>

            <div class="modal-actions"></div>

        </div>
    `;

    const modal = overlay.querySelector(".modal");
    const closeButton = overlay.querySelector(".modal-close");
    const actions = overlay.querySelector(".modal-actions");

    const closeModal = () => {
        overlay.classList.remove("active");
    };

    const cancelButton = createButton({
        text: cancelText,
        variant: "secondary",
        onClick: closeModal
    });

    const confirmButton = createButton({
        text: confirmText,
        variant: "primary",
        onClick: () => {

            if (typeof onConfirm === "function") {
                onConfirm();
            }

            closeModal();
        }
    });

    actions.append(cancelButton, confirmButton);

    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const openModal = () => {
        overlay.classList.add("active");
    };

    return {
        element: overlay,
        open: openModal,
        close: closeModal
    };
}


/* =========================================================
   COMPONENT 4 — TOAST
   ========================================================= */

function createToast({
    message = "Notification",
    type = "default",
    duration = 3000
} = {}) {

    let container = document.querySelector(".toast-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close notification">
            &times;
        </button>
    `;

    const removeToast = () => {

        toast.classList.add("removing");

        setTimeout(() => {
            toast.remove();

            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    };

    toast
        .querySelector(".toast-close")
        .addEventListener("click", removeToast);

    container.appendChild(toast);

    setTimeout(removeToast, duration);

    return {
        element: toast,
        close: removeToast
    };
}


/* =========================================================
   DEMO — BUTTON COMPONENT
   ========================================================= */

const buttonDemo = document.querySelector("#button-demo");

const primaryButton = createButton({
    text: "Primary",
    variant: "primary",
    onClick: () => {
        createToast({
            message: "Primary button clicked!",
            type: "success"
        });
    }
});

const secondaryButton = createButton({
    text: "Secondary",
    variant: "secondary",
    onClick: () => {
        createToast({
            message: "Secondary button clicked.",
            type: "default"
        });
    }
});

const successButton = createButton({
    text: "Success",
    variant: "success",
    onClick: () => {
        createToast({
            message: "Success action completed!",
            type: "success"
        });
    }
});

const dangerButton = createButton({
    text: "Delete",
    variant: "danger",
    onClick: () => {
        createToast({
            message: "Delete action triggered.",
            type: "error"
        });
    }
});

buttonDemo.append(
    primaryButton,
    secondaryButton,
    successButton,
    dangerButton
);


/* =========================================================
   DEMO — CARD COMPONENT
   ========================================================= */

const cardDemo = document.querySelector("#card-demo");

const cards = [
    {
        icon: "⚛️",
        title: "Reusable Components",
        description: "Build UI elements once and reuse them throughout your application.",
        tag: "Architecture"
    },
    {
        icon: "🎨",
        title: "Flexible Styling",
        description: "Different variants can change how the same component looks.",
        tag: "Design"
    },
    {
        icon: "⚡",
        title: "Dynamic Behavior",
        description: "Components can receive functions to control their behavior.",
        tag: "JavaScript"
    }
];

cards.forEach((cardData) => {

    const card = createCard({
        ...cardData,
        buttonText: "Select",

        onClick: () => {
            createToast({
                message: `${cardData.title} selected.`,
                type: "success"
            });
        }
    });

    cardDemo.appendChild(card);
});


/* =========================================================
   DEMO — MODAL COMPONENT
   ========================================================= */

const modalDemo = document.querySelector("#modal-demo");

const exampleModal = createModal({
    title: "Reusable Modal",
    content: `
        <p>
            This modal was created using the
            <strong>createModal()</strong> function.
            It can be opened and closed without
            rewriting its HTML structure.
        </p>
    `,
    confirmText: "Continue",
    cancelText: "Cancel",

    onConfirm: () => {
        createToast({
            message: "You clicked Continue!",
            type: "success"
        });
    }
});

document.body.appendChild(exampleModal.element);

const openModalButton = createButton({
    text: "Open Modal",
    variant: "primary",
    onClick: exampleModal.open
});

modalDemo.appendChild(openModalButton);


/* =========================================================
   DEMO — TOAST COMPONENT
   ========================================================= */

const toastButtons = document.querySelector(".toast-buttons");

const successToastButton = createButton({
    text: "Success Toast",
    variant: "success",

    onClick: () => {
        createToast({
            message: "Your changes were saved successfully.",
            type: "success",
            duration: 4000
        });
    }
});

const warningToastButton = createButton({
    text: "Warning Toast",
    variant: "secondary",

    onClick: () => {
        createToast({
            message: "Please review your information.",
            type: "warning",
            duration: 4000
        });
    }
});

const errorToastButton = createButton({
    text: "Error Toast",
    variant: "danger",

    onClick: () => {
        createToast({
            message: "Something went wrong.",
            type: "error",
            duration: 4000
        });
    }
});

const stackToastButton = createButton({
    text: "Show 3 Toasts",
    variant: "outline",

    onClick: () => {

        createToast({
            message: "First notification",
            type: "success",
            duration: 5000
        });

        createToast({
            message: "Second notification",
            type: "warning",
            duration: 5000
        });

        createToast({
            message: "Third notification",
            type: "error",
            duration: 5000
        });
    }
});

toastButtons.append(
    successToastButton,
    warningToastButton,
    errorToastButton,
    stackToastButton
);