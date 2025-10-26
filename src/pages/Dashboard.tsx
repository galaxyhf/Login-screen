import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiChartBar,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineFaceSmile,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineMinusCircle,
} from "react-icons/hi2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tipos para os dados
interface MoodStatus {
  status: string;
  percentage: number;
  count: number;
  color: string;
}

interface TeamMood {
  sector: string;
  totalEmployees: number;
  moodDistribution: MoodStatus[];
  averageMood: string;
  trend: string;
}

const Dashboard = () => {
  const [teamMoods, setTeamMoods] = useState<TeamMood[]>([]);
  const [loading, setLoading] = useState(true);

  // Dados de tendência temporal - Contagem de humores ao longo do tempo
  const timelineData = [
    { month: "jul-25", feliz: 45, motivado: 38, neutro: 42, cansado: 28, estressado: 32 },
    { month: "ago-25", feliz: 52, motivado: 48, neutro: 38, cansado: 25, estressado: 22 },
    { month: "set-25", feliz: 58, motivado: 55, neutro: 35, cansado: 22, estressado: 15 },
    { month: "out-25", feliz: 35, motivado: 61, neutro: 42, cansado: 47, estressado: 0 },
    { month: "nov-25", feliz: 42, motivado: 50, neutro: 45, cansado: 35, estressado: 13 },
    { month: "dez-25", feliz: 48, motivado: 58, neutro: 40, cansado: 30, estressado: 9 },
    { month: "jan-26", feliz: 35, motivado: 61, neutro: 42, cansado: 47, estressado: 0 },
  ];

  // Simulação de chamada API
  useEffect(() => {
    setTimeout(() => {
      setTeamMoods([
        {
          sector: "TI",
          totalEmployees: 50,
          moodDistribution: [
            { status: "Feliz", percentage: 10, count: 5, color: "#22c55e" },
            { status: "Motivado", percentage: 5, count: 2, color: "#3b82f6" },
            { status: "Neutro", percentage: 5, count: 3, color: "#94a3b8" },
            { status: "Cansado", percentage: 80, count: 40, color: "#f59e0b" },
            { status: "Estressado", percentage: 0, count: 0, color: "#ef4444" },
          ],
          averageMood: "Cansado",
          trend: "down",
        },
        {
          sector: "RH",
          totalEmployees: 35,
          moodDistribution: [
            { status: "Feliz", percentage: 65, count: 23, color: "#22c55e" },
            { status: "Motivado", percentage: 20, count: 7, color: "#3b82f6" },
            { status: "Neutro", percentage: 10, count: 3, color: "#94a3b8" },
            { status: "Cansado", percentage: 5, count: 2, color: "#f59e0b" },
            { status: "Estressado", percentage: 0, count: 0, color: "#ef4444" },
          ],
          averageMood: "Feliz",
          trend: "up",
        },
        {
          sector: "Vendas",
          totalEmployees: 60,
          moodDistribution: [
            { status: "Feliz", percentage: 15, count: 9, color: "#22c55e" },
            { status: "Motivado", percentage: 70, count: 42, color: "#3b82f6" },
            { status: "Neutro", percentage: 10, count: 6, color: "#94a3b8" },
            { status: "Cansado", percentage: 5, count: 3, color: "#f59e0b" },
            { status: "Estressado", percentage: 0, count: 0, color: "#ef4444" },
          ],
          averageMood: "Motivado",
          trend: "up",
        },
        {
          sector: "Marketing",
          totalEmployees: 40,
          moodDistribution: [
            { status: "Feliz", percentage: 20, count: 8, color: "#22c55e" },
            { status: "Motivado", percentage: 25, count: 10, color: "#3b82f6" },
            { status: "Neutro", percentage: 50, count: 20, color: "#94a3b8" },
            { status: "Cansado", percentage: 5, count: 2, color: "#f59e0b" },
            { status: "Estressado", percentage: 0, count: 0, color: "#ef4444" },
          ],
          averageMood: "Neutro",
          trend: "stable",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <HiOutlineArrowTrendingUp className="w-5 h-5 text-green-500" />;
    if (trend === "down")
      return <HiOutlineArrowTrendingDown className="w-5 h-5 text-red-500" />;
    return <HiOutlineMinusCircle className="w-5 h-5 text-gray-400" />;
  };

  const getMoodIcon = (mood: string) => {
    const isPositive = mood === "Feliz" || mood === "Motivado";
    return isPositive ? (
      <HiOutlineFaceSmile className="w-6 h-6 text-green-500" />
    ) : (
      <HiOutlineFaceSmile className="w-6 h-6 text-gray-400" />
    );
  };

  const totalEmployees = teamMoods.reduce(
    (sum, team) => sum + team.totalEmployees,
    0
  );
  const positiveMoodPercentage = Math.round(
    (teamMoods.reduce((sum, team) => {
      const positive = team.moodDistribution
        .filter((m) => m.status === "Feliz" || m.status === "Motivado")
        .reduce((s, m) => s + m.count, 0);
      return sum + positive;
    }, 0) /
      totalEmployees) *
      100
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <HiChartBar className="w-8 h-8 text-gray-900" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                  Monitoramento de Humor das Equipes
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sair
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Total de Colaboradores
                </p>
                <p className="text-3xl font-semibold text-gray-900">
                  {totalEmployees}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <HiOutlineUsers className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Humor Positivo</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {positiveMoodPercentage}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <HiOutlineFaceSmile className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Setores Monitorados
                </p>
                <p className="text-3xl font-semibold text-gray-900">
                  {teamMoods.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <HiOutlineChartBar className="w-6 h-6 text-gray-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Evolução dos Humores ao Longo do Tempo
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="feliz"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", r: 4 }}
                activeDot={{ r: 8 }}
                name="Feliz"
              />
              <Line
                type="monotone"
                dataKey="motivado"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 8 }}
                name="Motivado"
              />
              <Line
                type="monotone"
                dataKey="neutro"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={{ fill: "#94a3b8", r: 4 }}
                activeDot={{ r: 8 }}
                name="Neutro"
              />
              <Line
                type="monotone"
                dataKey="cansado"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
                activeDot={{ r: 8 }}
                name="Cansado"
              />
              <Line
                type="monotone"
                dataKey="estressado"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4 }}
                activeDot={{ r: 8 }}
                name="Estressado"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamMoods.map((team) => (
            <div
              key={team.sector}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {team.sector}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {team.totalEmployees} colaboradores
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(team.trend)}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getMoodIcon(team.averageMood)}
                  </div>
                </div>
              </div>

              {/* Mood Bars */}
              <div className="space-y-3">
                {team.moodDistribution
                  .filter((mood) => mood.percentage > 0)
                  .map((mood) => (
                    <div key={mood.status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {mood.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {mood.percentage}% ({mood.count})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${mood.percentage}%`,
                            backgroundColor: mood.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Average Mood Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Humor Médio:</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                    {team.averageMood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
