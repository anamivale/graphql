export function loginPage(){
    return `
        <div class="login-container" id="login-container">
        <div class="screen">
            <div class="screen__content">
                <div class="login">
                    <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" class="login__input" placeholder="User name / Email" id="uname">
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-lock"></i>
                        <input type="password" class="login__input" id="password" placeholder="Password">
                    </div>
                    <button class="button login__submit" id="login">
                        <span class="button__text">Log In Now</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="screen__background">
                <span class="screen__background__shape screen__background__shape4"></span>
                <span class="screen__background__shape screen__background__shape3"></span>
                <span class="screen__background__shape screen__background__shape2"></span>
                <span class="screen__background__shape screen__background__shape1"></span>
            </div>
        </div>
    </div>
   
    `
}


export function dashboardPage(){
    return `
 <div class="container">
        <!-- Profile Container -->
        <div class="profile-container">
            <div class="profile-info">
                <h2 id="name">Valeria Na Muhembele</h2>
                <p><strong>Username:</strong> <span id="username"></span></p>
                <p><strong>Phone:</strong><span id="phone"></span> </p>
                <p><strong>Email:</strong> <span id="email"></span></p>
                <p><strong>Birth Date:</strong><span id="dob"></span></p>
                <p><strong>Gender:</strong><span id="gender"></span></p>
                <p><strong>Country:</strong><span id="country"></span></p>
            </div>
        </div>

        <!-- Performance Dashboard -->
        <h2 class="section-title" style="margin-top: 40px;">Performance Dashboard</h2>
        <div class="grid grid-3">
            <div class="card center">
                <div class="label">XP Earned</div>
                <div class="value" id="xp"></div>
            </div>
            <div class="card center">
                <div class="label">Level & Rank</div>
                <div class="value" id="level"></div>
                <div class="label" id="rank"></div>
            </div>
            <div class="card center">
                <div class="label">Grade</div>
                <div class="value" id="grade"></div>
            </div>
        </div>

        <!-- XP Chart -->
        <h2 class="section-title" style="margin-top: 40px;">XP Progression</h2>
        <div class="card xp-chart">
            Chart Placeholder
        </div>

        <!-- Best Skills + Audit -->
        <div class="grid grid-2" style="margin-top: 40px;">
            <div class="card">
                <h3 class="section-title">Best Skills</h3>
                <ul class="skills-list">
                    <li><span>Programming</span> <span id="pro"></span></li>
                    <li><span>Go</span> <span id="go"></span></li>
                    <li><span>Front-end</span> <span id="front_end"></span></li>
                    <li><span>Javascropt</span> <span id="js"></span></li>
                    <li><span>Back-end</span> <span id="back_end"></span></li>
                </ul>
            </div>
            <div class="card">
                <h3 class="section-title">Audit Ratio</h3>
                <div class="audit-chart">
                    Audit Ratio: 0.9<br>
                    Done: 2.05MB (47.1%)<br>
                    Received: 2.30MB (52.9%)
                </div>
            </div>
        </div>
    </div>
    `
}