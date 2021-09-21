package io.github.erp.service.mapper;

import io.github.erp.domain.*;
import io.github.erp.service.dto.TaxRuleDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link TaxRule} and its DTO {@link TaxRuleDTO}.
 */
@Mapper(componentModel = "spring", uses = { PlaceholderMapper.class })
public interface TaxRuleMapper extends EntityMapper<TaxRuleDTO, TaxRule> {
    @Mapping(target = "placeholders", source = "placeholders", qualifiedByName = "descriptionSet")
    TaxRuleDTO toDto(TaxRule s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TaxRuleDTO toDtoId(TaxRule taxRule);

    @Mapping(target = "removePlaceholder", ignore = true)
    TaxRule toEntity(TaxRuleDTO taxRuleDTO);
}
