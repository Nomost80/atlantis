package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Metric;
import org.springframework.data.repository.CrudRepository;

public interface MetricRepository extends CrudRepository<Metric, Integer> {
}
