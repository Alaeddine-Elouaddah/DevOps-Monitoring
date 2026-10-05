package com.devops.monitoring.service;

import com.devops.monitoring.dto.alert.AlertResponse;
import com.devops.monitoring.entity.Alert;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertService {

    private final AlertRepository alertRepository;

    public Page<AlertResponse> getAllAlerts(Pageable pageable, String severity, Boolean resolved) {
        Alert.AlertSeverity sevEnum = severity != null && !severity.isEmpty() ? Alert.AlertSeverity.valueOf(severity.toUpperCase()) : null;
        return alertRepository.findAlerts(sevEnum, resolved, pageable)
                .map(this::mapToAlertResponse);
    }

    public AlertResponse getAlertById(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id: " + id));
        return mapToAlertResponse(alert);
    }

    public AlertResponse resolveAlert(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id: " + id));
        alert.setResolved(true);
        return mapToAlertResponse(alertRepository.save(alert));
    }

    public void deleteAlert(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id: " + id));
        alertRepository.delete(alert);
    }

    private AlertResponse mapToAlertResponse(Alert alert) {
        return AlertResponse.builder()
                .id(alert.getId())
                .serverId(alert.getServer().getId())
                .serverName(alert.getServer().getName())
                .type(alert.getType())
                .message(alert.getMessage())
                .severity(alert.getSeverity())
                .resolved(alert.getResolved())
                .createdAt(alert.getCreatedAt())
                .build();
    }
}
