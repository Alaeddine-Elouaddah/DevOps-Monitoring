package com.devops.monitoring.dto.server;

import com.devops.monitoring.entity.Server;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServerResponse {
    private Long id;
    private String name;
    private String hostname;
    private String ipAddress;
    private String operatingSystem;
    private Server.Environment environment;
    private Server.ServerStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    private Double latestCpu;
    private Double latestMemory;
    private Double latestDisk;
}
