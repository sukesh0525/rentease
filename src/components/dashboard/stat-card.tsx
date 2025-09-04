import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

type StatCardProps = {
    title: string;
    value: string;
    icon: ReactNode;
    change?: string;
    changeColor?: string;
};

export function StatCard({ title, value, icon, change, changeColor }: StatCardProps) {
    return (
        <Card className="stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && <p className={`text-xs ${changeColor}`}>{change}</p>}
            </CardContent>
        </Card>
    );
}
