package io.github.erp.service;

import io.github.erp.domain.*; // for static metamodels
import io.github.erp.domain.PaymentLabel;
import io.github.erp.repository.PaymentLabelRepository;
import io.github.erp.repository.search.PaymentLabelSearchRepository;
import io.github.erp.service.criteria.PaymentLabelCriteria;
import io.github.erp.service.dto.PaymentLabelDTO;
import io.github.erp.service.mapper.PaymentLabelMapper;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link PaymentLabel} entities in the database.
 * The main input is a {@link PaymentLabelCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PaymentLabelDTO} or a {@link Page} of {@link PaymentLabelDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PaymentLabelQueryService extends QueryService<PaymentLabel> {

    private final Logger log = LoggerFactory.getLogger(PaymentLabelQueryService.class);

    private final PaymentLabelRepository paymentLabelRepository;

    private final PaymentLabelMapper paymentLabelMapper;

    private final PaymentLabelSearchRepository paymentLabelSearchRepository;

    public PaymentLabelQueryService(
        PaymentLabelRepository paymentLabelRepository,
        PaymentLabelMapper paymentLabelMapper,
        PaymentLabelSearchRepository paymentLabelSearchRepository
    ) {
        this.paymentLabelRepository = paymentLabelRepository;
        this.paymentLabelMapper = paymentLabelMapper;
        this.paymentLabelSearchRepository = paymentLabelSearchRepository;
    }

    /**
     * Return a {@link List} of {@link PaymentLabelDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PaymentLabelDTO> findByCriteria(PaymentLabelCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<PaymentLabel> specification = createSpecification(criteria);
        return paymentLabelMapper.toDto(paymentLabelRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link PaymentLabelDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<PaymentLabelDTO> findByCriteria(PaymentLabelCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<PaymentLabel> specification = createSpecification(criteria);
        return paymentLabelRepository.findAll(specification, page).map(paymentLabelMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PaymentLabelCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<PaymentLabel> specification = createSpecification(criteria);
        return paymentLabelRepository.count(specification);
    }

    /**
     * Function to convert {@link PaymentLabelCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<PaymentLabel> createSpecification(PaymentLabelCriteria criteria) {
        Specification<PaymentLabel> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), PaymentLabel_.id));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), PaymentLabel_.description));
            }
            if (criteria.getComments() != null) {
                specification = specification.and(buildStringSpecification(criteria.getComments(), PaymentLabel_.comments));
            }
            if (criteria.getContainingPaymentLabelId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getContainingPaymentLabelId(),
                            root -> root.join(PaymentLabel_.containingPaymentLabel, JoinType.LEFT).get(PaymentLabel_.id)
                        )
                    );
            }
            if (criteria.getPlaceholderId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPlaceholderId(),
                            root -> root.join(PaymentLabel_.placeholders, JoinType.LEFT).get(Placeholder_.id)
                        )
                    );
            }
            if (criteria.getPaymentCalculationId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPaymentCalculationId(),
                            root -> root.join(PaymentLabel_.paymentCalculations, JoinType.LEFT).get(PaymentCalculation_.id)
                        )
                    );
            }
            if (criteria.getPaymentCategoryId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPaymentCategoryId(),
                            root -> root.join(PaymentLabel_.paymentCategories, JoinType.LEFT).get(PaymentCategory_.id)
                        )
                    );
            }
            if (criteria.getPaymentRequisitionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPaymentRequisitionId(),
                            root -> root.join(PaymentLabel_.paymentRequisitions, JoinType.LEFT).get(PaymentRequisition_.id)
                        )
                    );
            }
            if (criteria.getPaymentId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getPaymentId(),
                            root -> root.join(PaymentLabel_.payments, JoinType.LEFT).get(Payment_.id)
                        )
                    );
            }
            if (criteria.getInvoiceId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInvoiceId(),
                            root -> root.join(PaymentLabel_.invoices, JoinType.LEFT).get(Invoice_.id)
                        )
                    );
            }
            if (criteria.getDealerId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getDealerId(), root -> root.join(PaymentLabel_.dealers, JoinType.LEFT).get(Dealer_.id))
                    );
            }
            if (criteria.getSignedPaymentId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getSignedPaymentId(),
                            root -> root.join(PaymentLabel_.signedPayments, JoinType.LEFT).get(SignedPayment_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
