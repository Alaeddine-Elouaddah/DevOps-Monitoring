package com.devops.monitoring.controller;

import com.devops.monitoring.dto.metric.MetricResponse;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.service.MetricService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servers/{id}/metrics")
@RequiredArgsConstructor
public class MetricController {

    private final MetricService metricService;

    @GetMapping
    public ResponseEntity<List<MetricResponse>> getServerMetrics(
            @PathVariable Long id,
            @RequestParam(defaultValue = "20") int limit) {
        return ResponseEntity.ok(metricService.getServerMetrics(id, limit));
    }

    @GetMapping("/latest")
    public ResponseEntity<MetricResponse> getLatestMetric(@PathVariable Long id) {
        return ResponseEntity.ok(metricService.getLatestMetric(id)
                .orElseThrow(() -> new ResourceNotFoundException("No metrics found for server: " + id)));
    }
}
