package com.devops.monitoring.dto.alert;

import com.devops.monitoring.entity.Alert;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlertResponse {
    private Long id;
    private Long serverId;
    private String serverName;
    private Alert.AlertType type;
    private String message;
    private Alert.AlertSeverity severity;
    private Boolean resolved;
    private LocalDateTime createdAt;
}
