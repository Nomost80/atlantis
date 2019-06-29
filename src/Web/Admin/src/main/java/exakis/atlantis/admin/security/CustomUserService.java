package exakis.atlantis.admin.security;

import exakis.atlantis.admin.models.User;
import exakis.atlantis.admin.repositories.UserRepository;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.jwt.MalformedClaimException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService {
    private UserRepository userRepository;

    public CustomUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User loadUser(JwtClaims claims) throws OAuth2AuthenticationException, MalformedClaimException {
        String userId = claims.getStringClaimValue("oid");
        String givenName = claims.getStringClaimValue("given_name");
        String familyName = claims.getStringClaimValue("family_name");
        return this.userRepository.findById(userId).orElseGet(() -> {
            User user = new User();
            user.setId(userId);
            user.setGivenName(givenName);
            user.setFamilyName(familyName);
            this.userRepository.save(user);
            return user;
        });
    }
}
