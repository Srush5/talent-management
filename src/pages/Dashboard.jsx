import React, { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import PageHeader from "../components/common/PageHeader";
import { getCandidatesFromStorage } from "../utils/candidateStorage";
import { getAuthUser } from "../utils/authStorage";
import { formatDate } from "../utils/formatters";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const authUser = getAuthUser();
  const role = authUser?.role || "recruiter";

  useEffect(() => {
    setCandidates(getCandidatesFromStorage());
  }, []);

  const dashboardStats = useMemo(() => {
    const totalCandidates = candidates.length;
    const interviewCount = candidates.filter(
      (candidate) => candidate.status === "Interview"
    ).length;
    const offerCount = candidates.filter(
      (candidate) => candidate.status === "Offer"
    ).length;
    const scheduledCount = candidates.filter(
      (candidate) => candidate.status === "Interview" && candidate.interviewDate
    ).length;

    return [
      {
        id: 1,
        title: "Total Candidates",
        value: totalCandidates,
        icon: <FiUsers />,
      },
      {
        id:2,
        title:"Interview Stage",
        value:interviewCount,
        icon:<FiClock />,
        className:"stat-info"
      },
      {
        id:3,
        title:"Offers Extended",
        value:offerCount,
        icon:<FiCheckCircle />,
        className:"stat-success"
      },
      {
        id:4,
        title:"Scheduled Interviews",
        value:scheduledCount,
        icon:<FiCalendar />,
        className:"stat-danger"
      },
    ];
  }, [candidates]);

  const upcomingInterviews = useMemo(() => {
    return [...candidates]
      .filter(
        (candidate) =>
          candidate.status === "Interview" && candidate.interviewDate
      )
      .sort(
        (a, b) =>
          new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime()
      )
      .slice(0, 5);
  }, [candidates]);

  
  const pipelineChartData = useMemo(() => {
    const stages = ["Screening", "Interview", "Offer", "Rejected"];
    return stages.map((stage) => ({
      name: stage,
      count: candidates.filter((candidate) => candidate.status === stage).length,
    }));
  }, [candidates]);

  const scoreDistributionData = useMemo(() => {
    return [
      {
        name: "80+",
        value: candidates.filter((candidate) => candidate.score >= 80).length,
      },
      {
        name: "60-79",
        value: candidates.filter(
          (candidate) => candidate.score >= 60 && candidate.score < 80
        ).length,
      },
      {
        name: "<60",
        value: candidates.filter((candidate) => candidate.score < 60).length,
      },
    ];
  }, [candidates]);

  const pieColors = ["#6c63ff", "#22c55e", "#f59e0b"];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={
          role === "interviewer"
            ? "Interview schedule and candidate review overview."
            : "Track hiring progress, interview schedules and candidate performance."
        }
      />

      <div className="stats-grid">
        {dashboardStats.map((item) => (
          <div className="card stat-card" key={item.id}>
            <div className="stat-card-top">
              <div>
                <p className="stat-label">{item.title}</p>
                <h3 className="stat-value">{item.value}</h3>
              </div>
              <div className={`stat-icon ${item.className}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-chart-grid section-spacing">
        <div className="card chart-card">
          <div className="card-header-row">
            <div>
            <h3 className="card-title">Candidate Overview</h3>
            <p className="card-subtitle">Hiring stage distribution</p>
          </div>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pipelineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip
                contentStyle={{
                borderRadius:12,
                border:"none"
                }}
                cursor={{fill:"rgba(108,99,255,.08)"}}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} fill="#6c63ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header-row">
            <h3 className="card-title">Score Distribution</h3>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={scoreDistributionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={4}
                >
                  {scoreDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                contentStyle={{
                borderRadius:12,
                border:"none"
                }}
                cursor={{fill:"rgba(108,99,255,.08)"}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid section-spacing">
        <div className="card dashboard-list-card">
          <div className="card-header-row">
            <h3 className="card-title">Upcoming Interviews</h3>
          </div>

          {upcomingInterviews.length > 0 ? (
            <div className="dashboard-list">
              {upcomingInterviews.map((candidate) => (
                <div className="dashboard-list-item" key={candidate.id}>
                  <div>
                    <h4>{candidate.name}</h4>
                    <p>
                      {candidate.role} • {formatDate(candidate.interviewDate)}
                    </p>
                  </div>
                  <span className="dashboard-list-badge">{candidate.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <p>No interviews of candidates scheduled yet.</p>
            </div>
          )}
        </div>

        <div className="card dashboard-list-card">
          <div className="card-header-row">
            <h3 className="card-title">
              {role === "interviewer" ? "Pending Remarks" : "Recent Activity"}
            </h3>
          </div>

          {role === "interviewer" ? (
            <div className="dashboard-list">
              {candidates
                .filter(
                  (candidate) =>
                    candidate.status === "Interview" &&
                    (!candidate.interviewerRemarks ||
                      candidate.interviewerRemarks.trim() === "")
                )
                .slice(0, 5)
                .map((candidate) => (
                  <div className="dashboard-list-item" key={candidate.id}>
                    <div>
                      <h4>{candidate.name}</h4>
                      <p>{candidate.role}</p>
                    </div>
                    <span className="dashboard-list-badge warning-badge">
                      Add remarks
                    </span>
                  </div>
                ))}

              {candidates.filter(
                (candidate) =>
                  candidate.status === "Interview" &&
                  (!candidate.interviewerRemarks ||
                    candidate.interviewerRemarks.trim() === "")
              ).length === 0 && (
                <div className="empty-state-box">
                  <p>No pending interview remarks.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="dashboard-list">
              {[...candidates].reverse().slice(0,5).map((candidate) => (
                <div className="dashboard-list-item" key={candidate.id}>
                  <div>
                    <h4>{candidate.name}</h4>
                    <p>{candidate.role}</p>
                  </div>
                  <span className="dashboard-list-badge">{candidate.status}</span>
                </div>
              ))}

              {candidates.length === 0 && (
                <div className="empty-state-box">
                  <p>No candidates available.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;