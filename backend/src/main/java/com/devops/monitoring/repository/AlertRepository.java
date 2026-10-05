package com.devops.monitoring.repository;

import com.devops.monitoring.entity.Alert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    @Query("SELECT a FROM Alert a WHERE " +
            "(:severity IS NULL OR a.severity = :severity) AND " +
            "(:resolved IS NULL OR a.resolved = :resolved)")
    Page<Alert> findAlerts(@Param("severity") Alert.AlertSeverity severity,
                           @Param("resolved") Boolean resolved,
                           Pageable pageable);

    long countByResolvedFalseAndSeverity(Alert.AlertSeverity severity);
    long countByResolvedFalse();
}
