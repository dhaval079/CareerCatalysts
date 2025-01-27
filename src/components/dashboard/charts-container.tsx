import { BarChart2Icon, LineChartIcon, PieChartIcon} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import StatsBarChart from './stats-bar-chart';
import StatsLineChart from './stats-line-chart';
import StatsPieChart from './stats-pie-chart';

export default function ChartsContainer() {
  return (
    <div className="space-y-3 md:space-y-6">
      <h3 className="text-center">Monthly Applications</h3>
      <Tabs defaultValue="bar-chart" className="flex flex-col">
        <TabsList className="mx-auto grid h-fit w-[min(100%,_400px)] grid-cols-3 p-3">
        <TabsTrigger value="pie-chart">
            <div className="flex items-center gap-1">
              <PieChartIcon aria-hidden="true" />
              <span>Pie Chart</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="bar-chart">
            <div className="flex items-center gap-1">
              <BarChart2Icon aria-hidden="true" />
              <span>Bar Chart</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="line-chart">
            <div className="flex items-center gap-1">
              <LineChartIcon aria-hidden="true" />
              <span>Line Chart</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pie-chart">
          <StatsPieChart />
        </TabsContent>
        <TabsContent value="bar-chart">
          <StatsBarChart />
        </TabsContent>
        <TabsContent value="line-chart">
          <StatsLineChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
