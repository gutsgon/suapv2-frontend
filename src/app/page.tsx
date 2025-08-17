"use client";

// pages/index.tsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type CursoData = {
  nome_curso: string;
  quantidade_disciplinas: number;
};

export default function Home() {
  const [data, setData] = useState<CursoData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3333/disciplinas_por_curso");
        const json = await res.json();

        // Transforma BigInt em number, se necessário
        const parsed = json.map((item: any) => ({
          nome_curso: item.nome_curso,
          quantidade_disciplinas: Number(item.quantidade_disciplinas),
        }));

        setData(parsed);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Disciplinas por Curso</h1>

      <div className="w-full max-w-4xl h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="nome_curso" type="category" />
            <Tooltip />
            <Bar dataKey="quantidade_disciplinas" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
