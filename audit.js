export function getPendingAudits(token) {
    const auditButton = document.getElementById('auditButton');
    const auditDropdown = document.getElementById('auditDropdown');
    let isOpen = false;

    // Toggle dropdown
    auditButton.addEventListener('click', function (e) {
        e.stopPropagation();
        isOpen = !isOpen;

        if (isOpen) {
            auditDropdown.classList.add('show');
            auditButton.classList.add('active');
        } else {
            auditDropdown.classList.remove('show');
            auditButton.classList.remove('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!auditDropdown.contains(e.target) && !auditButton.contains(e.target)) {
            auditDropdown.classList.remove('show');
            auditButton.classList.remove('active');
            isOpen = false;
        }
    });

}