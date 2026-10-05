package com.devops.monitoring.dto.server;

import com.devops.monitoring.entity.Server;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ServerRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String hostname;

    @NotBlank
    private String ipAddress;

    @NotBlank
    private String operatingSystem;

    @NotNull
    private Server.Environment environment;

    @NotNull
    private Server.ServerStatus status;
}
