package com.devops.monitoring.service;

import com.devops.monitoring.dto.dashboard.DashboardSummary;
import com.devops.monitoring.entity.Alert;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.repository.AlertRepository;
import com.devops.monitoring.repository.MetricRepository;
import com.devops.monitoring.repository.ServerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ServerRepository serverRepository;
    private final AlertRepository alertRepository;
    private final MetricRepository metricRepository;

    public DashboardSummary getSummary() {
        long totalServers = serverRepository.count();
        long onlineServers = serverRepository.countByStatus(Server.ServerStatus.ONLINE);
        long offlineServers = serverRepository.countByStatus(Server.ServerStatus.OFFLINE);
        long warningServers = serverRepository.countByStatus(Server.ServerStatus.WARNING);
        
        long criticalAlerts = alertRepository.countByResolvedFalseAndSeverity(Alert.AlertSeverity.CRITICAL);
        long unresolvedAlerts = alertRepository.countByResolvedFalse();

        Double avgCpu = metricRepository.getAverageCpuUsage();
        Double avgMem = metricRepository.getAverageMemoryUsage();
        Double avgDisk = metricRepository.getAverageDiskUsage();

        return DashboardSummary.builder()
                .totalServers(totalServers)
                .onlineServers(onlineServers)
                .offlineServers(offlineServers)
                .warningServers(warningServers)
                .criticalAlerts(criticalAlerts)
                .unresolvedAlerts(unresolvedAlerts)
                .averageCpu(avgCpu != null ? avgCpu : 0.0)
                .averageMemory(avgMem != null ? avgMem : 0.0)
                .averageDisk(avgDisk != null ? avgDisk : 0.0)
                .build();
    }
}
