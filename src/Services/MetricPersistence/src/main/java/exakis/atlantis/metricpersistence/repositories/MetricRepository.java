package exakis.atlantis.metricpersistence.repositories;

import exakis.atlantis.metricpersistence.model.Metric;
import org.springframework.data.repository.CrudRepository;

public interface MetricRepository extends CrudRepository<Metric, Integer> { }
