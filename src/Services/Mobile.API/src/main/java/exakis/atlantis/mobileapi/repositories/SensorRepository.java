package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Sensor;
import org.springframework.data.repository.CrudRepository;

public interface SensorRepository extends CrudRepository<Sensor, String> {
    Iterable<Sensor> findByDeviceMacAddress(String macAddress);
}
