import React, { useEffect, useState } from "react";
import {
  Title,
  FlexBox,
  BusyIndicator,
  MessageStrip,
  Card,
  CardHeader,
  Icon,
} from "@ui5/webcomponents-react";
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import {
  AvgPremiumByStatus,
  DailyPropositionCount,
  PropositionStatus,
} from "../types/types";
import { formatCurrency } from "@utils/formatters";
import "@ui5/webcomponents-icons/dist/line-chart";
import "@ui5/webcomponents-icons/dist/bar-chart";
import "@ui5/webcomponents-icons/dist/product";
import "@ui5/webcomponents-icons/dist/activities";
import { analyticsApi, propositionsApi } from "mockData";

const Dashboard: React.FC = () => {
  const [avgPremiumData, setAvgPremiumData] = useState<AvgPremiumByStatus[]>([
    { status: PropositionStatus.ACTIVE, averagePremium: 165.5 },
    { status: PropositionStatus.DRAFT, averagePremium: 142.75 },
    { status: PropositionStatus.INACTIVE, averagePremium: 175.0 },
  ]);
  const [dailyCountData, setDailyCountData] = useState<DailyPropositionCount[]>(
    [
      { date: "2026-01-10", count: 1 },
      { date: "2026-01-11", count: 1 },
      { date: "2026-01-12", count: 1 },
    ],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalPropositions: 10,
    activePropositions: 6,
    totalPlans: 25,
    avgPremium: 165.5,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [avgPremium, dailyCount, allProps] = await Promise.all([
        analyticsApi.getAvgPremiumByStatus(),
        analyticsApi.getDailyPropositionCount(),
        propositionsApi.getAll({ size: 1000 }), // Get all for stats
      ]);

      setAvgPremiumData(avgPremium);
      setDailyCountData(dailyCount);

      // Calculate stats
      const totalPropositions = allProps.totalElements;
      const activePropositions = allProps.content.filter(
        (p) => p.status === "ACTIVE",
      ).length;
      const totalPlans = allProps.content.reduce(
        (sum, p) => sum + p.planCount,
        0,
      );
      const avgPremiumValue =
        avgPremium.length > 0
          ? avgPremium.reduce((sum, item) => sum + item.averagePremium, 0) /
            avgPremium.length
          : 0;

      setStats({
        totalPropositions,
        activePropositions,
        totalPlans,
        avgPremium: avgPremiumValue,
      });

      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <FlexBox
        justifyContent="Center"
        alignItems="Center"
        style={{ height: "400px" }}
      >
        <BusyIndicator active size="L" />
      </FlexBox>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <MessageStrip design="Negative">{error}</MessageStrip>
      </div>
    );
  }

  const barChartData = avgPremiumData.map((item) => ({
    status: item.status,
    avgPremium: parseFloat(item.averagePremium.toFixed(2)),
  }));

  const lineChartData = dailyCountData.map((item) => ({
    date: item.date,
    count: item.count,
  }));

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <Title level="H2" style={{ margin: 0, color: "#0a6ed1" }}>
            📊 Analytics Dashboard
          </Title>
          <p style={{ margin: "0.5rem 0 0 0", color: "#6a6a6a" }}>
            Real-time insights into your insurance propositions
          </p>
        </div>
      </FlexBox>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          icon="product"
          title="Total Propositions"
          value={stats.totalPropositions.toString()}
          color="#0a6ed1"
          subtitle="All insurance products"
        />
        <StatCard
          icon="activities"
          title="Active Products"
          value={stats.activePropositions.toString()}
          color="#2ca02c"
          subtitle="Currently available"
        />
        <StatCard
          icon="line-chart"
          title="Total Plans"
          value={stats.totalPlans.toString()}
          color="#ff6f00"
          subtitle="Coverage options"
        />
        <StatCard
          icon="bar-chart"
          title="Avg Premium"
          value={formatCurrency(stats.avgPremium)}
          color="#9c27b0"
          subtitle="Across all plans"
        />
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Bar Chart Card */}
        <Card
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <CardHeader
            titleText="Average Premium by Status"
            subtitleText="Compare average premiums across different proposition statuses"
            avatar={<Icon name="bar-chart" />}
            style={{ backgroundColor: "#f8f9fa", padding: "1.5rem" }}
          />
          <div style={{ padding: "1.5rem" }}>
            {barChartData.length > 0 ? (
              <BarChart
                dataset={barChartData}
                dimensions={[{ accessor: "status" }]}
                measures={[
                  {
                    accessor: "avgPremium",
                    label: "Average Premium ($)",
                    formatter: (val: number) => formatCurrency(val),
                  },
                ]}
                style={{ height: "350px" }}
              />
            ) : (
              <div
                style={{ textAlign: "center", padding: "3rem", color: "#999" }}
              >
                No data available
              </div>
            )}
          </div>
        </Card>

        {/* Line Chart Card */}
        <Card
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <CardHeader
            titleText="Daily Proposition Creation"
            subtitleText="Track new propositions created over time"
            avatar={<Icon name="line-chart" />}
            style={{ backgroundColor: "#f8f9fa", padding: "1.5rem" }}
          />
          <div style={{ padding: "1.5rem" }}>
            {lineChartData.length > 0 ? (
              <LineChart
                dataset={lineChartData}
                dimensions={[
                  {
                    accessor: "date",
                    formatter: (val: string) =>
                      new Date(val).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      }),
                  },
                ]}
                measures={[
                  { accessor: "count", label: "Propositions Created" },
                ]}
                style={{ height: "350px" }}
              />
            ) : (
              <div
                style={{ textAlign: "center", padding: "3rem", color: "#999" }}
              >
                No data available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Insights Section */}
      <div style={{ marginTop: "2rem" }}>
        <Card
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "12px",
          }}
        >
          <CardHeader
            titleText="💡 Quick Insights"
            style={{ backgroundColor: "#fff9e6", padding: "1.5rem" }}
          />
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "grid", gap: "1rem" }}>
              <InsightItem
                text={`You have ${stats.activePropositions} active propositions generating revenue.`}
                type="success"
              />
              <InsightItem
                text={`Average ${(stats.totalPlans / stats.totalPropositions).toFixed(1)} plans per proposition.`}
                type="info"
              />
              <InsightItem
                text={`Most recent activity: ${dailyCountData[dailyCountData.length - 1]?.count || 0} propositions created today.`}
                type="neutral"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  color: string;
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  color,
  subtitle,
}) => {
  return (
    <Card
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
        border: `2px solid ${color}20`,
      }}
      onMouseEnter={(e: any) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e: any) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ padding: "1.5rem" }}>
        <FlexBox alignItems="Center" style={{ marginBottom: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: `${color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
            }}
          >
            <Icon name={icon} style={{ color, fontSize: "24px" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6a6a6a",
                marginBottom: "0.25rem",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: "bold", color }}>
              {value}
            </div>
          </div>
        </FlexBox>
        <div style={{ fontSize: "0.75rem", color: "#999" }}>{subtitle}</div>
      </div>
    </Card>
  );
};

// ============================================
// Insight Item Component
// ============================================

interface InsightItemProps {
  text: string;
  type: "success" | "info" | "neutral";
}

const InsightItem: React.FC<InsightItemProps> = ({ text, type }) => {
  const colors = {
    success: "#2ca02c",
    info: "#0a6ed1",
    neutral: "#6a6a6a",
  };

  return (
    <FlexBox alignItems="Center" style={{ gap: "0.75rem" }}>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: colors[type],
          flexShrink: 0,
        }}
      />
      <span style={{ color: "#333", fontSize: "0.95rem" }}>{text}</span>
    </FlexBox>
  );
};

export default Dashboard;
