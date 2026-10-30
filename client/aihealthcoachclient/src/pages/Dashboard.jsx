import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <div className="logo-icon">♥</div>
          <div>
            <h2>AI Health</h2>
            <span>COACH</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>♙</span>
            Profile
          </button>

          <button className="nav-item">
            <span>◈</span>
            Progress
          </button>

          <button className="nav-item">
            <span>🥗</span>
            Nutrition
          </button>

          <button className="nav-item">
            <span>🏃</span>
            Activity
          </button>

          <button className="nav-item">
            <span>🤖</span>
            AI Coach
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button className="nav-item">
            <span>⚙</span>
            Settings
          </button>

          <button
            className="nav-item logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <header className="dashboard-topbar">

          <div className="mobile-logo">
            AI HEALTH COACH
          </div>

          <div className="topbar-right">

            <button className="notification-btn">
              🔔
              <span></span>
            </button>

            <div className="user-profile">

              <div className="avatar">
                S
              </div>

              <div className="user-info">
                <strong>Saurabh</strong>
                <small>Health Member</small>
              </div>

            </div>

          </div>

        </header>


        {/* CONTENT */}

        <section className="dashboard-content">

          {/* GREETING */}

          <div className="welcome-section">

            <div>
              <p className="welcome-small">
                GOOD MORNING ☀️
              </p>

              <h1>
                Good Morning, Saurabh <span>👋</span>
              </h1>

              <p>
                Here's your health overview for today.
              </p>
            </div>

            <button className="date-btn">
              📅 Today
            </button>

          </div>


          {/* STAT CARDS */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-top">
                <div className="stat-icon weight-icon">
                  ⚖️
                </div>

                <span className="stat-arrow">
                  ↗
                </span>
              </div>

              <p>Weight</p>

              <h2>
                72 <span>kg</span>
              </h2>

              <small className="positive">
                ↓ 0.8 kg this month
              </small>

            </div>


            <div className="stat-card">

              <div className="stat-top">
                <div className="stat-icon bmi-icon">
                  📊
                </div>

                <span className="stat-arrow">
                  ↗
                </span>
              </div>

              <p>BMI</p>

              <h2>
                23.4
              </h2>

              <small className="normal">
                ● Normal range
              </small>

            </div>


            <div className="stat-card">

              <div className="stat-top">
                <div className="stat-icon water-icon">
                  💧
                </div>

                <span className="stat-arrow">
                  ↗
                </span>
              </div>

              <p>Water</p>

              <h2>
                1.8 <span>L</span>
              </h2>

              <small>
                90% of daily goal
              </small>

              <div className="mini-progress">
                <div style={{ width: "90%" }}></div>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-top">
                <div className="stat-icon steps-icon">
                  👟
                </div>

                <span className="stat-arrow">
                  ↗
                </span>
              </div>

              <p>Steps</p>

              <h2>
                6,240
              </h2>

              <small>
                78% of daily goal
              </small>

              <div className="mini-progress">
                <div style={{ width: "78%" }}></div>
              </div>

            </div>

          </div>


          {/* MIDDLE SECTION */}

          <div className="middle-grid">

            {/* WEEKLY PROGRESS */}

            <div className="dashboard-card progress-card">

              <div className="card-header">

                <div>
                  <h3>Weekly Progress</h3>
                  <p>Your activity this week</p>
                </div>

                <button className="card-filter">
                  This Week ▾
                </button>

              </div>


              {/* Fake Chart */}

              <div className="chart">

                <div className="chart-y-axis">
                  <span>10k</span>
                  <span>7.5k</span>
                  <span>5k</span>
                  <span>2.5k</span>
                  <span>0</span>
                </div>

                <div className="chart-area">

                  <div className="chart-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <svg
                    className="chart-svg"
                    viewBox="0 0 600 220"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopOpacity="0.35"
                        />

                        <stop
                          offset="100%"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 165
                         C40 145, 60 155, 90 130
                         S145 110, 180 125
                         S230 150, 270 105
                         S330 90, 365 115
                         S420 80, 455 95
                         S510 70, 545 85
                         S580 50, 600 65
                         L600 220
                         L0 220 Z"
                      fill="url(#chartGradient)"
                    />

                    <path
                      d="M0 165
                         C40 145, 60 155, 90 130
                         S145 110, 180 125
                         S230 150, 270 105
                         S330 90, 365 115
                         S420 80, 455 95
                         S510 70, 545 85
                         S580 50, 600 65"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>

                  <div className="chart-days">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                </div>

              </div>

            </div>


            {/* AI COACH */}

            <div className="dashboard-card ai-card">

              <div className="ai-header">

                <div className="ai-icon">
                  🤖
                </div>

                <div>
                  <h3>AI Health Coach</h3>
                  <span>Personalized insight</span>
                </div>

              </div>


              <div className="ai-message">

                <p>
                  You're doing great, Saurabh! 🎉
                </p>

                <span>
                  You've completed 78% of your daily
                  activity goal. Keep moving and try
                  to drink another 200ml of water today.
                </span>

              </div>


              <button className="ai-btn">
                Talk to AI Coach
                <span>→</span>
              </button>

            </div>

          </div>


          {/* TODAY'S GOALS */}

          <div className="dashboard-card goals-card">

            <div className="card-header">

              <div>
                <h3>Today's Goals</h3>
                <p>Small steps create big changes</p>
              </div>

              <span className="goal-count">
                1 / 3 completed
              </span>

            </div>


            <div className="goals-list">

              <div className="goal-item completed">

                <div className="goal-check">
                  ✓
                </div>

                <div className="goal-info">
                  <strong>Drink 2L water</strong>
                  <span>1.8L completed</span>
                </div>

                <span className="goal-status">
                  Completed
                </span>

              </div>


              <div className="goal-item">

                <div className="goal-check empty">
                  ✓
                </div>

                <div className="goal-info">
                  <strong>Walk 8,000 steps</strong>
                  <span>6,240 steps completed</span>
                </div>

                <span className="goal-percentage">
                  78%
                </span>

              </div>


              <div className="goal-item">

                <div className="goal-check empty">
                  ✓
                </div>

                <div className="goal-info">
                  <strong>Exercise for 30 minutes</strong>
                  <span>0 minutes completed</span>
                </div>

                <span className="goal-percentage">
                  0%
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;