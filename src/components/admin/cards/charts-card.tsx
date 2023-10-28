import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupOrder } from "@/types";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ChartsCardProps = {
  groupOrders: GroupOrder[];
};

export default function ChartsCard({
  groupOrders,
}: ChartsCardProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            width={500}
            height={300}
            data={groupOrders}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) =>
                new Intl.DateTimeFormat("id-ID", {
                  month: "short",
                }).format(new Date(value))
              }
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("id-ID").format(value)
              }
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="total_paid_order_table"
              name="Meja Dibayar"
              stackId="a"
              fill="#18e733"
            />
            <Bar
              dataKey="total_unpaid_order_table"
              name="Meja Belum Dibayar"
              stackId="a"
              fill="#db321c"
            />
            <Bar
              dataKey="total_paid_order_item"
              name="F&B Dibayar"
              stackId="a"
              fill="#fbff00"
            />
            <Bar
              dataKey="total_unpaid_order_item"
              name="F&B belum Dibayar"
              stackId="a"
              fill="#ffaa00"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
