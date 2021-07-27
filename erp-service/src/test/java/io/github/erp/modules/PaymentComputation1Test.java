package io.github.erp.modules;

import io.github.erp.modules.models.PaymentCalculationInt;
import org.javamoney.moneta.Money;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.github.erp.modules.PaymentReferenceCodes.BASE_SYSTEM_CURRENCY_CODE;

class PaymentComputation1Test extends PaymentComputationTests  {

    private PaymentComputation1 computation;

    private PaymentCalculationInt calculation;

    @BeforeEach
    void setUp() {
        computation = new PaymentComputation1(taxRule);
        calculation = computation.calculate(requisition);
    }

    @Test
    void calculate() {
        testEquality(calculation.getPaymentExpense(), Money.of(40000, BASE_SYSTEM_CURRENCY_CODE));
        testEquality(calculation.getWithholdingVAT(), Money.of(690, BASE_SYSTEM_CURRENCY_CODE));
        testEquality(calculation.getWithholdingTax(), Money.of(0, BASE_SYSTEM_CURRENCY_CODE));
        testEquality(calculation.getPaymentAmount(), Money.of(39310, BASE_SYSTEM_CURRENCY_CODE));
    }
}