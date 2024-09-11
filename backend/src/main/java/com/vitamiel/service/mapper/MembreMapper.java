package com.vitamiel.service.mapper;

import com.vitamiel.domain.Membre;
import com.vitamiel.domain.User;
import com.vitamiel.service.dto.AdminUserDTO;
import com.vitamiel.service.dto.MembreDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Membre} and its DTO {@link MembreDTO}.
 */
@Mapper(componentModel = "spring")
public interface MembreMapper extends EntityMapper<MembreDTO, Membre> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userToAdminUserDTO")
    MembreDTO toDto(Membre s);

    @Named("userToAdminUserDTO")
    default AdminUserDTO userToAdminUserDTO(User user) {
        return new AdminUserDTO(user);
    }

    @Mapping(target = "authorities", ignore = true)
    User toEntity(AdminUserDTO adminUserDTO);
}
