import GanttChart from "@/components/GhanttChart/GhanttChart";
import Head from "next/head";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setData] = useState();

  async function FetchData(params) {
    await fetch(`${process.env.NEXT_PUBLIC_API}`)
      .then((response) => response.json())
      .then((data) => {
        // Process the JSON data
        setData(data?.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  }

  console.log("data", data);
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Gantt Chart</title>
        <meta name="description" content="Ghantt Chart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Gantt Tracker</h1>
        <GanttChart />
      </main>
      <style jsx>{`
        .main {
          min-height: 100vh;
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}
