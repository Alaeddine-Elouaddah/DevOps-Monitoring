package com.devops.monitoring.repository;

import com.devops.monitoring.entity.Metric;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MetricRepository extends JpaRepository<Metric, Long> {
    List<Metric> findByServerIdOrderByTimestampDesc(Long serverId, Pageable pageable);
    
    Optional<Metric> findFirstByServerIdOrderByTimestampDesc(Long serverId);

    @Query("SELECT AVG(m.cpuUsage) FROM Metric m WHERE m.id IN (SELECT MAX(m2.id) FROM Metric m2 GROUP BY m2.server.id)")
    Double getAverageCpuUsage();

    @Query("SELECT AVG(m.memoryUsage) FROM Metric m WHERE m.id IN (SELECT MAX(m2.id) FROM Metric m2 GROUP BY m2.server.id)")
    Double getAverageMemoryUsage();

    @Query("SELECT AVG(m.diskUsage) FROM Metric m WHERE m.id IN (SELECT MAX(m2.id) FROM Metric m2 GROUP BY m2.server.id)")
    Double getAverageDiskUsage();
}
