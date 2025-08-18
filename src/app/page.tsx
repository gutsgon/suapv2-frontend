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
        const res = await fetch("http://localhost:3333/api/disciplinas_por_curso");
        const json = await res.json();

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
      {/* Container centralizado com grid */}
      <div className="w-full max-w-4xl grid grid-rows-[auto_1fr] place-items-center gap-4">
        {/* Título centralizado */}
        <h2 style={{ textAlign: 'center', color: '#111111ff' }}>Quantidade de Disciplinas por Curso</h2>

        {/* Gráfico */}
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // remove deslocamento extra
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="nome_curso"
                type="category"
                width={150} // espaço fixo para os nomes dos cursos
              />
              <Tooltip />
              <Bar dataKey="quantidade_disciplinas" fill="#6366f1" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
