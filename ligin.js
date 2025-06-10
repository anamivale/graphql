import { transaction } from "./data/transaction.js";
import { User } from "./data/user.js";

function login() {

  document.getElementById('login').addEventListener('click', async () => {
    const usernameOrEmail = document.getElementById('uname').value;
    const password = document.getElementById('password').value;

    // Encode credentials in base64
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

  FetchUserData()
  FetchTransactionData()

})


function FetchUserData() {
  let user = User.data.user[0]
let fullname = `${user.attrs.firstName} ${user.attrs.middleName} ${user.attrs.lastName}`
  if(user.attrs.middleName == "NA"){
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



function FetchTransactionData() {

  let transactions = transaction.data.transaction


  let level
  let skill_front_end
  let skill_go
  let skill_algo
  let skill_back_end
  let skill_js
  let skill_unix
  let skill_game
  let skill_prog = 0
  let skill_css
  let skill_html
  let skill_ai
  let xp = new Array()
  let up_audit = new Array()
  let down_audit = new Array()

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].eventId == 75) {

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
        level = transactions[i].amount
      }
      if (transactions[i].type == "skill_front-end") {
        skill_front_end = transactions[i].amount
      }
      if (transactions[i].type == "skill_back-end") {
        skill_back_end = transactions[i].amount
      }
      if (transactions[i].type == "skill_go") {
        skill_go = transactions[i].amount
      }
     
     
      if (transactions[i].type == "skill_js") {
        skill_js = transactions[i].amount
      }
    
      if (transactions[i].type == "skill_prog") {
        skill_prog = Math.max(Number(transactions[i].amount), skill_prog)
      }
    


    }


  }

  //skills ui
  document.getElementById("pro").textContent= skill_prog + "%"
  document.getElementById("go").textContent= skill_go + "%"
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
  document.getElementById("xp").textContent = (sumXp/(1000000)).toFixed(2)


  let sumDownRatio = down_audit.reduce((acc, val) => acc + val, 0)

  let sumUpRatio = up_audit.reduce((acc, val) => acc + val, 0)
  console.log(sumDownRatio, sumUpRatio);

  let auditRatio = (sumUpRatio / 1024) / (sumDownRatio / 1024);

}
