package com.devops.monitoring.service;

import com.devops.monitoring.dto.metric.MetricResponse;
import com.devops.monitoring.entity.Metric;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.repository.MetricRepository;
import com.devops.monitoring.repository.ServerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetricService {

    private final MetricRepository metricRepository;
    private final ServerRepository serverRepository;

    public List<MetricResponse> getServerMetrics(Long serverId, int limit) {
        if (!serverRepository.existsById(serverId)) {
            throw new ResourceNotFoundException("Server not found with id: " + serverId);
        }
        
        return metricRepository.findByServerIdOrderByTimestampDesc(serverId, PageRequest.of(0, limit))
                .stream()
                .map(this::mapToMetricResponse)
                .collect(Collectors.toList());
    }

    public Optional<MetricResponse> getLatestMetric(Long serverId) {
        if (!serverRepository.existsById(serverId)) {
            throw new ResourceNotFoundException("Server not found with id: " + serverId);
        }
        return metricRepository.findFirstByServerIdOrderByTimestampDesc(serverId)
                .map(this::mapToMetricResponse);
    }

    private MetricResponse mapToMetricResponse(Metric metric) {
        return MetricResponse.builder()
                .id(metric.getId())
                .serverId(metric.getServer().getId())
                .serverName(metric.getServer().getName())
                .cpuUsage(metric.getCpuUsage())
                .memoryUsage(metric.getMemoryUsage())
                .diskUsage(metric.getDiskUsage())
                .networkIn(metric.getNetworkIn())
                .networkOut(metric.getNetworkOut())
                .timestamp(metric.getTimestamp())
                .build();
    }
}
