package io.github.erp.service.mapper;

import io.github.erp.domain.*;
import io.github.erp.service.dto.PaymentLabelDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PaymentLabel} and its DTO {@link PaymentLabelDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentLabelMapper extends EntityMapper<PaymentLabelDTO, PaymentLabel> {
    @Mapping(target = "containingPaymentLabel", source = "containingPaymentLabel", qualifiedByName = "description")
    PaymentLabelDTO toDto(PaymentLabel s);

    @Named("description")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "description", source = "description")
    PaymentLabelDTO toDtoDescription(PaymentLabel paymentLabel);
}