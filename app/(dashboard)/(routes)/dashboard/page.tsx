'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chart } from '@prisma/client';
import axios from 'axios';
import { LineChart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [charts, setCharts] = useState<Array<Chart>>([]);
  async function getCharts() {
    try {
      const response = await axios.get('/api/charts');
      console.log(response)
      setCharts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCharts();
  }, []);

  return (
    <div role="Dashboard" className="text-white mx-4">
      <p className="text-2xl tracking-wider font-semibold m-0 p-0 underline">
        Welcome to Worldview!
      </p>
      <Link href="/visualizer">
        <Button className="mt-6">
          <LineChart />
          <p className="ml-2">Visualize Data Here</p>
        </Button>
      </Link>
      {charts[0] ? <div className="mt-6">Or view your saved charts below:</div> : null}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {charts
          ? charts.map((chart: Chart) => (
              <div key={chart.id}>
                <Card className="bg-muted h-full flex flex-col">
                  <CardHeader className="pb-1 pl-4">
                    <CardTitle>{chart.chart!.country}</CardTitle>
                    {/* <CardDescription>{chart.chart!.indicator}</CardDescription> */}
                  </CardHeader>
                  <CardContent className="pb-4 pl-4">
                    <p>
                      {chart.chart!.indicator}: {chart.chart!.labels[0]} -{' '}
                      {chart.chart!.labels[chart.chart!.labels.length - 1]}
                    </p>
                  </CardContent>
                  <div className="flex mt-auto">
                    <Link href={`/visualizer/${chart.id}`}>
                      <Button className="ml-4 mb-4 mt-auto h-8 w-24">
                        View Chart
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Dashboard;
