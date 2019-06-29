package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}
