package com.devops.monitoring.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummary {
    private long totalServers;
    private long onlineServers;
    private long offlineServers;
    private long warningServers;
    
    private long criticalAlerts;
    private long unresolvedAlerts;
    
    private Double averageCpu;
    private Double averageMemory;
    private Double averageDisk;
}
