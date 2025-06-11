export async function getPendingAudits(token) {

    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        {
            audit(order_by: {createdAt: desc}, where: {closedAt: {_is_null: true}, private : {}}) {
                private {
                code
                }
                group{
                captain {
                    login
                }
                path
                }
            }
        }
      `
        })
    });

    const resData = await response.json();
    const data = resData.data.audit

    document.getElementById("total").textContent = data.length

    let audit_section = document.getElementById("audit-section")

    data.forEach(element => {

        let item = document.createElement("div")
        item.classList.add("audit-item")

        let title = document.createElement("div")
        title.classList.add("audit-title")
        title.textContent = `Project: ${element.group.path.split("/").pop()}`

        let captain = document.createElement("div")
        captain.classList.add("audit-title")
        captain.textContent = `Captain: ${element.group.captain.login}`

        let code = document.createElement("div")
        code.classList.add("audit-title")
        code.textContent = `Code: ${element.private.code}`



        audit_section.appendChild(item)
        item.appendChild(title)
        item.appendChild(captain)
        item.appendChild(code)
    });





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