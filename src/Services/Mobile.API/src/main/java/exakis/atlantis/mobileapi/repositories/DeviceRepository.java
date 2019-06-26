package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Device;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {
    @Query("SELECT d FROM Device d where d.user.id = ?1")
    public Iterable<Device> findDevicesByUser(int userId);
}
