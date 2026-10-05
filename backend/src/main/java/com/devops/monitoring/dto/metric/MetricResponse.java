package com.devops.monitoring.dto.metric;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricResponse {
    private Long id;
    private Long serverId;
    private String serverName;
    private Double cpuUsage;
    private Double memoryUsage;
    private Double diskUsage;
    private Double networkIn;
    private Double networkOut;
    private LocalDateTime timestamp;
}
