import { dashboardPage, loginPage } from "./templates.js";

function login() {
    document.getElementById("body").innerHTML = loginPage()

    document.getElementById('login').addEventListener('click', async () => {
        const usernameOrEmail = document.getElementById('uname').value;
        const password = document.getElementById('password').value;

        const encoded = btoa(`${usernameOrEmail}:${password}`);

        try {
            const response = await fetch('https://learn.zone01kisumu.ke/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encoded}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                console.log('JWT:', data);
                localStorage.setItem('jwt', data);

                await queryUserTable()
            } else {
                alert(`Login failed: ${data.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            alert('Network error: ' + error.message);
            console.error(error);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('jwt');
    if (token) {
        queryUserTable()
    } else {
        login()

    }


})


async function queryUserTable() {
    const token = localStorage.getItem('jwt');
    document.getElementById("body").innerHTML = dashboardPage()


    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        {
          user {
            login
            email
            createdAt
            campus
            attrs
          }
        }
      `
        })
    });

    const data1 = await response.json();

    const user = data1.data.user[0];
    FetchUserData(user)
    await FetchTransactionData(token)

}


function FetchUserData(user) {
    let fullname = `${user.attrs.firstName} ${user.attrs.middleName} ${user.attrs.lastName}`
    if (user.attrs.middleName == "NA") {
        fullname = `${user.attrs.firstName} ${user.attrs.lastName}`
    }

    //profile
    document.getElementById("name").textContent = fullname
    document.getElementById("username").textContent = user.login
    document.getElementById("phone").textContent = user.attrs.phone
    document.getElementById("email").textContent = user.attrs.email
    document.getElementById("dob").textContent = user.attrs.dateOfBirth
    document.getElementById("gender").textContent = user.attrs.gender
    document.getElementById("country").textContent = user.attrs.country


}



async function FetchTransactionData(token) {


    const response = await fetch('https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        {
  transaction(where: {eventId: {_eq: 75}}, order_by: {createdAt: desc}) {
           type
           amount
           path
           createdAt
           eventId
           grade
          }
        }
      `
        })
    });

    const data = await response.json();
    let transactions = data.data.transaction
    let level = 0
    let skill_front_end =0
    let skill_go=0
    let skill_back_end=0
    let skill_js=0
    let skill_prog = 0
    let xp = new Array()
    let up_audit = new Array()
    let down_audit = new Array()

    for (let i = 0; i < transactions.length; i++) {


            if (transactions[i].type == "xp") {

                xp.push(transactions[i].amount)

            }
            if (transactions[i].type == "up") {
                up_audit.push(transactions[i].amount)

            }
            if (transactions[i].type == "down") {
                down_audit.push(transactions[i].amount)

            }

            if (transactions[i].type == "level") {
                
                level =Math.max(Number(transactions[i].amount), level)
            }
            if (transactions[i].type == "skill_front-end") {
                skill_front_end = Math.max(Number(transactions[i].amount), skill_front_end)
            }
            if (transactions[i].type == "skill_back-end") {
                skill_back_end = Math.max(Number(transactions[i].amount), skill_back_end)
            }
            if (transactions[i].type == "skill_go") {
                skill_go = Math.max(Number(transactions[i].amount), skill_go)
            }


            if (transactions[i].type == "skill_js") {
                skill_js = Math.max(Number(transactions[i].amount), skill_js)
            }

            if (transactions[i].type == "skill_prog") {
                skill_prog = Math.max(Number(transactions[i].amount), skill_prog)
            }
        
    }

    //skills ui
    document.getElementById("pro").textContent = skill_prog + "%"
    document.getElementById("go").textContent = skill_go + "%"
    document.getElementById("js").textContent = skill_js + "%"
    document.getElementById("back_end").textContent = skill_back_end + "%"
    document.getElementById("front_end").textContent = skill_front_end + "%"


    let rank = document.getElementById("rank")
    document.getElementById("level").textContent = level

    if (level >= 0 && level < 10) {
        rank.textContent = "Aspiring Developer "
    } else if (level >= 10 && level < 20) {
        rank.textContent = "Beginner Developer "
    } else if (level >= 20 && level < 30) {
        rank.textContent = "Apprentice Developer "
    } else if (level >= 30 && level < 40) {
        rank.textContent = "Assistant Developer "
    } else if (level >= 40 && level < 50) {
        rank.textContent = "Basic Developer "
    } else if (level >= 50 && level < 55) {
        rank.textContent = "Junior Developer "
    } else if (level >= 55 && level < 60) {
        rank.textContent = "Confirmed Developer "
    } else if (level >= 60) {
        rank.textContent = "Full-stack Developer "
    }

    //xp
    let sumXp = xp.reduce((acc, val) => acc + val, 0)
    console.log(sumXp / 1024);
    document.getElementById("xp").textContent = (sumXp / (1000000)).toFixed(2)


    let sumDownRatio = down_audit.reduce((acc, val) => acc + val, 0)

    let sumUpRatio = up_audit.reduce((acc, val) => acc + val, 0)

    let auditRatio = (sumUpRatio / 1024) / (sumDownRatio / 1024);

}
