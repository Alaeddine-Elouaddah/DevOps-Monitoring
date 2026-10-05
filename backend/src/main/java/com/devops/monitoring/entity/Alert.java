package com.devops.monitoring.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "server_id")
    private Server server;

    @Enumerated(EnumType.STRING)
    private AlertType type;

    private String message;

    @Enumerated(EnumType.STRING)
    private AlertSeverity severity;

    @Builder.Default
    private Boolean resolved = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum AlertType {
        CPU, MEMORY, DISK, SERVER, NETWORK
    }

    public enum AlertSeverity {
        INFO, WARNING, CRITICAL
    }
}
