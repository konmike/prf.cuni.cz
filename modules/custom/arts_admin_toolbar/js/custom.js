(function ($) {
    $(document).ready(function () {
        const targetNode = document.getElementById(
            "edit-field-content-blocks-wrapper"
        );

        if (targetNode) {
            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        const layout = document.querySelector(
                            'select[data-drupal-selector*="field-documents-layout"]'
                        );
                        const pocetDlazdic = document.querySelector(
                            '[data-drupal-selector*="field-pocet-dlazdic-na-radek-wrapper"]'
                        );

                        if (layout) {
                            if (layout.value === "dlazdice") {
                                if (pocetDlazdic) {
                                    pocetDlazdic.style.display = "block";
                                }
                            }

                            layout.addEventListener("change", function () {
                                if (layout.value === "dlazdice") {
                                    if (pocetDlazdic) {
                                        pocetDlazdic.style.display = "block";
                                    }
                                } else {
                                    if (pocetDlazdic) {
                                        pocetDlazdic.style.display = "none";
                                    }
                                }
                            });
                        }
                    }
                }
            };

            const observer = new MutationObserver(callback);

            observer.observe(targetNode, config);

            $(window).on("unload", function () {
                observer.disconnect();
            });
        }
    });
})(jQuery);
