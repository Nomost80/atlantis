package exakis.atlantis.metricpersistence.repositories;

import exakis.atlantis.metricpersistence.model.Sensor;
import org.springframework.data.repository.CrudRepository;

public interface SensorRepository extends CrudRepository<Sensor, String> { }
